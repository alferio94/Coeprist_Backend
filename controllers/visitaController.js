import Visita from "../models/Visita.js";
import Municipio from "../models/Municipio.js"

const getVisitas = async (req, res) =>
{
    const visitas = req.usuario.admin ?
        await Visita.find().populate({
            path: 'visitor',
            select: '-password -confirmado -token -createdAt -updatedAt -__v'
        })
            .populate({
                path: 'municipio',
                select: 'name -_id'
            }).select("-__v -createdAt -updatedAt -images")
        : await Visita.find().where('visitor').equals(req.usuario).populate({
            path: 'municipio',
            select: 'name -_id'
        }).select("-__v -createdAt -updatedAt -images -visitor")

    if (!visitas.length)
    {
        const error = new Error('No hay visitas que mostrar');
        return res.status(404).json({ msg: error.message });
    }
    return res.json({ visitas });

}

const getUsuarioVisitas = async (req, res) =>
{
    const { visitorId } = req.params
    const usuario = req.usuario
    console.log(visitorId)

    if (usuario.admin)
    {
        const visitas = await Visita.find({ visitor: visitorId }).populate({
            path: 'visitor',
            select: '-password -confirmado -token -createdAt -updatedAt -__v -admin'
        }).populate({
            path: 'municipio',
            select: 'name -_id'
        }).select("-__v -createdAt -updatedAt -images")
        return res.json(visitas);
    }
    return res.status(403).json({ msg: 'Acceso Denegado' })

}
const getVisita = async (req, res) =>
{
    const visita = await Visita.findById(req.params.id)
        .populate({
            path: 'visitor',
            select: '-password -confirmado -token -createdAt -updatedAt -__v'
        })
        .populate({
            path: 'municipio',
            select: 'name -_id'
        })
        .select("-__v -createdAt -updatedAt -images");

    if (!visita)
    {
        return res.status(404).json({ msg: 'Visita no encontrada' });
    }
    req.usuario.admin ? res.json({ visita })
        : req.usuario._id.toString() == visita.visitor._id.toString()
            ? res.json({ visita })
            : res.status(403).json({ msg: 'Accesos denegados' })

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
    const { id } = req.params;
    if (!req.usuario.admin)
    {
        return res.status.json({ msg: 'Acceso denegado' })
    }
    try
    {
        const visitaEliminada = await Visita.findOneAndDelete({ _id: id, visitor: req.usuario._id });

        if (!visitaEliminada)
        {
            return res.status(404).json({ msg: 'Visita no encontrada' });
        }

        return res.json({ msg: 'Visita eliminada correctamente' });
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({ msg: 'Error al eliminar la visita' });
    }

}
const getVisitasPeriodo = async (req, res) =>
{

}

const getVisitasMunicipio = async (req, res) =>
{
    try
    {
        const municipios = await Municipio.find();
        const visitasPorMunicipio = await Promise.all(
            municipios.map(async municipio =>
            {
                const visitas = await Visita.find({ municipio: municipio._id }).countDocuments();
                return { municipio: municipio.name, visitas };
            })
        );
        return res.json({ visitasPorMunicipio });
    } catch (error)
    {
        console.log(error);
        return res.status(500).json({ msg: 'Error al obtener las visitas por municipio' });
    }
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
}