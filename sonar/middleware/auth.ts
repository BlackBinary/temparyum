import type { Request, Response } from 'express';
import { validate as isValidUUID } from 'uuid';

export default (req: Request, res: Response, next: any) => {
  const { clientId } = req;

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

  next();
};
