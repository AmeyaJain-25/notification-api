import { get, post } from '.';
import { SuccessResponseInterface } from '../interfaces/api';
import { TokenModel } from '../interfaces/common';

export default class TokenApi {
  static async getTokens() {
    const response: SuccessResponseInterface<TokenModel> = await get('/token');
    return response;
  }

  static async storeToken(token: string) {
    const response: SuccessResponseInterface<TokenModel> = await post(
      '/token',
      { token }
    );
    return response;
  }
}
