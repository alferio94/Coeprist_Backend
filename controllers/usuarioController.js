import Usuaruio from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrarUsuario = async (req, res) =>
{
    const { email } = req.body;
    const existeUsuario = await Usuaruio.findOne({ email });

    if (existeUsuario)
    {
        const error = new Error('Usuario ya registrado');
        res.status(400).json({ msg: error.message });
    }
    try
    {
        const usuario = new Usuaruio(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);
    }
    catch (err)
    {
        console.log(err.message);
    }
}

const autenticar = async (req, res) =>
{
    const { email, password } = req.body

    const usuario = await Usuaruio.findOne({ email })
    if (!usuario)
    {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }
    if (!usuario.confirmado)
    {
        const error = new Error('El usuario no ha sido confirmado');
        return res.status(403).json({ msg: error.message });
    }
    if (await usuario.comprobarPassword(password))
    {
        res.json({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id, usuario.admin)
        })
    } else
    {
        const error = new Error('El password es incorrecto')
        return res.status(403).json({ msg: error.message })
    }

}

const confirmar = async (req, res) =>
{
    const { token } = req.params
    const usuarioConfirmar = await Usuaruio.findOne({ token });
    if (!usuarioConfirmar)
    {
        const error = new Error('Token no valido')
        return res.status(403).json({ msg: error.message })
    }
    try
    {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ''
        await usuarioConfirmar.save();
        return res.json({ msg: 'Usuario Confirmado Correctamente' })
    } catch (error)
    {
        console.log(error.message)
    }
}
const olvidePassword = async (req, res) =>
{
    const { email } = req.body
    const usuario = await Usuaruio.findOne({ email })
    if (!usuario)
    {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }
    try
    {
        usuario.token = generarId();
        await usuario.save();
        return res.json({ msg: 'Se ha enviado un correo con las instrucciones necesarias.' })
    } catch (error)
    {
        console.log(error)
    }
}

const comprobarToken = async (req, res) =>
{
    const { token } = req.params;
    const tokenValido = await Usuaruio.findOne({ token });

    if (tokenValido)
    {
        res.json({ msg: 'Token valido' })
    } else
    {
        const error = new Error('Token no valido')
        res.status(404).json({ msg: error.message })
    }
}
const changePassword = async (req, res) =>
{
    const { token } = req.params
    const { password } = req.body
    const usuario = await Usuaruio.findOne({ token });

    if (usuario)
    {
        usuario.password = password;
        usuario.token = '';
        await usuario.save();
        try
        {
            return res.json({ msg: 'Password modificado correctamente' })
        } catch (error)
        {
            console.log(error);
        }
    } else
    {
        const error = new Error('Token no valido')
        res.status(404).json({ msg: error.message })
    }
}

const perfil = async (req, res) =>
{
    const { usuario } = req
    return res.json({ usuario })
}

export
{
    registrarUsuario,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    changePassword,
    perfil
}