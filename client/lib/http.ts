import * as responses from '../../responses';
import fetch, { RequestInit } from 'node-fetch';

export default (clientId: string) =>
  async (method: 'GET' | 'POST', url: string, body?: Record<any, any>) => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Client-ID': clientId,
        },
      };

      if (method !== 'GET') {
        options.body = JSON.stringify(body || {});
      }

      const request = await fetch(url, options);
      const response = (await request.json()) as
        | responses.successResponse
        | responses.errorResponse;
      if (!response) {
        throw new Error('No response');
      }

      return responses.parse(response);
    } catch (e) {
      console.error(e);
      return responses.make.error('Something went wrong');
    }
  };
