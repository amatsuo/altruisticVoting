/**
 * # Waiting Room settings
 * Copyright(c) 2016 Amatz <matsuoakitaka@gmail.com>
 * MIT Licensed
 *
 * Waiting Room settings.
 *
 * http://nodegame.org
 * ---
 */
module.exports = {

    /**
     * ## EXECUTION_MODE (string)
     *
     * Sets the execution mode of the waiting room
     *
     * Different modes might have different default values, and need
     * different settintgs.
     *
     * Available modes:
     *
     *   - ´TIMEOUT´, waits until the time is up, then it checks
     *        whether enough players are connected to start the game.
     *   - ´WAIT_FOR_N_PLAYERS´, the game starts right away as soon as
     *        the desired number of connected players is reached.
     */
    // EXECUTION_MODE: 'TIMEOUT',
    EXECUTION_MODE: 'WAIT_FOR_N_PLAYERS',

    /**
     * ## GROUP_SIZE (number)
     *
     * The size of each group dispatched by the waiting room
     */
    GROUP_SIZE: 2,

    /**
     * ## POOL_SIZE (number) Optional
     *
     * If set, waits until POOL_SIZE clients are connected to dispatch a group
     *
     * Must be >= POOL_SIZE.
     *
     * Default: GROUP_SIZE
     */
    POOL_SIZE: 2,

    /**
     * ## N_GAMES (number) Optional
     *
     * Number of games to dispatch
     *
     * If set, the waiting room will be closed after N_GAMES have
     * been dispatched
     *
     * Default: undefined, no limit.
     */
    // N_GAMES: 1,

    /**
     * ## MAX_WAIT_TIME (number) Optional
     *
     * Maximum waiting time in milliseconds in the waiting room
     *
     * After the max waiting time expired clients are disconnected
     */
    MAX_WAIT_TIME: 90000,

    /**
     * ## START_DATE (string|object) Optional
     *
     * Time and date of the start of the game.
     *
     * Overrides `MAX_WAIT_TIME`. 
     *
     * Accepted values: any valid argument to `Date` constructor.
     */
    // START_DATE: 'December 31, {YEAR} 12:00:00',
    // START_DATE: new Date().getTime() + 30000,

    /**
     * ## CHOSEN_TREATMENT (string|function)
     *
     * The treatment assigned to every new group
     *
     * Accepted values:
     *
     *   - "treatment_rotate": rotates the treatments.
     *   - undefined: a random treatment will be selected.
     *   - function: a callback returning the name of the treatment. E.g:
     *
     *       function(treatments, roomCounter) {
     *           return treatments[num % treatments.length];
     *       }
     *
     * Default: undefined, random treatment
     */
    CHOSEN_TREATMENT: function(treatments, roomCounter) {
        return treatments[roomCounter % treatments.length];
    },

    /**
     * ## ON_TIMEOUT (function) Optional
     *
     * A callback function to be executed on the client when wait time expires
     */
    // ON_TIMEOUT: function() {
    //    console.log('I am timed out!');
    // },

    /**
     * ## ON_TIMEOUT_SERVER (function) Optional
     *
     * A callback function to be executed on the server when wait time expires
     *
     * The context of execution is WaitingRoom.
     */
    // ON_TIMEOUT_SERVER: function(code) {
    //    console.log('*** I am timed out! ', code.id);
    // }

    /**
     * ## DISPATCH_TO_SAME_ROOM (boolean) Optional
     *
     * If TRUE, every new group will be added to the same game room
     *
     * A new game room will be created for the first dispatch, and
     * reused for all successive groups. Default, FALSE.
     *
     * !Notice the game must support adding players while it is running.
     *
     * Default: FALSE
     *
     * @see WaitingRoom.lastGameRoom
     */
    // DISPATCH_TO_SAME_ROOM: true

    /**
     * ## logicPath (string) Optional
     *
     * If set, a custom implementation of the wait room will be used
     *
     * @see wait.room.js (nodegame-server)
     */
    // logicPath: 'path/to/a/wait.room.js',

    /**
     * ## DISCONNECT_IF_NOT_SELECTED (boolean) Optional [experimental]
     *
     * Disconnect a client if not selected for a game when dispatching
     */
    DISCONNECT_IF_NOT_SELECTED: false
};
