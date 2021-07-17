const Console = require("lib/Console");
// Remotes.irc.com nickname + TOKEN 
const $ = new (require("lib/IRC"))("nickname","YOUR_REMOTE_TOKEN_HERE");
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		// Your Twitch Username + OAUTH Token
		username: 'YOUR_USERNAME_HERE',
		password: 'oauth:YOUR_OAUTH_HERE'
	},
	// Your Twitch Channel
	channels: [ 'YourChannelHere' ]
});

client.connect();

const remoteWeb = "https://remotes.irc.com/login";

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === 'hello') {
		client.say(channel, `@${tags.username}, Hello, hows going?`);
	}
});

$.on('privmsg',(sender,target,msg) => { });

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === 'remote') {
		client.say(channel, `@${tags.username}, You can check our remote code in. ${remoteWeb}`);
	}
	});


client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'echo') {
		client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
	}
});

