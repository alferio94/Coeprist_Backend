import nodemailer from 'nodemailer'


export const emailRegistro = async (datos) =>
{
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //informacion del email

    const info = await transport.sendMail({
        from: '"COEPRST - Administrador de visitas <direccion@coeapristtlx.com>"',
        to: email,
        subject: "Confirma tu cuenta de COEPRIST",
        text: "Comprueba tu cuenta de visitante en coeprist",
        html: `
            <p>Hola: ${nombre} bienvenido a la plataforma de COEPRIST Tlaxcala </p>
            <p>Tu cuenta ya esta registrada por favor da click en el siguiente enlace para confirmarla</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Confirmar Cuenta</a>  
            
            <p>Si tu no creaste esta cuenta por favor contacta con la direccion de COEPRIST Tlaxcala</p>
        `
    })
}

export const emailOlvidePassword = async (datos) =>
{
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //informacion del email

    const info = await transport.sendMail({
        from: '"COEPRST - Administrador de visitas <direccion@coeapristtlx.com>"',
        to: email,
        subject: "Recupera tu password de COEPRIST",
        text: "Recupera tu cuenta de COEPRIST Tlaxcala",
        html: `
            <p>Hola: ${nombre} recibimos tu solicitud de restablecer tu password. </p>
            <p>Para reestablecer tu password da click en el siguiente enlace para generar un nuevo password</p>
            <a href="${process.env.FRONTEND_URL}/nuevo-password/${token}"> Reestablecer Password</a>  
            
            <p>Si tu no solicitaste este email por favor contacta con la direccion de COEPRIST Tlaxcala</p>
        `
    })
}