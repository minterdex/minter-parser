import * as winston from "winston";
import { Transaction } from "../models/TransactionModel";
import { ITransaction, IBlock, IExtractedTransaction } from "./CommonInterfaces";

import { Config } from "./Config";
import * as Bluebird from "bluebird";
import { Block } from "../models/BlockModel";

export class TransactionParser {
    public parseTransactions(blocks: any) {
        console.log(blocks)
        if (blocks.length === 0) return Promise.resolve();

        const extractedTransactions = blocks.flatMap((block: any) => {
            return block.transactions.map((tx: ITransaction) => {
                return new Transaction(this.extractTransactionData(block, tx));
            });
        });

        const bulkTransactions = Transaction.collection.initializeUnorderedBulkOp();

        extractedTransactions.forEach((transaction: IExtractedTransaction) => {
            Transaction.findOneAndUpdate({_id: transaction._id}, transaction, {upsert: true, new: true})
            .then((transaction: any) => {
                return Block.findOneAndUpdate({_id: transaction.block_number}, {$push: {transactions: transaction._id}})
            })
            //bulkTransactions.find({_id: transaction._id}).upsert().replaceOne(transaction)
        })

        return Promise.resolve(extractedTransactions);

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
            block_number: Number(block.height),
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