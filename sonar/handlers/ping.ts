import { validate as isValidUUID } from 'uuid';
import { Request, Response } from 'express';
import responses from '../../responses';
import type { Clients } from '../lib/memory/types';

export const postHandler =
  (clients: Clients) => (req: Request, res: Response) => {
    const id = req.headers['x-client-id'] as string;
    if (!isValidUUID(id)) {
      res.status(400).json({
        error: 'Invalid client ID',
      });
      return;
    }

    clients.set(id, { status: 'online' });

    const client = clients.get(id);

    res
      .status(responses.status.SUCCESS)
      .json(responses.make.success({ client }));
  };

export default {
  postHandler,
};
