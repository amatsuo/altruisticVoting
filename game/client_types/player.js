/**
 * # Player type implementation of the game stages
 * Copyright(c) 2016 Amatz <matsuoakitaka@gmail.com>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var stepRules = ngc.stepRules;
var constants = ngc.constants;
var publishLevels = constants.publishLevels;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var game, cbs;

    // Import other functions used in the game.
    cbs = require(__dirname + '/includes/player.callbacks.js');


    stager.setOnInit(function() {

        // Initialize the client.

        var header, frame;

        // Bid is valid if it is a number between 0 and 100.
        this.isValidBid = function(n) {
            return node.JSUS.isInt(n, -1, 101);
        };

        this.randomOffer = function(offer, submitOffer) {
            var n;
            n = JSUS.randomInt(-1,100);
            offer.value = n;
            submitOffer.click();
        };

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();

        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header);

        this.doneButton = node.widgets.append('DoneButton', header);

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('instructions', {
        frame: 'instructions2.html'
    });

    stager.extendStep('instructions_KK', {
        frame: 'instructions_KK.html'
    });

    stager.extendStep('kkpair_choice', {
        donebutton: false,
        frame: 'kkpair_choice.html',
        cb: function() {

            var i=1;
            var b=W.getElementById('SendChoice');

            b.onclick=function(){
                var arrayAnswers=[];
                var checkall = 0;
                var score = 0;
                for(var i=1;i<=5;i++){
                    var author, checked;
                    checked = 0;
                    if(W.getElementById('choiceA'+i).checked){
                        checked = 1;
                        score += (W.getElementById('choiceA'+i).value == "KL") ? 1:0;
                    } else if (W.getElementById('choiceB'+i).checked){
                        checked = 1;
                        score += (W.getElementById('choiceB'+i).value == "KL") ? 1:0;
                    }
                    checkall += checked;
                }
                score += Math.random();
                console.log("Score: " + score);
                console.log(checkall);
                if(checkall < 5){
                    console.log("Not answer all");
                    //var dialog = W.getElementById("dialog");
                    var modal = W.getElementById("ERROR");
                    $(modal).modal();
                    $('.modal-backdrop').remove();
                    //console.log(arrayAnswers);
                }else{
                  node.say('score', 'SERVER', score);
                    node.done({
                        score: score,
    //                    arrayAnswers:arrayAnswers
                    });
    //                node.game.answersModule4=arrayAnswers;
                    //console.log(arrayAnswers);
                }

            }
        },

    });

    stager.extendStep('kk_result', {
        frame: 'kk_result.html'
    });

    stager.extendStep('instructions_DG', {
        frame: 'instructions_DG.html'
    });

    stager.extendStep('dict_game', {
        donebutton: false,
        frame: 'dict_game.html'
    });

    stager.extendStep('instructions_VotingGame', {
        frame: 'instructions_VotingGame.html'
    });

    stager.extendStep('votingGame', {
        donebutton: false,
        frame: 'votingGame.html'
    });


    stager.extendStep('game', {
        donebutton: false,
        frame: 'game.htm',
        cb: function() {

            node.on.data('ROLE_DICTATOR', function(msg) {
                var button, offer, div;

                // Make the dictator display visible.
                div = W.getElementById('dictator').style.display = '';
                button = W.getElementById('submitOffer');
                offer =  W.getElementById('offer');


                // Setup the timer.
                node.game.visualTimer.init({
                    milliseconds: node.game.settings.bidTime,
                    timeup: function() {
                        node.game.randomOffer(offer, button);
                    }
                });
                node.game.visualTimer.updateDisplay();
                node.game.visualTimer.startTiming();

                // Listen on click event.
                button.onclick = function() {
                    var to, decision;
                    // Validate offer.
                    decision = node.game.isValidBid(offer.value);
                    if ('number' !== typeof decision) {
                        W.writeln('Please enter a number between ' +
                                  '0 and 100.');
                        return;
                    }
                    button.disabled = true;

                    // The recipient of the offer.
                    to = msg.data;

                    // Send the decision to the other player.
                    node.say('decision', to, decision);

                    // Mark the end of the round, and
                    // store the decision in the server.
                    node.done({ offer: decision });
                };
            });

            node.on.data('ROLE_OBSERVER', function(msg) {
                var button, span, offer, div;

                node.game.visualTimer.clear();
                node.game.visualTimer.startWaiting({
                    milliseconds: node.game.settings.bidTime,
                    timeup: false
                });

                // Make the observer display visible.
                div = W.getElementById('observer').style.display = '';
                span = W.getElementById('dots');
                W.addLoadingDots(span);

                node.on.data('decision', function(msg) {
                    W.setInnerHTML('decision',
                                   'The dictator offered: ' +
                                   msg.data + ' ECU.');

                    node.timer.randomDone();
                });
            });
        }
    });

    stager.extendStep('end', {
        donebutton: false,
        frame: 'end.htm',
        cb: function() {
            node.game.visualTimer.setToZero();
        }
    });

    game = setup;
    game.plot = stager.getState();
    return game;
};
