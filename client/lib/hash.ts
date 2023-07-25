import crypto from 'node:crypto';

export const calculateHash = (piece: string): string => {
  const hash = crypto.createHash('sha256');
  hash.update(piece);
  return hash.digest('hex');
};

export const calculatePOWHash = (piece: string, difficulty: number) => {
  let nonce = 0;

  let hash;
  do {
    hash = calculateHash(piece + nonce);
    nonce++;
  } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

  return { nonce, hash };
};

export default calculatePOWHash;
