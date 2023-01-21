import { getGameSession } from "../../../game-handler.js";
import Packet from "../packet.js";

class JoinGame extends Packet {

    handle = (socket, payload) => {

        console.log(payload)
        const GAME_SESSION = getGameSession(payload.room);

        if (GAME_SESSION === null) return socket.emit('no session', 'Session ID not found...');

        if (GAME_SESSION.join(socket.id, payload.displayName)) {

            socket.join(payload.room);
            socket.emit('joined', 'Successfully connected to session...');

        } else {

            socket.emit('full', 'This room is at max players!')

        }
    }
}

export const get = () => {

    return (new JoinGame('join game'));
}