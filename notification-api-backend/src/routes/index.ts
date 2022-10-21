import { Router } from 'express';
import fcmRoute from './fcm.route';
import tokenRoute from './token.route';

const router = Router();

router.use('/token', tokenRoute);
router.use('/fcm', fcmRoute);

export default router;
