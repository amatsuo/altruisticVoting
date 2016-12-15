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
    .next('kk_result');
  stager.next('instructions_DG');
  stager.repeatStage('dict_games', settings.DG_REPEAT);
  stager.step("dict_game");
  stager
    .next('instructions_KK');


  stager.repeatStage("public_goods_game", 3);
  stager.step('number_addition_game')
  stager.step('number_addition_results');
  stager.repeatStage('votingRound', settings.VG_REPEAT);
  stager.step('votingGame');
  stager.step('votingResult');
  stager
    .next('instructions_VotingGame');

  stager
    .next('end');

  stager
    .next('instructions');
    // .repeat('game', settings.VG_REPEAT);

  stager
    //.next('kkpair_choice')

    .gameover();

  // Modify the stager to skip one stage.
  // stager.skip('instructions');
  // some sample editing



  return stager.getState();
};
