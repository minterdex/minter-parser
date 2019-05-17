import { ITransaction, ICoin, IExtractedCoin } from "./CommonInterfaces";
import { Coin } from "../models/CoinModel";

export class CoinParser {
    public parseCoins(transactions: any) {
        if (transactions.length === 0) return Promise.resolve();

        const extractedCoins = [];

        transactions.forEach((transaction: any) => {
            if (transaction.tags && transaction.tags["tx.type"] !== "05") return;
            return extractedCoins.push(new Coin(this.extractCoinData(transaction.data, transaction)));
        });

        if (extractedCoins.length === 0) return Promise.resolve();

        const bulkCoins = Coin.collection.initializeUnorderedBulkOp();

        extractedCoins.forEach((coin: IExtractedCoin) => {
            bulkCoins.find({symbol: coin.symbol}).upsert().replaceOne(coin)
        });

        if (bulkCoins.length === 0) return Promise.resolve();

        return bulkCoins.execute().then((bulkResult: any) => {
            return Promise.resolve(extractedCoins);
        });
    }

    extractCoinData(coin: ICoin, tx: ITransaction) {
        return {
            name: String(coin.name),
            symbol: String(coin.symbol),
            owner: String(tx.from),
            height: Number(tx.block_number),
            initial_amount: String(coin.initial_amount),
            initial_reserve: String(coin.initial_reserve),
            constant_reserve_ratio: String(coin.constant_reserve_ratio),
            timeStamp: String(tx.timeStamp),
        }
    }
}