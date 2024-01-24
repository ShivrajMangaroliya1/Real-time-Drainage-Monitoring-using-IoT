const mongoose = require("mongoose");
const Password = require("../util/Password");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "please add a username"],
    },
    password: {
      type: String,
      minlength: 8,
      trim: true,
      required: [true, "please add a password"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // role:{
    //later
    // }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashPassword = await Password.toHash(this.get("password"));
    this.set("password", hashPassword);
  }
  done();
});

userSchema.statics.build = (attr) => {
  return new User(attr);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
