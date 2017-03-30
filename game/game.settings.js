/**
 * # Game settings definition file
 * Copyright(c) 2016 Amatz <matsuoakitaka@gmail.com>
 * MIT Licensed
 *
 * The variables in this file will be sent to each client and saved under:
 *
 *   `node.game.settings`
 *
 * The name of the chosen treatment will be added as:
 *
 *    `node.game.settings.treatmentName`
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = {

    // Variables shared by all treatments.

    // #nodeGame properties:

    /**
     * ## SESSION_ID (number)
     *
     * The name of the first session of the channel
     *
     * The waiting room assigns sequential session ids to every newly
     * spawn game room. The session id is saved in each entry in the
     * memory database of the logics, and used as the name of the
     * session folder in the data/ directory.
     */
    SESSION_ID: 1,

    /**
     * ### TIMER (object) [nodegame-property]
     *
     * Maps the names of the steps of the game to timer durations
     *
     * If a step name is found here, then the value of the property is
     * used to initialize the game timer for the step.
     */
    TIMER: {
        instructions: 240000,
        instructions_KK: 180000,
        instructions_PG: 180000,
        instructions_DG: 240000,
        instructions_VotingGame: 270000,
        kkpair_choice: 120000,
        kk_result: 60000,
        votingGame: 40000,
        votingResult: 30000,
        number_addition_game: 60000, //change
        number_addition_results: 60000,
        dict_game: 60000,
        dict_game_result: 60000,
    },

    // # Game specific properties

    // Numnber of game rounds repetitions.
    VG_REPEAT: 20, // votingGame repeats 20
    DG_REPEAT: 3, // dict_game repeats
    PG_REPEAT: 3, // public_goods_game repeats 3

    // cost of vote
    cost_vote: 5,

    //Encryption settings
    CRYPT: {
      key: '0123456789abcdef0123456789abcdef',
      iv: 'abcdef9876543210abcdef9876543210',
    },

    //post experimental survey link
    survey_link: 'https://lse.eu.qualtrics.com/jfe/form/SV_8iwUHnPrPvlVgGN',

    // Number of participants in each group
    GROUP_SIZE: 7,

    DG_TOKENS: 100,

    EXCHANGE_RATE: 100,

    // # Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.

    treatments: {

        standard: {
            fullName: "Standard Treatment",
            description: "Longer time",
            bidTime: 30000
        },

        pressure: {
            fullName: "Time Pressure Treatment",
            description: "Short times to take decisions",
            bidTime: 10000
        }

    }
};
