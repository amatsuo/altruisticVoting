module.exports = function(settings, headers) {

    var Group = "Klee";//settings.pp.COINS;

    var groupSize = 9;
    
    return {
        title: "Result: Module 1",
        instructions: "Result",
        text : "Based on your choices, you prefer the paintings by " + Group + ".",
        text2: "You are assigned to <b>" + Group + "</b> group.",
        text3: "The number of people in your " + Group + " group is " + groupSize + ".",
        ifYouUnderstood: "Please press the DONE Button to proceed to the next page."
    };
};
