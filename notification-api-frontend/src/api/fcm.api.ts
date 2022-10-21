import { post } from '.';
import { SuccessResponseInterface } from '../interfaces/api';
import { NotificationT, TokenModel } from '../interfaces/common';

export default class FCMApi {
  static async sendAllNotification(
    notification: NotificationT
  ): Promise<SuccessResponseInterface<TokenModel>> {
    const response: SuccessResponseInterface<TokenModel> = await post(
      '/fcm/all',
      { notification }
    );
    return response;
  }

  static async sendNotificationToToken(
    token: string,
    notification: NotificationT
  ): Promise<SuccessResponseInterface<TokenModel>> {
    const response: SuccessResponseInterface<TokenModel> = await post(
      '/fcm/token',
      { token, notification }
    );
    return response;
  }

  static async sendNotificationToTopic(
    topic: string,
    notification: NotificationT
  ): Promise<SuccessResponseInterface<TokenModel>> {
    const response: SuccessResponseInterface<TokenModel> = await post(
      '/fcm/topic',
      { topic, notification }
    );
    return response;
  }

  static async subscribeToTopic(
    token: string,
    topic: string
  ): Promise<SuccessResponseInterface<TokenModel>> {
    const response: SuccessResponseInterface<TokenModel> = await post(
      '/fcm/subscribe',
      { token, topic }
    );
    return response;
  }

  static async unSubscribeToTopic(
    token: string,
    topic: string
  ): Promise<SuccessResponseInterface<TokenModel>> {
    const response: SuccessResponseInterface<TokenModel> = await post(
      '/fcm/unsubscribe',
      { token, topic }
    );
    return response;
  }
}
