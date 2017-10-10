const sendSlack = (channel, message) => {
  if (!channel) {
    console.log('no channel specified!');
    return;
  }
  if (!message) {
    console.log('no message specified!');
    return;
  }

  console.log(`posting ${message} to ${channel}`);

};

module.exports = { sendSlack };
