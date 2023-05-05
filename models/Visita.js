import mongoose from "mongoose";

const visitaSchema = mongoose.Schema({
    comercio: {
        type: String,
        required: true,
        trim: true
    },
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    municipio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
    },
    fechaRevision: {
        type: Date,
        default: Date.now()
    },
    commentarios: {
        type: String
    },
    giro: {
        type: String,
        enum: ['Farmacia', 'Clinica', 'Hospital', 'Bar', 'Restaurante']
    },
    status: {
        type: String,
        enum: ['Suspendido', 'En revisión', 'Todo en orden']
    },
    images: {
        type: Array
    }
}, {
    timestamps: true
})

const Visitas = mongoose.model("Visitas", visitaSchema);

export default Visitas;