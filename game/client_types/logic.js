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
    init: function(){
      node.game.kkscore = [];
    },
    cb: function() {
      node.on.data('score', function(msg){
        node.game.kkscore.push([msg.from, msg.data]);
        console.log(node.game.kkscore[node.game.kkscore.length - 1]);
      });
      console.log('kkpair choice.');
    }
  });


  stager.extendStep('kk_result', {
    init: function(){
      var sorted = node.game.kkscore;
      sorted.sort(function(a, b) {
          return a[1] - b[1]
      });
      node.game.kkgroup = {};
      var npart = sorted.length;
      for(var i = 0; i < npart; i ++){
        var gr = (i < npart / 2) ? "Klee" : "Kandinsky"
        node.game.kkgroup[sorted[i][0]] = gr;
        console.log([sorted[i][0], gr]);
        node.say("group", sorted[i][0], gr);
      }
    },
    cb: function() {
      console.log('kkpair results.');
    }
  });


  stager.extendStep('number_addition_game', {
    cb: function() {
      console.log('Number addition game.');
      // var gs = this.getCurrentGameStage();
      // console.log("gs: %o", gs);

      node.game.grouptokens = {"Klee": 0, "Kandinsky": 0};
      node.on.data('correct', function(msg){
        var cgroup = node.game.kkgroup[msg.from];
        node.game.grouptokens[cgroup]++;
        console.log(cgroup + node.game.grouptokens[cgroup]);
        node.game.pl.each(function(p) {
          var res_group = node.game.kkgroup[p.id];
          //console.log("round_info: %o", messageData);
          if(res_group == cgroup){
            node.say('tokens_update', p.id, node.game.grouptokens[cgroup]);
          }
        });
      });
    }
  });

  stager.extendStep('number_addition_results', {
    cb: function() {
      console.log('Number addition results.');
      //node.game.grouptokens = {"Klee": 0, "Kandinsky": 0};
      node.game.pl.each(function(p) {
        var res_group = node.game.kkgroup[p.id];
        //console.log("round_info: %o", messageData);
        var other_group = res_group == "Klee" ? "Kandinsky" : "Klee";

        node.say('na_results', p.id,
          [node.game.grouptokens[res_group],
          node.game.grouptokens[other_group],
          res_group,
          other_group ]);
      });
    }
  });


  stager.extendStep('instructions_DG', {
    cb: function() {
      console.log('Instructions Dicataor Game.');
      var game_orders = ["Other", "Anonymous", "Peer"];
      //game_orders = shuffle(game_orders);
      node.game.dg_orders = game_orders;
      node.game.dg_payround = parseInt(Math.random() * 3 + 1);
      console.log(game_orders);
    }
  });

  stager.extendStep('dict_game', {
    cb: function() {
      var current = this.getCurrentGameStage();
      //console.log(current.round);
      var game_type = node.game.dg_orders[current.round - 1];
      console.log('dictator game round', current.round);
      console.log('dictator game type', game_type);
      var playerA, playerB;
      if(game_type == "Anonymous"){
        var g, i;
        g = node.game.pl.shuffle();
        for(i = 0;i < node.game.pl.size(); i = i + 2){
            playerA = g.db[i].id;
            playerB = g.db[i + 1].id;
            node.say('recipient' , playerA, [playerB, game_type]);
            node.say('recipient' , playerB, [playerA, game_type]);
        }
      }
      var members = { Klee : [],
        Kandinsky: []};
      var id;
      for (id in node.game.kkgroup) {
        if (node.game.kkgroup[id] == 'Klee') {
          members.Klee.push(id);
        } else {
          members.Kandinsky.push(id);
        }
      }
      console.log("Klee", members.Klee);
      console.log("Kandinsky", members.Kandinsky);
      if(game_type == "Peer"){
        var gr_text;
        for (gr_text in members) {
          var cgroup = members[gr_text];
          cgroup = shuffle(cgroup);
          var i;
          for (i = 0; i < cgroup.length; i = i + 2) {

            var j = (i + 1) % cgroup.length;
            console.log(i, j);
            playerA = cgroup[i];
            playerB = cgroup[j];
            console.log(playerA, playerB);
            node.say('recipient' , playerA, [playerB, game_type]);
            node.say('recipient' , playerB, [playerA, game_type]);
          }
        }
      }
      if(game_type == "Other"){
        var max_idx = Math.max(members.Klee.length, members.Kandinsky.length);
        var i;
        for (i = 0; i < max_idx; i++) {
          members.Klee = shuffle(members.Klee);
          members.Kandinsky = shuffle(members.Kandinsky);

          var i_kl , i_kn;
          i_kl = i % members.Klee.length;
          i_kn = i % members.Kandinsky.length;
          playerA = members.Klee[i_kl];
          playerB = members.Kandinsky[i_kn];
          console.log(playerA, playerB);

          node.say('recipient' , playerA, [playerB, game_type]);
          node.say('recipient' , playerB, [playerA, game_type]);
        }
      }
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

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

};
