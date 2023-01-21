import { createGameSession, getGameSession } from "../../../game-handler.js";
import Packet from "../packet.js";

class CreateGame extends Packet {

    handle = async (socket, payload) => {

        if (!payload.displayName) return socket.emit('no displayname', 'You must set a display name!');

        if (!(getGameSession(payload.room) === null)) return socket.emit('session exists', 'Session already exists!');

        const NEW_SESSION = await createGameSession(payload.room, socket.id, 4);

        NEW_SESSION.join(socket.id, payload.displayName);
        socket.join(payload.room);
        socket.emit('created game', `Game room created - ${payload.room.toUpperCase()}`);
    }
}

export const get = () => {

    return (new CreateGame('create game'));
}