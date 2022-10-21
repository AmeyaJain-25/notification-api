import { Router } from 'express';
import {
  sendAllNotification,
  sendNotificationToToken,
  sendNotificationToTopic,
  subscribeToTopic,
  unSubscribeToTopic,
} from '../controllers/fcm.controller';
const router = Router();

// this route is POST /all
router.post('/all', sendAllNotification);

// this route is POST /token
router.post('/token', sendNotificationToToken);

// this route is POST /topic
router.post('/topic', sendNotificationToTopic);

// this route is POST /subscribe
router.post('/subscribe', subscribeToTopic);

// this route is POST /unsubscribe
router.post('/unsubscribe', unSubscribeToTopic);

export default router;
