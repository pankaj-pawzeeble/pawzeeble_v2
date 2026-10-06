import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

/** Lazily connect to the realtime server (NEXT_PUBLIC_SOCKET_URL). */
export function getSocket(): Socket {
  if (!socket) socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '', { autoConnect: false });
  return socket;
}
