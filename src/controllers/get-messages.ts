import { GetMessagesOptions } from './../types';
import DatabaseService from "../services/database-service"
import { Controller } from "../types"

const controller: Controller = async (req, res) => {
    const data = req.body as GetMessagesOptions

    try {
        const databaseService = new DatabaseService()
        const result = await databaseService.getMessages(data)
        return res.status(200).send(result)
    } catch(error) {
        console.error(`> [Internal Server Error] ${error}`)

        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

export default controller