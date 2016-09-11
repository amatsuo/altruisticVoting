module.exports = function(settings, headers) {

    var num_tokens = 100;//settings.standard.CANTIDAD,unidad=settings.standard.UNIDAD_ESTANDAR;
    var myGroup = "Klee";
    
    
    var textAnonymous = 'You know nothing about this anonymous individual.';
    var otherGrop = myGroup=="Klee"? "Kandinsky" : "Klee";
    var textMyGroup = 'The only thing you know about this individual is that he or she is a member of <strong>' + 
        myGroup + " group</strong>.";
    var textOtherGroup = 'The only thing you know about this individual is that he or she is a member of <strong>' + 
        myGroup + " group</strong>.";
    
    return {
        title: "Module 2",
        Module: "Module 2",
        text1:"You have the endowment of <strong>" + num_tokens + " </strong>tokens to share with another participant.",
        textRecipient: "<em>" + textOtherGroup + "</em>",
        text2:" How many unit of tokens do you want to share?",
        num_tokens: num_tokens,
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
