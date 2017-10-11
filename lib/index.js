const DashButton = require('node-dash-button');
const { argv } = require('yargs');
const { sendSlack } = require('./handler');
const { configFile, t, m } = argv;
const DASH_TIMEOUT = (t || 60) * 1000;
const listenMode = m || 'arp';

// load config
let config;
try {
  config = require(configFile || '../config.json');
} catch (e) {
  console.log('Error: no config found!');
  process.exit(0);
}

const sendButtonListening = (name) => console.log(`${name} is listening.. (mode: ${listenMode}, timeout: ${DASH_TIMEOUT / 1000})`);

// waitlocks
const detectLocked = [];
const setDetectLocked = (key, name) => {
  detectLocked[key] = true;
  setTimeout(() => {
    detectLocked[key] = false;
    sendButtonListening(name);
  }, DASH_TIMEOUT);
};

const { buttons } = config;

if (!buttons || !buttons.length) {
  console.log('Error: no buttons specified in config!');
  process.exit(0);
}

buttons.forEach(button => {
  const { slack, key, name } = button;
  if (!slack || !slack.webhook) {
    console.log('Error: button missing webhook');
    process.exit(0);
  }
  const { webhook, channel, message, username } = slack;
  DashButton(key, null, null, listenMode).on('detected', () => {
    if (detectLocked[key]) {
      console.log('Skipped..');
      return false;
    }

    console.log(`Running service: ${name}`);
    sendSlack(webhook, channel, message, username);
    setDetectLocked(key, name);
  });
  sendButtonListening(name);
});
