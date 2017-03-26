module.exports = function(settings, headers) {

    var num_tokens = settings.standard.DG_TOKENS;//settings.standard.CANTIDAD,unidad=settings.standard.UNIDAD_ESTANDAR;

    return {
        title: "INSTRUCTIONS: Module 3",
        instructions: "Instructions of Module 3",
        please: "Please read them carefully",
        a: 'In this module, which consists of 3 rounds, you will be given ' + num_tokens + ' tokens in the beginning of each round. ',
        b: "You will be randomly paired with another participant in each round, and then you are asked to choose how to divide " + num_tokens + " tokens between yourself and the anonymous individual. You may keep all, none, or some of the tokens -- the decision is up to you and will be completely anonymous. If you choose to share some tokens, the amount of tokens you shared will be deducted from your reward. You will not know the identity of the player you are paired with, but some information about the other player's profile might be provided.",
        c: "The player you are paird with is also given the same set of options. The player may keep all, none, or some of the tokens.",
        repeat:"There will be three rounds of this game. You may be provided with some information about the recipient. One of the three rounds will be randomly selected for payment. You will be notify about the results at the end of experiment.",
        earnings:"Profits in this module will be calculated in the following way:",
        profit: "Profits = " + num_tokens + " tokens - (Amount You Sent) + (Amount You Received)",

        ifYouUnderstood: "This will be repeated three times and one round is selected for payment. <br> If you understand the instructions, click \"DONE\" ",
    };
};
