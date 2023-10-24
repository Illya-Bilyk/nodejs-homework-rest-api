const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../middlewares");

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: { type: String, default: "" },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const signUpSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": `Set password for user`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": `Email is required`,
  }),
  subscription: Joi.string().valid(...subscriptionList),
});

const signInSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": `Set password for user`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": `Email is required`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missing required field email",
  }),
});

const schema = {
  signUpSchema,
  signInSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schema,
};
