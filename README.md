# Altruistic Voting

A program for online experiments using [NodeGame](https://github.com/nodeGame/nodegame/).

## Installation
### Install NodeGame
The first step is to install NodeGame in the system. A detailed instruction is available at [NodeGame wiki](https://github.com/nodeGame/nodegame/wiki/Getting-Started-v3).

### Install altruisticVoting

By cloning this repository in the `games` folder of your `nodegame` installed directory, you can launch this game. Suppose that you are in the root directory of `nodegame`:
```
cd games
git clone https://github.com/amatsuo/altruisticVoting
```

### Install additional npm packages

In order to connect the game securely with Qualtrics, this game hand encrypted codes which will be recovered through Qualtrics web-service. The code encryption is done through an node.js package called `crypt-js`. The set up of `crypt-js` and other files when I run this game on a [Linode](https://www.linode.com/) virtual private server is available as a bash script in this repostitory ([here](https://github.com/amatsuo/altruisticVoting/blob/master/other_files/linode_setup.sh)].

### Contact
If you have any questions, please contact me at mailto:a.matsuo@lse.ac.uk.


