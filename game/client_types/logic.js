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
var nocache = true;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

  var node = gameRoom.node;
  var channel =  gameRoom.channel;

  // Must implement the stages here.

  // Increment counter.
  counter = counter ? ++counter : settings.SESSION_ID;

  // Import other functions used in the game.
  // Some objects are shared.
  var cbs = channel.require(__dirname + '/includes/logic.callbacks.js', {
      node: node,
      gameRoom: gameRoom,
      settings: settings,
      counter: counter
      // Reference to channel added by default.
  }, nocache);

  stager.setOnInit(cbs.init);


  // commented out
  // stager.extendStep('instructions', {
  //     cb: function() {
  //       node.game.payround_exact = [];
  //       node.game.payround = {};
  //       node.game.payround.DG = shuffle(range(1, settings.DG_REPEAT))[0];
  //       node.game.payround.VG = shuffle(range(1, settings.VG_REPEAT))[0];
  //       node.game.payround.PG = shuffle(range(1, settings.PG_REPEAT))[0];
  //       console.log("payrounds: %o", node.game.payround);
  //
  //       console.log('Instructions.');
  //     }
  // });


  stager.extendStep('instructions_KK', {
      cb: function() {
          console.log('Instructions KK.');
          // var CryptoJS = require("crypto-js");
          // var key = CryptoJS.enc.Hex.parse(settings.CRYPT.key);
          // var iv =  CryptoJS.enc.Hex.parse(settings.CRYPT.iv);
          // console.log(key);
          // console.log(iv);
          //
          // // var secret = "M2a=120,M2b=130,M2=110,M3=100,M4R=120,M4=120,T=1301,C=EWKD3EbkhOmwsFp9";
          // var secret = "M2=101,M3=1,M4=80,T=182,C=undefined";
          // //crypted
          // var encrypted = CryptoJS.AES.encrypt(secret, key, {iv:iv});
          // //and the ciphertext put to base64
          // encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
          // encrypted = encodeURIComponent(encrypted);
          // console.log(encrypted);

          // payround for each module is selected here.
          // moved from general instructions
          node.game.payround_exact = [];
          node.game.payround = {};
          node.game.payround.DG = shuffle(range(1, settings.DG_REPEAT))[0];
          node.game.payround.VG = shuffle(range(1, settings.VG_REPEAT))[0];
          node.game.payround.PG = shuffle(range(2, settings.PG_REPEAT + 1))[0]; // include practice round
          console.log("payrounds: %o", node.game.payround);
      }
  });

  stager.extendStep('instructions_PG', {
      cb: function() {
          console.log('Instructions PG.');
          var id;
          for (id in node.game.kkgroup) {
            // console.log(id + node.game.kkgroup[id]);
            node.say("group", id, node.game.kkgroup[id]);
          }
      }
  });


  stager.extendStep('kkpair_choice', {
    init: function(){
      node.game.kkscore = [];
    },
    cb: function() {
      node.on.data('score', function(msg){
        node.game.kkscore.push([msg.from, msg.data]);
        //console.log(node.game.kkscore[node.game.kkscore.length - 1]);
      });

      //console.log('kkpair choice.');
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
        //console.log([sorted[i][0], gr]);
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
      var gs_round = this.getCurrentGameStage().round;
      if (gs_round === 1) {
        node.game.pl.each(function(p) {
          node.say('practice', p.id, 1);
        });
      }
      node.game.grouptokens = {"Klee": 0, "Kandinsky": 0};
      node.game.indtokens = {};
      node.on.data('correct', function(msg){
        var cgroup = node.game.kkgroup[msg.from];
        node.game.grouptokens[cgroup]++;
        if (msg.from in node.game.indtokens) {
          node.game.indtokens[msg.from]++
        } else {
          node.game.indtokens[msg.from] = 1;
        }
        // console.log(cgroup + node.game.grouptokens[cgroup]);
        node.game.pl.each(function(p) {
          var res_group = node.game.kkgroup[p.id];
          //console.log("round_info: %o", messageData);
          node.say('tokens_update', p.id, node.game.grouptokens);
        });
      });
    }
  });

  stager.extendStep('number_addition_results', {
    cb: function() {
      var gs_round = this.getCurrentGameStage().round;
      if (gs_round === 1) {
        node.game.pl.each(function(p) {
          node.say('practice', p.id, 1);
        });
      }

      var gs = this.getCurrentGameStage();
      var pg_payround = node.game.payround.PG;
      if(pg_payround == gs.round) {
        node.game.payround_exact.push(["PG", gs]);
        console.log("This is a payround");
      }

      console.log('Number addition results.');
      //node.game.grouptokens = {"Klee": 0, "Kandinsky": 0};
      node.game.pl.each(function(p) {
        var res_group = node.game.kkgroup[p.id];
        //console.log("round_info: %o", messageData);
        var other_group = res_group == "Klee" ? "Kandinsky" : "Klee";
        var my_tokens;
        if (p.id in node.game.indtokens) {
          my_tokens = node.game.indtokens[p.id];
        } else {
          my_tokens = 0;
        }

        node.say('na_results', p.id,
          [node.game.grouptokens[res_group],
          node.game.grouptokens[other_group],
          res_group,
          other_group,
          my_tokens
         ]);
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
      node.game.dg_data = {};
      console.log(game_orders);
    }
  });

  stager.extendStep('dict_game', {
    cb: function() {
      var current = this.getCurrentGameStage();
      node.game.dg_data[current.round] = {sent: {}, received: {}};
      // //console.log(current.round);
      // var gs = this.getCurrentGameStage();
      // var dg_payround = node.game.payround.DG;
      // if(dg_payround == gs.round) {
      //   node.game.payround_exact.push(["DG", gs]);
      //   console.log("This is a payround");
      // }
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
      // receive the messages about the amount they send
      node.on.data("send", function(msg){
        // console.log("get_send_msg: %o", msg);
        node.game.dg_data[current.round].sent[msg.from] = msg.data.value;
        node.game.dg_data[current.round].received[msg.data.recipient] = msg.data.value;
      });
    }
  });

  stager.extendStep('dict_game_result', {
    cb: function() {
      console.log('Dictator Game Result.');
      var current = this.getCurrentGameStage();
      //console.log(current.round);
      var gs = this.getCurrentGameStage();
      console.log("sent: %o", node.game.dg_data[current.round].sent);
      console.log("received: %o", node.game.dg_data[current.round].received);
      node.game.pl.each(function(p) {
        var sent_val, received_val;
        sent_val = node.game.dg_data[current.round].sent[p.id] === undefined ?
          0 : node.game.dg_data[current.round].sent[p.id];
        received_val = node.game.dg_data[current.round].received[p.id] === undefined ?
          0 : node.game.dg_data[current.round].received[p.id];

        node.say('dg_result', p.id, {
          my_amount: 100 - sent_val + received_val ,
          sent_value: sent_val,
          received_value: received_val
        });
      });
      var dg_payround = node.game.payround.DG;
      if(dg_payround == gs.round) {
        node.game.payround_exact.push(["DG", gs]);
        console.log("This is a payround");
      }
    }
  });

  stager.extendStep('instructions_VotingGame', {
      cb: function() {
          console.log('Instructions Voting Game.');
          node.game.pl.each(function(p) {
            node.say('cost_info', p.id, {
              cost_vote: settings.cost_vote
            });
          });
      }
  });

  stager.extendStep('votingGame', {
    cb: function() {
      var gs = this.getCurrentGameStage();
      console.log('votingGame, Round ', gs.round);

      var high_lows = [[60, 140], [80, 120], [70, 130]];
      var c_high_low = shuffle(high_lows)[0];
      node.game.c_high_low = c_high_low;
      var tax_proposals;
      if(c_high_low[0] == 60) {
        tax_proposals = [40, 30, 20, 10];
      }
      if(c_high_low[0] == 80) {
        tax_proposals = [20, 10];
      }
      if(c_high_low[0] == 70) {
        tax_proposals = [30, 20, 10];
      }
      var c_tax = shuffle(tax_proposals)[0];
      node.game.c_tax = c_tax;
      //console.log(c_high_low);
      var hl = [0, 1];
      var g_assignment = {};
      g_assignment['Klee'] = [0, 0];
      g_assignment['Kandinsky'] = [0, 0];
      g_assignment['Total'] = [0, 0];
      var hls = {};
      var p;
      for(p in node.game.kkgroup){
        var my_group = node.game.kkgroup[p];
        hls[p] =  shuffle(hl)[0];
        g_assignment[my_group][hls[p]]++;
        g_assignment["Total"][hls[p]]++;
      }
      node.game.ind_high_low = {};
      for(p in node.game.kkgroup){
        //console.log("GA: %o", g_assignment);
        var my_group = node.game.kkgroup[p];
        var my_highlow = hls[p];
        node.game.ind_high_low[p] = my_highlow;
        node.say('game_info', p,
          { my_highlow: my_highlow,
            my_group: my_group,
            g_assignment: g_assignment,
            c_high_low: c_high_low,
            c_tax: c_tax,
            cost_vote: settings.cost_vote
          });
      }
      node.game.votes = {
        'yes': 0,
        'no' : 0,
        'abstain': 0
      }
      node.game.indvotes = {};
      node.on.data("vote", function(msg){
        node.game.votes[msg.data]++;
        node.game.indvotes[msg.from] = msg.data;
      });
    }
  });


  stager.extendStep('votingResult', {
    cb: function() {
      var gs = this.getCurrentGameStage();
      var vg_payround = node.game.payround.VG;
      if(vg_payround == gs.round) {
        node.game.payround_exact.push(["VG", gs]);
        console.log("This is a payround");
        console.log("PAY ROUNDS: %o", node.game.payround_exact);
      }

      console.log('votingResult');
      var rand = Math.random();
      var passed;
      if(node.game.votes['yes'] > node.game.votes['no'] ){
        passed = 1;
      } else if (node.game.votes['yes'] < node.game.votes['no'] ) {
        passed = 0;
      } else {
        passed = rand > 0.5 ? 1 : 0;
      }
      //console.log(node.game.ind_high_low);
      node.game.pl.each(function(p) {
        node.say('vote_results', p.id, {
          passed: passed,
          cost_vote: settings.cost_vote,
          votes: node.game.votes,
          myvote: node.game.indvotes[p.id],
          c_high_low: node.game.c_high_low,
          c_tax: node.game.c_tax,
          my_highlow: node.game.ind_high_low[p.id]
        });
      });
    }
  });

  // stager.extendStep('game', {
  //     cb: function() {
  //         console.log('Game round: ' + node.player.stage.round);
  //         doMatch();
  //     }
  // });

  stager.extendStep('end', {
      cb: function() {
          node.game.memory.save(channel.getGameDir() + 'data/data_' +
                                node.nodename + '.json');
          node.game.memory.save(node.game.DUMP_DIR + 'data_all_' +
                                node.nodename + '.json');
          cbs.endgame();
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

  function range(start, count) {
    return Array.apply(0, Array(count))
      .map(function (element, index) {
        return index + start;
    });
  }


};
