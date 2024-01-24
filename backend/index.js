const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");
const socketIO = require("socket.io");
const socketInit = require("./socketStuff/socketInit");

// let previousArr = []

//auth middleware
const currentUserMid = require("./middleware/current-user");
const requireAuth = require("./middleware/require-auth");

//auth routes
const signup = require("./routes/user/signup");
const signin = require("./routes/user/signin");
const signout = require("./routes/user/signout");
const currentUser = require("./routes/user/currentUser");

//rs routes
const rsCreate = require("./routes/rs/rs-create");
const rsUpdate = require("./routes/rs/rs-update");
const rsDelete = require("./routes/rs/rs-delete");
const allRs = require("./routes/rs/allRs");
const singleRs = require("./routes/rs/singleRs");

//sensor routes
const sensorCreate = require("./routes/sensor/sensor-create");
const sensorUpdate = require("./routes/sensor/sensor-update");
const sensorDelete = require("./routes/sensor/sensor-delete");
const allSensor = require("./routes/sensor/all-sensor");
const singleSensor = require("./routes/sensor/single-sensor");

//fault routes
const faultCreate = require("./routes/fault/fault-create");
const faultUpdate = require("./routes/fault/fault-update");
const faultDelete = require("./routes/fault/fault-delete");
const allFault = require("./routes/fault/allFault");
const singleFault = require("./routes/fault/singleFault");

//config and error
const errorHandler = require("./middleware/error-handler");
const { PORT, DB } = require("./config");

const corsOptions = {
  origin: "https://draindemo.herokuapp.com",
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

//express middlwares
app.use(express.json());
app.set("trust proxy",true);
app.use(
  cookieSession({
    signed: false,
    secure: true,
    sameSite: "none",
  })
);

//auth middleware here bacasue all routes need to require auth before make req except signup and signin

//routes middleware
//auth
app.use(signup);
app.use(signin);
app.use(currentUser);
app.use(currentUserMid);
app.use(requireAuth);

app.use(signout);

//rs
app.use(rsCreate);
app.use(rsUpdate);
app.use(rsDelete);
app.use(allRs);
app.use(singleRs);

//sensor
app.use(sensorCreate);
app.use(sensorUpdate);
app.use(sensorDelete);
app.use(allSensor);
app.use(singleSensor);

//fault
app.use(faultCreate);
app.use(faultUpdate);
app.use(faultDelete);
app.use(allFault);
app.use(singleFault);

app.use("*", (req, res) => {
  res.status(404).send(`endpoint not found ${req.url}`);
});

app.use(errorHandler);

//socket configuration
const socketServer = app.listen(process.env.PORT || PORT, () => {
  console.log(`server started ${PORT}`);
});

const io = socketIO(socketServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//startups inits
const init = async () => {
  try {
    await mongoose.connect(`mongodb+srv://ProjectDev:Drainange@drainagedata.kgopf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`database connnected successfully`);
  } catch (err) {
    console.log(err);
    throw new Error(`Database not connected`);
  }
  socketInit(io);
};

init();
