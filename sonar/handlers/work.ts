import { Request, Response } from 'express';
import type { Messages } from '../lib/memory/types';
import responses from '../../responses';

export const getHandler =
  (messages: Messages) => (req: Request, res: Response) => {
    const { clientId } = req;

    const work = ([...messages.entries()] as [string, string][]).filter(
      ([messageClientId]) => messageClientId !== clientId,
    );

    res.status(responses.status.SUCCESS).json(
      responses.make.success({
        work,
      }),
    );
  };

export const postHandler =
  (messages: Messages) => (req: Request, res: Response) => {
    const { clientId } = req;
    const { body } = req;

    console.log({ clientId, body });

    messages.delete(clientId as string);

    res.status(responses.status.SUCCESS).json(responses.make.success({}));
  };

export default {
  getHandler,
  postHandler,
};
