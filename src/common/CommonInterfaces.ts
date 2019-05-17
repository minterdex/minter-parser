export interface ITransaction {
    block_number: Number,
    from: string,
    tags: Object,
    gas: number,
    gas_price: string,
    gas_coin: string,
    hash: string,
    nonce: number,
    to: string,
    data: Object,
    raw_tx: string,
    payload: string,
    service_data: string,
    timeStamp: string
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

export interface ICoin {
    name: string,
    symbol: string,
    owner: string,
    height: number,
    initial_amount: string,
    initial_reserve: string,
    constant_reserve_ratio: string
}

export interface IExtractedCoin extends ICoin {
    _id: string
}