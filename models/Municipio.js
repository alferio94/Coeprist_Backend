import mongoose from "mongoose";

const municipioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}, { timestamps: true });

const Municipio = mongoose.model("Municipio", municipioSchema);

export default Municipio;