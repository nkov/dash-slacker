#!/usr/bin/env node
const { argv } = require('yargs');
const DashButton = require('node-dash-button');
const { sendSlack } = require('./handler');
const { d, c, m } = argv;

const DASH_TIMEOUT = 60 * 1000;
let detectLocked = false;
const setDetectLocked = () => {
  detectLocked = true;
  setTimeout(() => {
    detectLocked = false;
    console.log('listening..');
  }, DASH_TIMEOUT);
};

if (!d) {
  console.log('Error! No device given!');
  process.exit(0);
}

const dashButton = DashButton(d, null, null, 'arp');
dashButton.on('detected', () => {
  if (detectLocked) { console.log('skipped..'); return false; }

  sendSlack(c, m);
  setDetectLocked()
});

console.log('listening..');
