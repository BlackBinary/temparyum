import makeMemory, { Memory } from './';

export const clients = makeMemory<{
  status: 'online' | 'idle' | 'offline';
}>();
export const messages = makeMemory<[string]>();
export type Clients = typeof clients;
export type Messages = typeof messages;
