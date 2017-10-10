# Dash Slacker

Will connect your dash button to a slack channel and post a message.

## Prerequisites
- [Amazon Dash Button](https://www.amazon.com/ddb/learn-more)
- Setup your Dash button using the Amazon mobile app
  - ***NOTE: do not select a product***
- libpcap-dev
  - Linux: `$ sudo apt-get install libpcap-dev`
  - OSX: `$ pip install pypcap`

## Setup

1. Install Dash Slacker

        $ npm install -g dash-slacker

2. Listen for ARP Pings on your network
        
        $ sudo npm findbutton

3. Press your dash button to emit an ARP ping and record its *MAC address*.
    -  You can do it a few times to be sure you have the right one.

## Usage

      $ dash-slacker -d <deviceId/MACaddress> -c <channelId> -m <message>

## Contributing

Pull requests are welcome!

## License

MIT
