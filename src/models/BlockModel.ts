const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

/**
 * Model for a single block.
 *
 * @type {"mongoose".Schema}
 */
const blockSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    hash: {
        type: String,
        required: true,
        index: true
    },
    time: {
        type: Date,
    },
    num_txs: {
        type: Number,
    },
    total_txs: {
        type: Number,
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transactions",
        required: true,
        index: true
    }],
    block_reward: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    proposer: {
        type: String,
        required: true,
    },
    validators: [{
        type: Object,
        required: true
    }],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, {
    versionKey: false,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

blockSchema.virtual("success").get(function() {
    if (this.hasOwnProperty("error")) {
        return this.error === "";
    }
});

blockSchema.plugin(mongoosePaginate);

export const Block = mongoose.model("Block", blockSchema );