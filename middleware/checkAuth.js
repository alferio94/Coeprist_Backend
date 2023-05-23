import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const verifyToken = async (req, res, next) =>
{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try
        {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            const usuario = await Usuario.findById(decoded.id).select('-password -confirmado -token -createdAt -updatedAt -__v ')
            req.usuario = usuario;
            next();
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
};

const checkAuth = async (req, res, next) =>
{
    await verifyToken(req, res, next);
};

const checkAdmin = async (req, res, next) =>
{
    await verifyToken(req, res, async () =>
    {
        const usuario = req.usuario;
        if (!usuario.admin)
        {
            const error = new Error('Acceso Denegado')
            return res.status(403).json({ msg: error.message })
        }
        next();
    });
};

const checkVisitor = async (req, res, next) =>
{
    await verifyToken(req, res, async () =>
    {
        const usuario = req.usuario;
        if (usuario.admin)
        {
            return res.status(403).json({ msg: 'Acceso denegado' })
        }
        next();
    });
};

export { checkAuth, checkAdmin, checkVisitor };