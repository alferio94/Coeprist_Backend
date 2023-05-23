import express from "express";
import { getUsuarioVisitas, getVisitas, getVisitasMunicipio, getVisitasPeriodo, crearVisita, editarVisita, eliminarVisita, getVisita, getVisitasMunicipioXLSX } from '../controllers/visitaController.js'
import { checkAdmin, checkAuth, checkVisitor } from '../middleware/checkAuth.js'

const router = express.Router();

router.route('/').get(checkAuth, getVisitas).post(checkVisitor, crearVisita)
router.get('/municipios', checkAdmin, getVisitasMunicipioXLSX)
router.get('/visitor/:visitorId', checkAdmin, getUsuarioVisitas)
router.route('/:id').put(checkAdmin, editarVisita).delete(checkAdmin, eliminarVisita).get(checkAuth, getVisita)
router.get('/:month', checkAuth, getVisitasPeriodo)

export default router;