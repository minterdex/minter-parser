const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;


/**
 * Model for a single transaction.
 *
 * @type {"mongoose".Schema}
 */
const transactionSchema = new Schema({
    hash: {
        type: String,
        required: true,
        index: true
    },
    raw_tx: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true,
        index: true
    },
    block_number: {
        type: Number,
        ref: "Block",
        required: true,
        index: true
    },
    timeStamp: {
        type: String,
        required: true,
        index: true
    },
    nonce: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true,
        index: true
    },
    tags: {
        type: Object
    },
    data: {
        type: Object
    },
    gas: {
        type: String,
        required: true
    },
    gas_price: {
        type: String,
        required: true
    },
    gas_coin: {
        type: String,
        required: true
    },
    payload: {
        type: String,
    },
    service_data: {
        type: String,
    },
}, {
    versionKey: false,
    toObject: {
         virtuals: true
        },
    toJSON: {
        virtuals: true
    }
});

transactionSchema.virtual("success").get(function() {
    if (this.hasOwnProperty("error")) {
        return this.error === "";
    }
});

transactionSchema.plugin(mongoosePaginate);

export const Transaction = mongoose.model("Transaction", transactionSchema );