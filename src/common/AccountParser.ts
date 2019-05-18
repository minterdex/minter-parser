import { ITransaction, ICoin, IExtractedCoin, IAccount, IExtractedAccount } from "./CommonInterfaces";
import { Account } from "../models/AccountModel";

export class AccountParser {
    public parseAccounts(transactions: any) {
        if (!transactions || transactions.length === 0) return Promise.resolve();

        const extractedAccounts = [];

        transactions.forEach((transaction: any) => {
            return extractedAccounts.push(new Account(this.extractAccountData(transaction)));
        });

        if (extractedAccounts.length === 0) return Promise.resolve();

        const bulkAccounts = Account.collection.initializeUnorderedBulkOp();

        extractedAccounts.forEach((account: IExtractedAccount) => {
            bulkAccounts.find({_id: account.address}).upsert().replaceOne(account)
        });

        if (bulkAccounts.length === 0) return Promise.resolve();

        return bulkAccounts.execute().then((bulkResult: any) => {
            return Promise.resolve(transactions);
        });
    }

    extractAccountData(tx: ITransaction) {
        return {
            id: String(tx.from),
            address: String(tx.from),
            height: Number(tx.block_number),
            timeStamp: String(tx.timeStamp),
        }
    }
}