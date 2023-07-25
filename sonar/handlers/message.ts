import { Request, Response } from 'express';
import responses from '../../responses';
import type { Messages } from '../lib/memory/types';

const messageString = (
  clientId: string,
  message: string,
  nonce: number,
  hash: string,
): string => {
  const date = new Date().getTime();
  const base64 = Buffer.from(message).toString('base64url');
  return `${clientId}::${base64}::${nonce}::${date}::${hash}`;
};

export const postHandler =
  (messages: Messages) => (req: Request, res: Response) => {
    const { message, messageHash } = req.body;

    if (!message) {
      res
        .status(responses.status.ERROR)
        .json(responses.make.error('No message provided'));
      return;
    }
    const { nonce, hash }: { nonce: number; hash: string } = messageHash;

    const joined = messageString(req.clientId as string, message, nonce, hash);

    if (messages.has(req.clientId as string)) {
      messages.set(
        req.clientId as string,
        messages.get(req.clientId as string).concat(joined),
      );
    } else {
      messages.set(req.clientId as string, [joined]);
    }

    res
      .status(responses.status.SUCCESS)
      .json(responses.make.success({ message }));
  };

export default {
  postHandler,
};
