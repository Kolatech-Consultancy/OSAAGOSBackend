import { Schema, model } from "mongoose"


const mediaSchema = Schema({
    title: {
        type: Schema.Types.String,
        require: true,
    },
    description: {
        type: Schema.Types.String,
        require: true
    },
    mediaType: {
        type: String,
        require: true
    },
    URL: {
        type: Schema.Types.String,
        require: true
    }
},
    { timestamps: true }
)

const Media = model("media", mediaSchema)
export default Media