require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IDealer extends Document {
  dealerName: string;
  aliseName: string;
  starRating: number;
  role: string; // Dealer/Distributor , Normal User
  salesmanName: string;
  designerName: string;
  address: string;
  pincode: number;
  state: string;
  district: string;
  city: string;
  gstNo: string;
  panNo: string;
  email: string;
  phoneNo: string[];
  avatar: {
    public_id: string;
    url: string;
  };
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const dealerScehma: Schema<IDealer> = new mongoose.Schema(
  {
    dealerName: {
      type: String,
      required: [true, "Please enter your name"],
    },
    aliseName: {
        type: String,
        required: [true, "Please enter your company name"]
    },
    starRating:{
      type: Number,
    },
    role: {
      type: String,
      required: [true, "Please Specify the customer type"],
      default: "dealer", 
    },
    salesmanName:{
      type: String,
      required: [true,"Please enter the assigned Salesman Name"]
    },
    designerName:{
      type:String,
      required: [true,"Please enter assigned Designer's Name"],
    },
    address: {
      type: String,
      required: [true, "Please enter your address"]
    },
    pincode:{
      type: Number,
      required: [true,"Please enter your Pin Code"]
    },
    state:{
      type: String,
      // required: [true, "Please enter your state name"]
    },  
    district:{
      type: String,
      // required: [true, "Please enter your district name"]
    },
    city:{
      type: String,
      // required: [true, "Please enter your city name"]
    },
    gstNo: {
        type: String,
        required: [true, "Please enter your company's gst no"]
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    phoneNo: {
      type: [String],
      required: [true, "Please enter atleast one phone no"],
      unique: true,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);


// sign access-token
dealerScehma.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

//sign refresh token
dealerScehma.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "3d",
  });
};


const dealerModel: Model<IDealer> = mongoose.model("Dealer", dealerScehma);
export default dealerModel;
