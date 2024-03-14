
import Results from "../models/resultSchema.js"

export async function getResult(req, res) {
    try {
        const r = await Results.find().sort({points: -1}).limit(10)
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

export async function storeResult(req, res) {
    try {
        const { username, points } = req.body
        if(!username && !result) throw new Error('Data not Provided!')

        Results.create({ username, points })
            res.json({ msg: "Result Saved"})
        
        
    } catch (error) {
        res.json({ error })
    }
}

export async function dropResult(req, res) {
    try {
        await Results.deleteMany()
        res.json({ msg: "Results Deleted"})
    } catch (error) {
        res.json({ error })
    }
}