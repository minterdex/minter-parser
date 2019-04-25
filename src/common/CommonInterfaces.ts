export interface ITransaction {
    block_number: Number,
    from: string,
    gas: number,
    gasPrice: string,
    hash: string,
    nonce: number,
    to: string,
}

export interface IExtractedTransaction extends ITransaction {
    _id: string,
}

export interface IBlock {
    height: Number
    hash: String,
    time: Date,
    num_txs: Number,
    total_txs: Number,
    block_reward: Number,
    size: Number,
    proposer: String,
    validators: any
}

export interface IExtractedBlock extends IBlock {
    _id: string,
}