import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

interface Notification {
  title: string;
  body: string;
}

type NotificationResponse = BatchResponse;

interface TokenModel {
  token: string;
}

export { Notification, NotificationResponse, TokenModel };
