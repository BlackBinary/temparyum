import type { Request, Response } from 'express';
import { validate as isValidUUID } from 'uuid';

declare global {
  namespace Express {
    interface Request {
      clientId?: string;
    }
  }
}

export default (req: Request, res: Response, next: any) => {
  const clientId = req.headers['x-client-id'];

  if (!clientId) {
    res.status(400).json({ error: 'No client ID provided' });
    return;
  }

  if (typeof clientId !== 'string') {
    res.status(400).json({ error: 'Invalid client ID' });
    return;
  }

  if (!isValidUUID(clientId)) {
    res.status(400).json({ error: 'Invalid client ID' });
    return;
  }

  req.clientId = clientId;

  next();
};
