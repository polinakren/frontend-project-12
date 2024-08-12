import { useContext } from 'react';
import { SocketContext, ProfanityContext } from '../context';

const useSocket = () => useContext(SocketContext);
const useProfanity = () => useContext(ProfanityContext);

export { useSocket, useProfanity };
