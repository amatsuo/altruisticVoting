module.exports = function(settings, headers) {

    var num_tokens = 100;//settings.standard.CANTIDAD,unidad=settings.standard.UNIDAD_ESTANDAR;
    var myGroup = "Klee";
    var high_amount = 120;
    var low_amount = 60;
    var your_amount = 120;
    var status = (high_amount == your_amount) ? "High income": "Low income";
    var otherGroup = (myGroup != "Klee") ? "Klee" : "Kandinsky";
    var incomeDist = {Klee:{High: 3, Low: 6}, Kandinsky:{High: 5, Low: 4}};
    var taxAmount = 20;
    
    return {
        title: "Module 3",
        Module: "Module 3",
        myGroup: myGroup,
        taxAmount: taxAmount,
        incomeDist: incomeDist,
        otherGroup: otherGroup,
        you: "In this round, you are a <span>" + status + "</span> earner",
        textRecipient: "",
        text2:" How many unit of tokens do you want to share?",
        num_tokens: num_tokens,
        high_amount: high_amount,
        low_amount: low_amount,
        text3:" tokens.",
        proceed: "Submit",
        error:"Enter a value between 0 and "+ num_tokens,
        errorClose: "Close",
    };
};

/**
 * amatz
 * 25-08-2016
 */
