import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

// Get All users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status (201).json ({
    success: true,
    users,
  });
};

// update user role service
export const updateUserRoleService = async(res:Response,id:string,role:string) => {
  const user = await userModel.findByIdAndUpdate(id, {role}, {new: true});

  res.status(201).json({
    success:true,
    user,
  })
}


// get all user's phone no
export const getAllUsersPhoneNoService = async (res: Response) => {
  try {
    const users = await userModel.find({}, 'phoneNo'); 

    const phoneNumbers = users.map(user => user.phoneNo);

    res.status(201).json({
      success: true,
      phoneNumbers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};
