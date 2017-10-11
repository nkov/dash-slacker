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

### Locally

1. Clone repo and install dependencies

        $ npm install

2. Listen for ARP Pings on your network
        
        $ sudo npm findbutton

3. Press your dash button to emit an ARP ping and record its *MAC address*.
    -  You can do it a few times to be sure you have the right one.

### Globally

1. Install Dash Slacker

        $ npm install -g dash-slacker

2. Listen for ARP Pings on your network
        
        $ sudo dash-slacker-findbutton

3. Press your dash button to emit an ARP ping and record its *MAC address*.
    -  You can do it a few times to be sure you have the right one.

## Usage

Take the `config.json.sample` and save it as `config.json` for use in the following command.

### Locally

      $ sudo node dash-slacker.js --configFile=/path/to/config.json
      // Note: config.json in the project directory is used by default

### Globally

      $ sudo dash-slacker --configFile=/path/to/config.json

## Contributing

Pull requests are welcome!

## License

MIT.

Copyright &copy; 2017 nkov.

Made with :heart: in NYC.
