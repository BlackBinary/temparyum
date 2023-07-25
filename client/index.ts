import { v4 as uuid, NIL } from 'uuid';
import ping from './service/ping';
import work from './service/work';
import message from './service/message';

const clientId = uuid();

setTimeout(async () => {
  setInterval(async () => {
    ping(clientId);

    work(clientId);
  }, 5000);

  message(clientId, 'Hello, world!');
}, 400);
