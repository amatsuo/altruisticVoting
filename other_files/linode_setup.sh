curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
apt-get install git
mkdir ngames
cd ngames
curl -O https://raw.githubusercontent.com/nodeGame/nodegame/master/bin/install.latest.sh
chmod +x install.latest.sh
./install.latest.sh

cd nodegame
node launcher.js

# install crypto-js (first install globally and then copy to the local folder)
npm install -g crypto-js
cp -r node_modules/crypto-js/ /root/ngames/nodegame/node_modules/

cd games
git clone https://github.com/amatsuo/altruisticVoting
cd ..
node launcher.js
