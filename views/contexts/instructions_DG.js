module.exports = function(settings, headers) {

    var num_tokens = 100;//settings.pp.COINS;
    var R = 3; //settings.pp.REPEAT;
    var E = 1000; //settings.pp.EXCHANGE_RATE_INSTRUCTIONS;

    return {
        title: "INSTRUCTIONS: Module 2",
        instructions: "Instructions of Module 2",
        please: "Please read them carefully",
        a: 'In this module you will receive ' + num_tokens + ' tokens. ',
        b: "You will be randomly paired with another participant, and then you are asked to choose how to divide " + num_tokens + " tokens between yourself and the anonymous individual. You may keep all, none, or some of the tokens -- the decision is up to you and will be completely anonymous. If you choose to share some tokens, the amount of tokens you shared will be deducted from your reward.",
        c:"There will be three rounds of this game. You may be provided with some information about the recipient. One of the three rounds will be randomly selected for payment.",
        d:"Profits in this module will be calculated in the following way:",
        profit: "Profits = " + num_tokens + " tokens - (Amount You Sent) + (Amount You Received)",
        ifYouUnderstood: "If you understand the instructions, click \"DONE\" ",
    };
};
