import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import dealerModel, { IDealer } from "../models/dealer.model";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import cloudinary from "cloudinary";
require("dotenv").config();
var pincodeDetails = require('india-pincode-search');
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
// create dealer (user) -- only for admin

//Dealer user
interface IDealerBody {
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
  phoneNo: string;
  avatar?: string;
}

interface IPincodeBody{
  pincode: number;
}
export const getPincodeDetails = CatchAsyncError(
  async (req: Request<{}, {}, {}, { pincode?: number }>, res: Response, next: NextFunction) => {
    try {
      const pin = req.query;
      const pincode = pin.pincode;
      // console.log(pincode);
      
      const pinData = pincodeDetails.search(pincode);
      const pinDetails = pinData[0]

      res.status(200).json({
        success:true,
        data: pinDetails
      })
      
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  })

export const createDealer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {dealerName,aliseName,starRating,role,salesmanName,designerName,address,pincode,state,district,city,gstNo,panNo,email,phoneNo, avatar}:IDealerBody= req.body;
      const isEmailExists = await dealerModel.findOne({ email });
      if (isEmailExists) {
        return next(new ErrorHandler("Email already exists", 400));
      }
      const dealer = await dealerModel.create({
        dealerName,
        aliseName,
        starRating,
        role,
        salesmanName,
        designerName,
        address,
        pincode,
        state,
        district,
        city,
        gstNo,
        panNo,
        email,
        phoneNo,
      });

      res.status(201).json({
        success: true,
        dealer
      })
      
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
