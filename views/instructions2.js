module.exports = function(settings, headers) {

    var C = 100;//settings.pp.COINS;
    var R = 3; //settings.pp.REPEAT;
    var E = 100; //settings.pp.EXCHANGE_RATE_INSTRUCTIONS;

    return {
        title: "INSTRUCTIONS",
        instructions: "General Instructions",
        please: "Please read them carefully",
        thisExperiment: "This is an experiment in group decision-making. During the experiment, you will make decisions and the other participants will do so as well. Your decisions and those of the others will determine the payment that you will receive according to rules that we will explain later on.",
        thisExperiment2: 'There will be 18 participants in the experiment.',
        thisExperiment3: 'This experiment consists of 4 modules.',
        
        theGroups: "The experiment examines decision-making in groups. There will be two groups. The groups are identical in size and include nine participants each. The group in which you are placed will be determined by decisions by you and other participants in Module 1. Once groups are formed,  members of these groups are remained the same.",
        theRate: E + " tokens = $1.00",
        ifYouUnderstood: "If you understood the instructions correctly press the DONE Button to proceed to the game."
    };
};
