import { Request, Response } from 'express';
import {
  sendAllNotificationService,
  sendNotificationToTokenService,
  sendNotificationToTopicService,
  subscribeToTopicService,
  unSubscribeToTopicService,
} from '../services/fcm.service';

export const sendAllNotification = async (req: Request, res: Response) => {
  try {
    const { notification } = req.body;
    if (!notification)
      return res.status(400).json({ message: 'Notification is required' });

    const response = await sendAllNotificationService(notification);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Notification sent successfully',
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error?.message || 'Internal Server Error',
    });
  }
};

export const sendNotificationToToken = async (req: Request, res: Response) => {
  try {
    const { token, notification } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required' });
    if (!notification)
      return res.status(400).json({ message: 'Notification is required' });

    const response = await sendNotificationToTokenService(token, notification);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Notification sent successfully',
      response,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error?.message || 'Internal Server Error',
    });
  }
};

export const sendNotificationToTopic = async (req: Request, res: Response) => {
  try {
    const { topic, notification } = req.body;
    if (!topic) return res.status(400).json({ message: 'Topic is required' });
    if (!notification)
      return res.status(400).json({ message: 'Notification is required' });

    const response = await sendNotificationToTopicService(topic, notification);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Notification sent successfully',
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error?.message || 'Internal Server Error',
    });
  }
};

// export const sendNotificationToCondition = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { condition, notification } = req.body;
//     if (!condition)
//       return res.status(400).json({ message: 'Condition is required' });
//     if (!notification)
//       return res.status(400).json({ message: 'Notification is required' });

//     const message = {
//       notification: {
//         title: notification.title || 'Notification Title',
//         body: notification.body || 'Notification Body',
//       },
//       condition,
//     };

//     const response = await firebaseMessaging.send(message);
//     res.status(200).json({
//       statusCode: 200,
//       success: true,
//       message: 'Notification sent successfully',
//       response,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       statusCode: 500,
//       success: false,
//       message: error?.message || 'Internal Server Error',
//     });
//   }
// };

export const subscribeToTopic = async (req: Request, res: Response) => {
  try {
    const { token, topic } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required' });
    if (!topic) return res.status(400).json({ message: 'Topic is required' });

    const response = await subscribeToTopicService(token, topic);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Subscribed to topic successfully',
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error?.message || 'Internal Server Error',
    });
  }
};

export const unSubscribeToTopic = async (req: Request, res: Response) => {
  try {
    const { token, topic } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required' });
    if (!topic) return res.status(400).json({ message: 'Topic is required' });

    const response = await unSubscribeToTopicService(token, topic);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'UnSubscribed to topic successfully',
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error?.message || 'Internal Server Error',
    });
  }
};
