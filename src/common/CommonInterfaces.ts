export interface ITransaction {
    from: string,
    gas: number,
    gasPrice: string,
    hash: string,
    //input: string,
    nonce: number,
    to: string,
    //transactionIndex: number,
    //value: string,
    //v?: string,
    //r?: string,
    //s?: string,
}

export interface IExtractedTransaction extends ITransaction {
    _id: string,
}

export interface IBlock {
    gasLimit: number,
    gasUsed: number,
    hash: string,
    time: string,
}