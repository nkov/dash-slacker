const DashButton = require('node-dash-button');
const { argv } = require('yargs');
const { sendSlack } = require('./handler');
const DASH_TIMEOUT = 60 * 1000;
const { configFile } = argv;
if (!configFile) {
  console.log('Error: no configFile specified!');
  process.exit(0);
}
const config = require(configFile || './config.json');
const { buttons } = config;

// waitlocks
let detectLocked = [];
const setDetectLocked = (key) => {
  detectLocked[key] = true;
  setTimeout(() => {
    detectLocked[key] = false;
    console.log('listening..');
  }, DASH_TIMEOUT);
};

if (!buttons || !buttons.length) {
  console.log('Error: no buttons specified in config.json!');
  process.exit(0);
}

let dashButton
buttons.forEach(button => {
  const { slack } = button;
  if (!slack || !slack.webhook) {
    console.log('Error: button missing webhook');
    process.exit(0);
  }
  dashButton = DashButton(button.key, null, null, 'arp');
  dashButton.on('detected', () => {
    if (detectLocked[button.key]) { console.log('skipped..'); return false; }

    console.log(`Starting service: "${button.name}"`);
    sendSlack(slack.webhook, slack.channel, slack.message, slack.username);
    setDetectLocked(button.key)
  });
});

console.log('listening..');
