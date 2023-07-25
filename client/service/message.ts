import http from '../lib/http';
import hash from '../lib/hash';

export default async (clientId: string, message: string) => {
  const makeRequest = http(clientId);

  const messageHash = hash(message, 4);
  await makeRequest('POST', 'http://localhost:2453/message', {
    message,
    messageHash,
  });
};
