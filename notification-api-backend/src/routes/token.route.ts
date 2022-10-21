import { Router } from 'express';
import {
  getTokensFromDB,
  storeTokenToDB,
} from '../controllers/token.controller';

const router = Router();

// this route is GET /get-tokens
router.get('/', getTokensFromDB);

// this route is POST /store-token
router.post('/', storeTokenToDB);

export default router;
