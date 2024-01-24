const Fault = require("../model/Fault");
const Rs = require("../model/Rs");
const Sensor = require("../model/Sensor");
const User = require("../model/User");
const Password = require("../util/Password");
const sendEmail = require("../util/mail");

let height = 20;
let limit = height * 0.30;

const makeChartData = async () => {
  const allFault = await Fault.find();
  const newMonthArr = [
    { month: "Jan", value: 0 },
    { month: "Feb", value: 0 },
    { month: "Mar", value: 0 },
    { month: "Apr", value: 0 },
    { month: "May", value: 0 },
    { month: "Jun", value: 0 },
    { month: "Jul", value: 0 },
    { month: "Aug", value: 0 },
    { month: "Sep", value: 0 },
    { month: "Oct", value: 0 },
    { month: "Nov", value: 0 },
    { month: "Dec", value: 0 },
  ];

  for (let i = 0; i < newMonthArr.length; i++) {
    for (let j = 0; j < allFault.length; j++) {
      if (
        newMonthArr[i].month ==
        new Date(allFault[j].date).toLocaleString("default", {
          month: "short",
        })
      )
        newMonthArr[i].value = newMonthArr[i].value + 1;
    }
  }
  return newMonthArr;
};
// let

const socketInit = (io) => {
  //   console.log(io);
  io.on("connect", (socket) => {
    console.log("connected");
    console.log(io.engine.clientsCount);
    // console.log(Object.keys(io));
    socket.on("auth", async (credential) => {
      const validFound = await User.findOne({ username: credential.username });
      const varifiedPassword = await Password.toCompare(
        validFound.password,
        credential.password
      );
      if (!validFound || !varifiedPassword) {
        socket.emit("authFailed", "enter valid credential", () => {
          console.log("from server");
        });
      }
    });
    socket.on("rsCredentials", async (data) => {
      // console.log(mongoose.Types.ObjectId(data.rsId));
      const found = await Rs.findOne({
        _id: data.rsId,
      });
      console.log(found);
      if (!found) {
        socket.emit(
          "rsCredentialsFailed",
          "first register and get ObjectId for ur Rs by clicking this url.... or enter valid rsId"
        );
      }
    });

    socket.on("sensorCredentials", async ({ sensorsId }) => {
      sensorsId.forEach(async (id) => {
        const foundSensor = await Sensor.findOne({ _id: id });
        if (!foundSensor) {
          socket.emit(
            "sensorCredentialsFailed",
            "enter valid sensor credential"
          );
        }
      });
    });

    socket.on("sensorDataNew", async ({ finalArr }) => {
      console.log(finalArr);
      for (let i = 0; i < finalArr.length; i++) {
        if (finalArr[i].data <= limit) {
          console.log(
            "high chance alert",
            `high aleat at sensor${finalArr[i].sensor}`
          );
          const fault = Fault.build({
            data: [finalArr[i].data],
            sensor: [finalArr[i].sensor[i]],
            rs: finalArr[i].rs,
            situation: "over",
          });
          await fault.save();
          makeChartData().then((data) => {
            io.of("/").emit("chartDataReturn", data); //broadcasting this bcoz we are listening this event at react client side and this's parent event is emitted from rs
          });
          io.of("/").emit("fault", fault); //broadcasting this bcoz we are listening this event at react client side and this's parent event is emitted from rs
          await sendEmail({
            email: "rameshkumarkali123@gmail.com",
            subject: "Related TO drainage monitoring",
            message: `<h1>${fault.data} at sensor ${fault.sensor} can be critical....</h1>`,
          });
        }
        if (i != finalArr.length - 1) {
          if (finalArr[i + 1].data - finalArr[i].data >= height * 0.2) {
            //changes i+1 and i exchange when -
            console.log(
              "minus detected",
              `between ${finalArr[i].sensor},${
                finalArr[i + 1].sensor
              }`
            );
            const fault = Fault.build({
              data: [finalArr[i].data, finalArr[i + 1].data],
              sensor: [finalArr[i].sensor[i], finalArr[i+1].sensor[i+1]],
              rs: finalArr[i].rs,
              situation: "minus",
            });
            await fault.save();
            makeChartData().then((data) => {
              io.of("/").emit("chartDataReturn", data); //broadcasting this bcoz we are listening this event at react client side and this's parent event is emitted from rs
            });
            io.of("/").emit("fault", fault); //broadcasting this bcoz we are listening this event at react client side and this's parent event is emitted from rs
            await sendEmail({
              email: "rameshkumarkali123@gmail.com",
              subject: "Related TO drainage monitoring",
              message: `<h1>${fault.data} at sensor ${fault.sensor} can be critical....please take an action</h1>`,
            });
          }
        }
      }
    });

    socket.on("chartData", async (data) => {
      makeChartData().then((data) => {
        socket.emit("chartDataReturn", data);
      });
    });

    socket.on("disconnect", () => {
      console.log(io.engine.clientsCount);
      console.log("disconnected");
      //   console.log(io);
    });
  });
};

module.exports = socketInit;
