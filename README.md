# dota2-gsi-bounty-clock

A node application for receiving sound notifications on impending bounty runes in Dota 2

## Installation

- `git clone` repository
- `cd dota2-gsi-bounty-clock`
- `npm install`
- `mv` `gamestate_integration_bountyservice.cfg` into `\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration`
- `node server`
- navigate to `http://localhost:1337` using `Firefox`

## Browser support

This application is intended to be run only on `Firefox`. The new Google Web Audio API policy prohibits automatic audio playback.

read more:

https://github.com/goldfire/howler.js/issues/939

https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

`Microsoft Edge/IE `are not supporting SSE (server sent events) 

## Note

This application will consume ports `1337` and `3000`.
