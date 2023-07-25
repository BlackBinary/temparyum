import http from '../lib/http';

export default async (clientId: string) => {
  const makeRequest = http(clientId);
  await makeRequest('POST', 'http://localhost:2453/ping');
};
