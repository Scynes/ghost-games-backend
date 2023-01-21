import { getGameSession } from '../../../game-handler.js';
import Packet from '../packet.js'

class GetPlayers extends Packet {

    handle = (socket, payload) => {

        const GAME_SESSION = getGameSession(payload.room);

        if (GAME_SESSION === null) return socket.emit('no session', 'Session ID not found...');

        socket.emit('players', { players: GAME_SESSION.getPlayerDisplayNames() });
    }
}

export const get = () => {

    return (new GetPlayers('get players'));
}