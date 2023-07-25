import express from 'express';
import clientMiddleware from './middleware/client';
import auth from './middleware/auth';
import ping from './handlers/ping';
import message from './handlers/message';
import work from './handlers/work';
import { clients, messages } from './lib/memory/types';

var app = express();

app.use(express.json());
app.use(clientMiddleware);

app.post('/ping', ping.postHandler(clients));
app.post('/message', auth, message.postHandler(messages));
app.get('/work', auth, work.getHandler(messages));
app.post('/work', auth, work.postHandler(messages));

const loop = () => {
  console.log('----------------------------------------');
  console.log('Clients:');
  for (const [key, value] of clients.entries()) {
    console.log(`${key}: ${value.status}`);
  }
  console.log('Messages to be worked:');
  for (const [key, value] of messages.entries()) {
    console.log(`${key}: ${value}`);
  }

  for (const [id, { status }] of clients.entries()) {
    if (status === 'online') {
      clients.set(id, { status: 'idle' });
    } else if (status === 'idle') {
      clients.set(id, { status: 'offline' });
    } else if (status === 'offline') {
      clients.delete(id);
    }
  }
};

app.listen(2453, () => {
  console.info(`Sonar listening at http://localhost:2453`);
  loop();
  setInterval(loop, 5000);
});
