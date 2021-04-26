import { Router } from 'express';
import { createUserController } from './useCases/createUser/index';

const router = Router();

router.post('/users', (req, resp) => {
    return createUserController.handle(req, resp);
});

router.get('/users', (req, resp) => {
    return createUserController.list(req, resp);
});



export default router;
