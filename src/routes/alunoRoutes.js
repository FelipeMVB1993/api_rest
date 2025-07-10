import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, AlunoController.index);
router.post('/', loginRequired, AlunoController.store);
router.get('/:id', loginRequired, AlunoController.show);
router.put('/:id', loginRequired, AlunoController.update);
router.delete('/:id', loginRequired, AlunoController.delete);

export default router;
