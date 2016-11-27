/**
 * # Game stages definition file
 * Copyright(c) 2016 Amatz <matsuoakitaka@gmail.com>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(stager, settings) {

     stager
        .next('kkpair_choice')
        .next('kk_result')
        .next('instructions_KK')
        .next('votingGame')
        .repeat('dict_game', settings.DG_REPEAT)
        .next('instructions_VotingGame')
        .next('instructions')
        //.next('kkpair_choice')
        .next('instructions_DG')
        .repeat('game', settings.REPEAT)
        .next('end')
        .gameover();

    // Modify the stager to skip one stage.
    // stager.skip('instructions');
    // some sample editing



    return stager.getState();
};
