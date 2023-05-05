import mongoose from "mongoose";

const municipioSchema = mongoose.Schema({
    name: {
        type: String
    }
})

const Municipio = mongoose.model("Municipio", municipioSchema);

export default Municipio;