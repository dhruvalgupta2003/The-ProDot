import express from "express";
import { createDealer, getPincodeDetails } from "../controllers/dealer.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const dealerRouter = express.Router();

dealerRouter.get("/get-pincode-details",getPincodeDetails);
dealerRouter.post("/create-dealer",isAuthenticated,authorizeRoles("admin"),createDealer);

export default dealerRouter;