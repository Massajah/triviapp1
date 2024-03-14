import mongoose from "mongoose";
const { Schema } = mongoose

const resultModel = new Schema({
    username : { type : String },
    points : { type : Number, default: 0},
    createdAt : { type : Date, default: Date.now}
})


export default mongoose.model('result', resultModel)