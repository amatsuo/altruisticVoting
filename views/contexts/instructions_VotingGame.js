module.exports = function(settings, headers) {

    var C = 100;//settings.pp.COINS;
    var R = 3; //settings.pp.REPEAT;
    var E = 1000; //settings.pp.EXCHANGE_RATE_INSTRUCTIONS;

    return {
        title: "INSTRUCTIONS: Module 4",
        instructions: "Instructions of Module 4",
        please: "Please read them carefully",
        thisGame: "In each round of this module, you will receive an initial income and be asked to vote. Your initial income and voting outcomes will determine your earnings of each round.",
        thisGame2: "<b>Initial income</b>: At the beginning of each round, the computer will randomly generate the income of each participant in this round. There are two different amounts of incomes for participants: A \"High\" income and a \"Low\" income.",
        thisGame3: "An income in a certain round may range from 60 to 140 tokens. The computer will inform each participant about his or her income in this round. Each participant will also receive information about the following",
        information: "<li>The numbers of tokens for High and Low incomes</li><li>The numbers of High and Low income earners in your group</li><li>The numbers of High and Low income earners in the other group</li>",
        decisions: "<b>Tax</b>: In each round, you will be presented with a proposal for a tax. If the tax proposal is approved, each High-income earner will pay a fixed amount of tokens and each Low-income earner will receive the amount of tokens same as the tax. For example, if the tax is 20 tokens, High-income earners will pay 20 tokens and Low-income earners will receive 20 tokens.",
        election: "<b>Voting</b>: Whether to introduce a tax is determined by voting. Each player votes either \"Yes\" or \"No\" to the proposed tax. The choice that receives a majority of votes is the winner. In the event of a tie, the computer will determine the winning choice at random (by a draw).",
        cost_vote: "It costs <span id='cost_vote'> </span> tokens to vote. You are free to abstain. If you abstain, you do not have to pay the cost.<br><br> Here are some examples.",
        example1: "<b>Example 1</b>",
        ex1_text1: "You are a high income earner with 120 tokens of initial income. The proposed tax amount is 20 tokens. You voted for the tax by paying 5 tokens.",
        ex1_outcome1: "<em>if tax propsal is rejected...</em><br>Your total income is gross income minus the voting cost: <div style='text-align: center'>120 - 5 = 115 tokens</div>",
        ex1_outcome2: "<em>if tax propsal is approved...</em><br>Your total income is gross income minus the voting cost and the tax: <div style='text-align: center'>120 - 5 - 20 = 95 tokens,</div> and low income earners will receive the extra 20 tokens.",
        example2: "<b>Example 2</b>",
        ex2_text1: "You are a low income earner with 70 tokens of initial income. The proposed tax amount is 30 tokens. You did not vote.",
        ex2_outcome1: "<em>if tax propsal is rejected...</em><br>Your total income is gross income: <div style='text-align: center'>70 tokens</div>",
        ex2_outcome2: "<em>if tax propsal is approved...</em><br>Your total income is gross income plus the redistributed tax: <div style='text-align: center'>70 + 30 = 100 tokens</div>",
        endOfRound: "The first round ends when all participants, in both groups, finish voting and the chosen tax rate might be applied to their income. Round 2 will take place on the basis of the same rules as Round 1, and so on until the last round.<br><br><em>You will be given details about the results of the voting in each round.</em> <br><br>Module 4 will include 20 rounds, and one round is randomly selected for payment.",
        ifYouUnderstood: "If you understood the instructions, press the DONE Button to proceed to the next page."
    };
};
