module.exports = function(settings, headers) {

    var C = 100;//settings.pp.COINS;
    var R = 3; //settings.pp.REPEAT;
    var E = 1000; //settings.pp.EXCHANGE_RATE_INSTRUCTIONS;

    return {
        title: "INSTRUCTIONS: Module 3",
        instructions: "Instructions of Module 3",
        please: "Please read them carefully",
        thisGame: "In this module, you will be asked to make several decisions. The decisions that you make will determine the payments that you, the members of your group, and the members of the second group will receive at the end of the experiment.",
        thisGame2: "<b>Incomes</b>: The experiment will include 30 rounds. At the beginning of each round, the computer will determine randomly generate the \"gross\" income of each participant in this round. There are two different amount incomes for participants: A \"High\" income and a \"Low\" income.",
        thisGame3: "An income in a certain round may range from 30 to 150 tokens. The computer will inform each participant about his or her gross income in this round. Each participant will also receive information about the following",
        information: "<li>The numbers of tokens for High and Low incomes</li><li>The numbers of High and Low income earners in your group</li><li>The numbers of High and Low income earners in the other group</li>",
        decisions: "<b>Decisions</b>: After receiving the information about incomes in this round, you will be asked to make a decision. <br><br> The decision is whether to introduce a tax. If it is introduced, only High-income earners will pay and Low-income earners will receive the same amount of tax.",
        election: "<b>Election</b>: The tax rate is determined by elections; the choice that receives a majority of votes is the winner in the elections. In the event of a tie, the computer will determine the winning choice at random (by a draw).<br><br><em><b>It costs 5 tokens to vote, and you are free to abstain.</b></em>.<br><br> Here are some examples.",
        example1: "<b>Example 1</b>",
        ex1_text1: "You are a high income earner. The proposed tax amount is 20 tokens. You vote for the tax by paying 5 tokens.",
        ex1_outcome1: "<em>if tax propsal is rejected...</em><br>Your total income is gross income minus the voting cost: <div style='text-align: center'>120 - 5 = 115 tokens</div>",
        ex1_outcome2: "<em>if tax propsal is approved...</em><br>Your total income is gross income minus the voting cost and the tax: <div style='text-align: center'>120 - 5 - 20 = 95 tokens,</div> and low income earners will receive the extra 20 tokens.",
        example2: "<b>Example 2</b>",
        ex2_text1: "You are a low income earner. The proposed tax amount is 30 tokens. You did not vote.",
        ex2_outcome1: "<em>if tax propsal is rejected...</em><br>Your total income is gross income: <div style='text-align: center'>70 tokens</div>",
        ex2_outcome2: "<em>if tax propsal is approved...</em><br>Your total income is gross income plus the redistributed tax: <div style='text-align: center'>70 + 30 = 100 tokens</div>",
        endOfRound: "The first round ends when all participants, in both groups, finish voting and the  the chosen tax rate might be applied to their income. Round 2 will take place on the basis of the same rules as Round 1, and so on until the last round.<br><br><em>You will be given details about the results of the voting in each round only at the end of the experiment.</em>",
        ifYouUnderstood: "If you understood the instructions correctly press the DONE Button to proceed to the next page."
    };
};
