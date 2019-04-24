import  * as express from "express";
import { StatusController } from "../controllers/StatusController";

const router = express.Router();


const statusController = new StatusController();

// URLs for transactions
router.get("/", statusController.getStatus);

export {
    router
};
