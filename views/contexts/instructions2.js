module.exports = function(settings, headers) {

    var E = settings.standard.EXCHANGE_RATE; //settings.pp.EXCHANGE_RATE_INSTRUCTIONS;

    return {
        title: "INSTRUCTIONS: Module 3",
        instructions: "General Instructions",
        please: "Please read them carefully",
        thisExperiment: "In this experiment, you will be asked to make a series of decisions. The payment that you receive from this experiment depend on decisions that you and other participants make.",
        thisExperiment2: 'There are 12 participants in the experiment.',
        thisExperiment3: 'This experiment consists of 4 modules.',
        theGroups: "The experiment examines decision-making in groups. There will be two groups. The groups are identical in size and include 6 participants each. The group in which you are placed will be determined by decisions by you and other participants in Module 1. Once groups are formed, members of these groups are remained the same.",
        thePayment: "<b>Payment</b>: In this experiment, you will earn the Mechanical Turk Reward payment when you finish the experiment. In addition, you will make your additional earnings in <em>experimental tokens</em>, which will be converted to actual money. The additional payment will be made as a bonus payment of Amazon Mechanical Turk. the conversion rate of tokens and money is:",
        theRate: E + " tokens = $1.00",
        ifYouUnderstood: "If you understood the instructions correctly press the DONE Button to proceed to the next page."
    };
};
