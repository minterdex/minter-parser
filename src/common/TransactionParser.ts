import * as winston from "winston";
import { Transaction } from "../models/TransactionModel";
import { ITransaction, IBlock, IExtractedTransaction } from "./CommonInterfaces";

import { Config } from "./Config";
import * as Bluebird from "bluebird";

export class TransactionParser {
    public parseTransactions(blocks: any) {
        if (blocks.length === 0) return Promise.resolve();

        const extractedTransactions = blocks.flatMap((block: any) => {
            return block.transactions.map((tx: ITransaction) => {
                return new Transaction(this.extractTransactionData(block, tx));
            });
        });

        const bulkTransactions = Transaction.collection.initializeUnorderedBulkOp();

        extractedTransactions.forEach((transaction: IExtractedTransaction) => {
            bulkTransactions.find({_id: transaction._id}).upsert().replaceOne(transaction)
        })

        if (bulkTransactions.length === 0) return Promise.resolve();

        return bulkTransactions.execute().then((bulkResult: any) => {
            return Promise.resolve(extractedTransactions);
        });
    }

    extractTransactionData(block: IBlock, transaction: ITransaction) {
        const from = String(transaction.from).toLowerCase();
        const to: string = transaction.to === null ? "" : String(transaction.to).toLowerCase();
        const addresses: string[] = to ? [from, to] : [from];

        return {
            _id: String(transaction.hash),
            //blockNumber: Number(transaction.blockNumber),
            timeStamp: String(block.time),
            nonce: Number(transaction.nonce),
            from,
            to,
            //value: String(transaction.value),
            gas: String(transaction.gas),
            gasPrice: String(transaction.gasPrice),
            gasUsed: String(0),
            //input: String(transaction.input),
            addresses
        };
    }
}