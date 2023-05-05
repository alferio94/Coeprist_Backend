import jwt from "jsonwebtoken";

const generarJWT = (id, admin) =>
{
    return jwt.sign({ id, admin }, process.env.SECRET, {
        expiresIn: '1d'
    })
}

export default generarJWT;