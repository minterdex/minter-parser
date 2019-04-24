import { LastParsedBlock } from "../models/LastParsedBlockModel";
import { Minter } from "../services/Minter"

export class BlockchainState {
    getState(): Promise<any> {        
        return BlockchainState.getBlockState().then(([blockInChain, blockInDb]) => {
            if (!blockInDb) {
                return new LastParsedBlock({
                    lastBlock: blockInChain,
                    lastBackwardBlock: blockInChain,
                    lastPusherBlock: blockInChain,
                    lastTokensBlock: blockInChain,
                    lastTokensBackwardBlock: blockInChain
                }).save()
            }

            if (!blockInDb.lastBlock) {
                blockInDb.lastBlock = blockInChain
            }

            if (!blockInDb.lastBackwardBlock) {
                blockInDb.lastBackwardBlock = blockInChain
            }

            if (!blockInDb.lastPusherBlock) {
                blockInDb.lastPusherBlock = blockInChain
            }

            if (!blockInDb.lastTokensBlock) {
                blockInDb.lastTokensBlock = blockInChain
            }

            if (!blockInDb.lastTokensBackwardBlock) {
                blockInDb.lastTokensBackwardBlock = blockInChain
            }

            return blockInDb.save()
        })
    }

    static getBlockState(): Promise<any[]> {
        const latestBlockOnChain = Minter.getLastBlock();
        const latestBlockInDB = LastParsedBlock.findOne();
        return Promise.all([latestBlockOnChain, latestBlockInDB]);
    }
}