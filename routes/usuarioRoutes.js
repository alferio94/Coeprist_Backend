import express from "express";
import { registrarUsuario, autenticar, confirmar, olvidePassword, comprobarToken, changePassword, perfil } from '../controllers/usuarioController.js'
import { checkAuth } from '../middleware/checkAuth.js'
const router = express.Router();

router.post('/', registrarUsuario);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password/', olvidePassword)
router.get('/perfil/', checkAuth, perfil)
router.route('/olvide-password/:token').get(comprobarToken).post(changePassword)



export default router;