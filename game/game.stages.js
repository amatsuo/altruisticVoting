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

  stager.next('instructions_DG');
  stager.repeatStage('dict_games', settings.DG_REPEAT);
  stager.step("dict_game");
  stager
    .next('kkpair_choice')
    .next('kk_result');
  stager.repeatStage("public_goods_game", 3);
  stager.step('number_addition_game')
  stager.step('number_addition_results');

  stager
    .next('instructions_KK')
    .next('votingGame');
  stager
    .next('instructions_VotingGame')
    .next('instructions')
    //.next('kkpair_choice')
    .repeat('game', settings.VG_REPEAT)
    .next('end')
    .gameover();

  // Modify the stager to skip one stage.
  // stager.skip('instructions');
  // some sample editing



  return stager.getState();
};
