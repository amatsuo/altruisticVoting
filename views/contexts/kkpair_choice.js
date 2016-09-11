module.exports = function(settings, headers) {

    var round = 1;
    var c = [["KL", "KN"], ["KN", "KL"], ["KL", "KN"], ["KN", "KL"],["KN", "KL"]];
    return {
        title: "Art Selection",
        text: "Please choose which painting you prefer by clicking on either A or B from each pair of paintings. After everyone submits answers, you will be informed of which group you are in.",
        roundTitle: "Painting Choice ",
        proceed: "Submit",
        //round: round,
        choice: c
    };
};
