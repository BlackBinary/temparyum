import http from '../lib/http';
import hash from '../lib/hash';

export default async (clientId: string) => {
  const makeRequest = http(clientId);

  const response = await makeRequest('GET', 'http://localhost:2453/work');

  const { work } = response as { work: string[] };

  console.log('----------------------------------------');
  console.log('Work:');
  work.forEach(([client, work]) => {
    console.log(`${client}\n  -> ${work}`);
  });

  if (work.length === 0) {
    return;
  }

  const workPiece = work[0][1][0];
  console.log('Starting work on:', workPiece);
  const { nonce, hash: calculatedHash } = hash(workPiece, 5);
  console.log('Found nonce:', nonce);
  console.log('Calculated hash:', calculatedHash);

  await makeRequest('POST', 'http://localhost:2453/work', {
    nonce,
    hash: calculatedHash,
    clientId,
  });
};
