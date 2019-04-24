import  * as express from "express";
import { StatusController } from "../controllers/StatusController";
import { TransactionController } from "../controllers/TransactionController";

const router = express.Router();

const statusController = new StatusController();
const transactionController = new TransactionController();

// URLs for transactions
router.get("/", statusController.getStatus);
router.get("/transactions", transactionController.readAllTransactions);
router.get("/transactions/:transactionId", transactionController.readOneTransaction);

export {
    router
};
