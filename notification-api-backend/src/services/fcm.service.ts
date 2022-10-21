import { MessagingTopicManagementResponse } from 'firebase-admin/lib/messaging/messaging-api';
import firebaseMessaging from '../config/firebase.config';
import tokenModel from '../models/token.model';
import { Notification, NotificationResponse } from '../types/notification.type';

export const sendAllNotificationService = async (
  notification: Notification
): Promise<NotificationResponse> => {
  try {
    const tokens = await tokenModel.find();
    const registrationTokens = tokens.map((token) => token.token);

    if (registrationTokens.length === 0) {
      throw new Error('No tokens found');
    }

    const message = {
      notification: {
        title: notification.title || 'Notification Title',
        body: notification.body || 'Notification Body',
      },
      tokens: registrationTokens,
    };

    const response = await firebaseMessaging.sendMulticast(message);

    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Internal server error !`);
  }
};

export const sendNotificationToTokenService = async (
  token: string,
  notification: Notification
): Promise<string> => {
  try {
    const message = {
      notification: {
        title: notification.title || 'Notification Title',
        body: notification.body || 'Notification Body',
      },
      token,
    };

    const response = await firebaseMessaging.send({
      ...message,
      webpush: {
        notification: {
          icon: 'https://www.google.com/favicon.ico',
          title: 'Notification Title',
          body: 'Notification Body',
        },
      },
    });

    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Internal server error !`);
  }
};

export const sendNotificationToTopicService = async (
  topic: string,
  notification: Notification
): Promise<string> => {
  try {
    const message = {
      notification: {
        title: notification.title || 'Notification Title',
        body: notification.body || 'Notification Body',
      },
      topic,
    };

    const response = await firebaseMessaging.send(message);

    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Internal server error !`);
  }
};

export const subscribeToTopicService = async (
  token: string,
  topic: string
): Promise<MessagingTopicManagementResponse> => {
  try {
    const response = await firebaseMessaging.subscribeToTopic(token, topic);
    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Internal server error !`);
  }
};

export const unSubscribeToTopicService = async (
  token: string,
  topic: string
): Promise<MessagingTopicManagementResponse> => {
  try {
    const response = await firebaseMessaging.unsubscribeFromTopic(token, topic);
    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Internal server error !`);
  }
};
