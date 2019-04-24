import axios from 'axios';

const config = require("config");

export class Minter {

    static getLastBlock(): Promise<any> {
        return axios.get(config.get("MINTER_NODE") + '/status')
            .then((response) => {
                return response.data.result.tm_status.sync_info.latest_block_height
            })
    }

    static getBlock(blockId: Number): Promise<any> {
        return axios.get(config.get("MINTER_NODE") + '/block?height=' + blockId)
            .then((response) => {
                return response.data.result
            })
    }
}
