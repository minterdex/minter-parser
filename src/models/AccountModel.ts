const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;


const balanceSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        index: true
    },
    amount: {
        type: String,
        required: true
    },
});

/**
 * Model for a single account.
 *
 * @type {"mongoose".Schema}
 */
const accountSchema = new Schema({
    _id: {
        type: String,
        required: true,
        index: true
    },
    address: {
        type: String,
        required: true,
        index: true
    },
    height: {
        type: Number,
        required: true,
        index: true,
    },
    timeStamp: {
        type: String,
        required: true,
        index: true
    },
    /*balances: [{
        balanceSchema
    }]*/
}, {
    versionKey: false,
    toObject: {
         virtuals: true
        },
    toJSON: {
        virtuals: true
    }
});

accountSchema.virtual("success").get(function() {
    if (this.hasOwnProperty("error")) {
        return this.error === "";
    }
});

accountSchema.plugin(mongoosePaginate);

export const Account = mongoose.model("Account", accountSchema );