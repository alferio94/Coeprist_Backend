import express from "express";
import { getUsuarioVisitas, getVisitas, getVisitasMunicipio, getVisitasPeriodo, crearVisita, editarVisita, eliminarVisita, createMunicipio } from '../controllers/visitaController.js'
import { checkAdmin, checkAuth, checkVisitor } from '../middleware/checkAuth.js'

const router = express.Router();

router.route('/').get(checkAuth, getVisitas).post(checkVisitor, crearVisita)
router.get('/visitor/:visitorId', checkAdmin, getUsuarioVisitas)
router.route('/:id').put(checkAdmin, editarVisita).delete(checkAdmin, eliminarVisita)
router.get('/:municipioId', checkAdmin, getVisitasMunicipio)
router.get('/:month', checkAuth, getVisitasPeriodo)
router.post('/municipio/', createMunicipio)

export default router;