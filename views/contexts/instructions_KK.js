module.exports = function(settings, headers) {

    var C = 100;//settings.pp.COINS;
    var R = 3; //settings.pp.REPEAT;
    var E = 1000; //settings.pp.EXCHANGE_RATE_INSTRUCTIONS;

    return {
        title: "INSTRUCTIONS: Module 1",
        instructions: "Instructions of Module 1",
        please: "Please read them carefully",
        thisGame: "In this module, everyone will be shown 5 pairs of paintings by two artists, Klee and Kandinsky. You will be asked to choose which painting in each pair you prefer. You will then be classified into one of <b>two groups</b>, based on which artist you and other particpants prefer.",
        thisGame2: "Each correct answer will bring you additional tokens. The participants you are grouped with will be the same for the rest of the experiment.",
        ifYouUnderstood: "If you understood the instructions correctly press the DONE Button to proceed to the next page."
    };
};
