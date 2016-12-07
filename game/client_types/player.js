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
      frame: 'kk_result.html',
      cb: function() {
        node.on.data('group', function(msg) {
          // Make the dictator display visible.
          W.setInnerHTML('group', msg.data);
          W.setInnerHTML('group2', msg.data);
          W.setInnerHTML('group3', msg.data);
          W.setInnerHTML('groupSize', node.game.settings.GROUP_SIZE);

          node.game.mygroup = msg.data;
        });
      }
    });

    stager.extendStep('number_addition_game', {
      frame: 'number_addition_game.html',
      cb: function() {
        var num1, num2;
        // show initial set of numbers
        num1 = Math.floor(Math.random()*(99-10)+10);
        num2 = Math.floor(Math.random()*(99-10)+10);
        W.setInnerHTML('num1', num1);
        W.setInnerHTML('num2', num2);

        //display group name
        W.setInnerHTML('group', node.game.mygroup);

        var b = W.getElementById('read');
        node.game.correct = 0;

        node.on.data('tokens_update', function(msg) {
          W.setInnerHTML('totalMyGroup', msg.data);
        });

        b.onclick = function() {
          /*var num1 = parseInt($(W.getElementById('num1')).text());
          var num2 = parseInt($(W.getElementById('num2')).text());*/
          W.getElementById('container').style.display = 'none';
          var resultint = W.getElementById('result').value;
          var result = JSUS.isInt(resultint,0,200);
          var success = (resultint == num1+num2);

          W.getElementById('result').value = "";
          num1 = Math.floor(Math.random()*(99-10)+10);
          num2 = Math.floor(Math.random()*(99-10)+10);

          W.setInnerHTML('num1', num1);
          W.setInnerHTML('num2', num2);

          if(result === false){
            console.log("validación Modal error");
          }
          else{
            if(success){
              W.getElementById('alertSucces').style.display = 'block';
              W.getElementById('alertDanger').style.display = 'none';
              node.game.correct++;
              node.say('correct', 'SERVER', node.game.correct);
            }
            else{
              W.getElementById('alertDanger').style.display = 'block';
              W.getElementById('alertSucces').style.display = 'none';
            }
            W.getElementById('myTokens').innerHTML = node.game.correct;
            //node.done();

          }
          setTimeout(function() {
            W.getElementById('container').style.display = 'block';
          }, 100);

        };

      }
    });
    stager.extendStep('number_addition_results', {
        frame: 'number_addition_results.html',
        cb: function() {
          node.on.data('na_results', function(msg) {
            W.setInnerHTML('myGroupTokens', msg.data[0]);
            W.setInnerHTML('otherGroupTokens', msg.data[1]);
            W.setInnerHTML('myGroup', "(" + msg.data[2] + ")");
            W.setInnerHTML('otherGroup', "(" + msg.data[3] + ")");
          });
        }
    });

    stager.extendStep('instructions_DG', {
        frame: 'instructions_DG.html'
    });

    stager.extendStep('dict_game', {
      donebutton: false,
      frame: 'dict_game.html',
      cb: function() {
        var otherGroup = node.game.mygroup == "Klee" ? "Kandinsky" : "Klee";
        var recipient_msgs = {
          "Anonymous" : 'You know nothing about this anonymous individual.',
          "Peer" : 'The only thing you know about this individual is that he or she is a member of your <strong>' +
           node.game.mygroup + " group</strong>.",
          "Other" : 'The only thing you know about this individual is that he or she is a member of <strong>' +
           otherGroup + " group</strong>."
        };
        var recipient;

        node.on.data('recipient', function(msg) {
          var recp_text = recipient_msgs[msg.data[1]];
          recipient = msg.data[0];
          // // Make the dictator display visible.
          W.setInnerHTML('recipient', recp_text);
          // W.setInnerHTML('group2', msg.data);
          // W.setInnerHTML('group3', msg.data);
          // W.setInnerHTML('groupSize', node.game.settings.GROUP_SIZE);
          //
          // node.game.mygroup = msg.data;
        });

        var b = W.getElementById('read');

        b.onclick = function() {
          var valueR=0;
          var send = W.getElementById('Send');
          var valueS = send.value;
          valueS = JSUS.isInt(valueS, 0, node.game.settings.CANTIDAD);

          if ( valueS === false ) {
            var modal = W.getElementById("ERROR");
            $(modal).modal();
            $('.modal-backdrop').remove();
          }
          else {
            send.disabled = true;
            b.disabled = true;
            W.writeln(' Waiting for the decision of other players',
                      W.getElementById('dictGame'));
            node.say('send', recipient, valueS);
            node.on.data('send', function(msg){
              valueR = msg.data;
              node.done({
                value: 100 - valueS + valueR ,
                sent_value: valueS,
                received_value: valueR,
                recipient: recipient,
                module: 'Module3'
              });
              node.say('send', recipient, valueS);
            });
          }
        };

      }
    });

    stager.extendStep('instructions_VotingGame', {
        frame: 'instructions_VotingGame.html'
    });

    stager.extendStep('votingGame', {
        //donebutton: false,
        frame: 'votingGame.html'
    });

    stager.extendStep('votingResult', {
        //donebutton: false,
        frame: 'votingResult.html'
    });


    // stager.extendStep('game', {
    //     donebutton: false,
    //     frame: 'game.htm',
    //     cb: function() {
    //
    //         node.on.data('ROLE_DICTATOR', function(msg) {
    //             var button, offer, div;
    //
    //             // Make the dictator display visible.
    //             div = W.getElementById('dictator').style.display = '';
    //             button = W.getElementById('submitOffer');
    //             offer =  W.getElementById('offer');
    //
    //
    //             // Setup the timer.
    //             node.game.visualTimer.init({
    //                 milliseconds: node.game.settings.bidTime,
    //                 timeup: function() {
    //                     node.game.randomOffer(offer, button);
    //                 }
    //             });
    //             node.game.visualTimer.updateDisplay();
    //             node.game.visualTimer.startTiming();
    //
    //             // Listen on click event.
    //             button.onclick = function() {
    //                 var to, decision;
    //                 // Validate offer.
    //                 decision = node.game.isValidBid(offer.value);
    //                 if ('number' !== typeof decision) {
    //                     W.writeln('Please enter a number between ' +
    //                               '0 and 100.');
    //                     return;
    //                 }
    //                 button.disabled = true;
    //
    //                 // The recipient of the offer.
    //                 to = msg.data;
    //
    //                 // Send the decision to the other player.
    //                 node.say('decision', to, decision);
    //
    //                 // Mark the end of the round, and
    //                 // store the decision in the server.
    //                 node.done({ offer: decision });
    //             };
    //         });
    //
    //         node.on.data('ROLE_OBSERVER', function(msg) {
    //             var button, span, offer, div;
    //
    //             node.game.visualTimer.clear();
    //             node.game.visualTimer.startWaiting({
    //                 milliseconds: node.game.settings.bidTime,
    //                 timeup: false
    //             });
    //
    //             // Make the observer display visible.
    //             div = W.getElementById('observer').style.display = '';
    //             span = W.getElementById('dots');
    //             W.addLoadingDots(span);
    //
    //             node.on.data('decision', function(msg) {
    //                 W.setInnerHTML('decision',
    //                                'The dictator offered: ' +
    //                                msg.data + ' ECU.');
    //
    //                 node.timer.randomDone();
    //             });
    //         });
    //     }
    // });

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
