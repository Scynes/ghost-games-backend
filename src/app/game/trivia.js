import TriviaController from '../controllers/api/trivia.js'

export class Trivia {

    /**
     * The socket id representing the host.
     */
    #hostSocket;

    /**
     * The maximum amount of clients able to connect.
     */
    #maxPlayers = 4;

    /**
     * The trivia schema that will present questions.
     */
    #triviaSchema;

    /**
     * An array containing the connect socket player names.
     */
    #playerDisplayNames = [];

    /**
     * Array containing a list of connected socket clients.
     */
    #SOCKET_CONNECTIONS = [];

    constructor(hostSocket, maxPlayers) {
        this.hostSocket = hostSocket;
        this.maxPlayers = maxPlayers;
    }

    /**
     * Attempts to add a socket connection (player). If the max players
     * are reached, this method will return false.
     * 
     * @param {*} socketId the id of the player client socket.
     * @returns true or false
     */
    join = (socketId, displayName) => {

        if (this.#SOCKET_CONNECTIONS.length == this.maxPlayers) return false;

        this.#SOCKET_CONNECTIONS.push(socketId);

        this.#playerDisplayNames.push(displayName);

        return true;
    }

    /**
     * Getter for the trivia schema...
     * 
     * @returns {triviaSchema}
     */
    getTriviaSchema = () => {

        return this.#triviaSchema;
    }

    getPlayerDisplayNames = () => {

        return this.#playerDisplayNames;
    }

    getMaxPlayers = () => {

        return this.#maxPlayers;
    }

    /**
     * Binds a trivia schema to the trivia game instance.
     * 
     * @param {*} triviaId 
     */
    initilizeSchema = async (triviaId) => {

        this.triviaSchema =  await TriviaController.findById(triviaId);
    }

    /**
     * Used to create a new trivia game instance due to async reasons.
     * 
     * @param {*} hostSocket 
     * @param {*} maxPlayers 
     * @param {*} triviaId 
     * @returns 
     */
    static createInstance = async (hostSocket, maxPlayers, triviaId) => {

        const TRIVIA_INSTANCE = new Trivia(hostSocket, maxPlayers, triviaId);

        await TRIVIA_INSTANCE.initilizeSchema(triviaId);

        return TRIVIA_INSTANCE;
    }
}