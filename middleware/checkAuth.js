import jwt from "jsonwebtoken";
import Usuaruio from "../models/Usuario.js";

const checkAuth = async (req, res, next) =>
{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try
        {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            req.usuario = await Usuaruio.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v')
            return next();
        } catch (error)
        {
            return res.status(404).json({ msg: 'Hubo un error' })
        }
    } else
    {
        const error = new Error('Token no valido');
        return res.status(401).json({ msg: error.message })
    }

    next();
};

const checkAdmin = async (req, res, next) =>
{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try
        {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            const usuario = await Usuaruio.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v')
            if (!usuario.admin)
            {
                error = new Error('Acceso denegado')
                return res.status(403).json({ msg: error.message })
            }
            req.usuario = usuario;
            return next();
        } catch (error)
        {
            return res.status(404).json({ msg: 'Hubo un error' })
        }
    } else
    {
        const error = new Error('Token no valido');
        return res.status(401).json({ msg: error.message })
    }

    next();
}
const checkVisitor = async (req, res, next) =>
{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try
        {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            const usuario = await Usuaruio.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v ')
            if (usuario.admin)
            {
                return res.status(403).json({ msg: 'Acceso denegado' })
            }
            req.usuario = usuario;
            return next();
        } catch (error)
        {
            console.log(error)
            return res.status(404).json({ msg: error.message })
        }
    } else
    {
        const error = new Error('Token no valido');
        return res.status(401).json({ msg: error.message })
    }
    next();

}

export { checkAuth, checkAdmin, checkVisitor };