const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;


/**
 * Model for a single coin.
 *
 * @type {"mongoose".Schema}
 */
const coinSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    symbol: {
        type: String,
        required: true,
        index: true
    },
    owner: {
        type: String,
        required: true,
        index: true,
    },
    height: {
        type: Number,
        required: true,
        index: true,
    },
    initial_amount: {
        type: String,
        //required: true
    },
    initial_reserve: {
        type: String,
        //required: true
    },
    constant_reserve_ratio: {
        type: String,
        //required: true
    },
    timeStamp: {
        type: String,
        required: true,
        index: true
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

coinSchema.virtual("success").get(function() {
    if (this.hasOwnProperty("error")) {
        return this.error === "";
    }
});

coinSchema.plugin(mongoosePaginate);

export const Coin = mongoose.model("Coin", coinSchema );