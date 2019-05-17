import { LastParsedBlock } from "../models/LastParsedBlockModel";
import { Minter } from "../services/Minter"

export class BlockchainState {
    getState(): Promise<any> {        
        return BlockchainState.getBlockState().then(([blockInChain, blockInDb]) => {
            if (!blockInDb) {
                return new LastParsedBlock({
                    lastBlock: blockInChain,
                    lastParsedBlock: 0
                }).save()
            }

            if (blockInDb.lastBlock < blockInChain) {
                blockInDb.lastBlock = blockInChain
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