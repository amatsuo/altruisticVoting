/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2016 Amatz <matsuoakitaka@gmail.com>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var stepRules = ngc.stepRules;
var constants = ngc.constants;
var counter = 0;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var node = gameRoom.node;
    var channel =  gameRoom.channel;

    // Must implement the stages here.

    // Increment counter.
    counter = counter ? ++counter : settings.SESSION_ID || 1;

    stager.setOnInit(function() {

        // Initialize the client.

    });

    stager.extendStep('instructions', {
        cb: function() {
            console.log('Instructions.');
        }
    });


    stager.extendStep('instructions_KK', {
        cb: function() {
            console.log('Instructions KK.');
        }
    });

    
    stager.extendStep('kkpair_choice', {
        cb: function() {
            console.log('kkpair choice.');
        }
    });

    
    stager.extendStep('kk_result', {
        cb: function() {
            console.log('kkpair choice.');
        }
    });


    stager.extendStep('instructions_DG', {
        cb: function() {
            console.log('Instructions Dicataor Game.');
        }
    });

    stager.extendStep('dict_game', {
        cb: function() {
            console.log('dictator game');
        }
    });

    
    stager.extendStep('instructions_VotingGame', {
        cb: function() {
            console.log('Instructions Voting Game.');
        }
    });

    stager.extendStep('votingGame', {
        cb: function() {
            console.log('votingGame');
        }
    });

    stager.extendStep('game', {
        cb: function() {
            console.log('Game round: ' + node.player.stage.round);
            doMatch();
        }
    });

    stager.extendStep('end', {
        cb: function() {
            node.game.memory.save(channel.getGameDir() + 'data/data_' +
                                  node.nodename + '.json');
        }
    });

    stager.setOnGameOver(function() {

        // Something to do.

    });

    // Here we group together the definition of the game logic.
    return {
        nodename: 'lgc' + counter,
        // Extracts, and compacts the game plot that we defined above.
        plot: stager.getState(),

    };

    // Helper functions.

    function doMatch() {
        var players, len;
        len = node.game.pl.size();
        players = node.game.pl.shuffle().id.getAllKeys();
        node.say('ROLE_DICTATOR', players[0], players[1]);
        node.say('ROLE_OBSERVER', players[1]);
    }
};
