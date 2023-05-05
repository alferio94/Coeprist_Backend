import Visita from "../models/Visita.js";
import Municipio from "../models/Municipio.js"

const getVisitas = async (req, res) =>
{
    let visitas;
    if (req.usuario.admin)
    {
        visitas = await Visita.find().populate('visitor', '-password -confirmado -token -createdAt -updatedAt -__v').populate('municipio', 'name -_id').select("-__v -createdAt -updatedAt -images")
        if (!visitas)
        {
            error = new Error('No hay visitas que mostrar')
            return res.status(404).json({ msg: error.message })
        }
        return res.json({ visitas });
    }

    visitas = await Visita.find().where('visitor').equals(req.usuario).populate('municipio', 'name -_id').select("-__v -createdAt -updatedAt -images -visitor")
    if (!visitas)
    {
        error = new Error('No hay visitas que mostrar')
        return res.status(404).json({ msg: error.message })
    }
    return res.json({ visitas });

}

const getUsuarioVisitas = async (req, res) =>
{

}
const getVisita = async (req, res) =>
{

}
const createMunicipio = async (req, res) =>
{
    const municipio = new Municipio(req.body);
    try
    {
        const municipioAlmacenado = await municipio.save();
        return res.status(201).json({ municipioAlmacenado });
    }
    catch (error)
    {
        console.log(error)
    }
}
const crearVisita = async (req, res) =>
{
    const visita = new Visita(req.body);
    visita.visitor = req.usuario._id;
    try
    {
        const visitaAlmacenada = await visita.save();
        return res.status(201).json({ visitaAlmacenada });
    }
    catch (error)
    {
        console.log(error)
    }
}
const editarVisita = async (req, res) =>
{

}
const eliminarVisita = async (req, res) =>
{

}
const getVisitasPeriodo = async (req, res) =>
{

}
const getVisitasMunicipio = async (req, res) =>
{

}

export
{
    crearVisita,
    editarVisita,
    eliminarVisita,
    getVisitas,
    getUsuarioVisitas,
    getVisitasMunicipio,
    getVisitasPeriodo,
    getVisita,
    createMunicipio
}