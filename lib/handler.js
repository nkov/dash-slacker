const Slack = require('node-slack');

const sendSlack = (webhook, channel, text, username='DashSlackerBot') => {
  if (!webhook) {
    console.log('no webhook specified');
    return;
  }

  const slack = new Slack(webhook);

  if (!channel) {
    console.log('no channel specified!');
    return;
  }
  if (!text) {
    console.log('no text specified!');
    return;
  }

  console.log(`Posting ${text} to ${channel} as ${username}`);
  slack.send({
    text,
    channel,
    username,
  });
};

module.exports = { sendSlack };
