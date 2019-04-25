import * as winston from "winston";
import { Block } from "../models/BlockModel";
import { IBlock, IExtractedBlock } from "./CommonInterfaces";

import { Config } from "./Config";
import * as Bluebird from "bluebird";

export class BlockParser {
    public parseBlocks(blocks: any) {
        if (blocks.length === 0) return Promise.resolve();

        const extractedBlocks = blocks.flatMap((block: IBlock) => {
            return new Block(this.extractBlockData(block));
        });

        const bulkBlocks = Block.collection.initializeUnorderedBulkOp();

        extractedBlocks.forEach((block: IExtractedBlock) => {
            bulkBlocks.find({_id: block._id}).upsert().replaceOne(block)
        })

        if (bulkBlocks.length === 0) return Promise.resolve();

        return bulkBlocks.execute().then((bulkResult: any) => {
            return Promise.resolve(extractedBlocks);
        });
    }

    extractBlockData(block: IBlock) {
        return {
            _id: Number(block.height),
            hash: String(block.hash),
            time: block.time,
            num_txs: Number(block.num_txs),
            block_reward: Number(block.block_reward),
            size: Number(block.size),
            proposer: String(block.proposer),
            validators: block.validators
        };
    }
}