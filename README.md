# dota2-gsi-bounty-clock

A node application for Dota 2 game state integration alerts.

## Installation

- Clone repository
- `cd dota2-gsi-bounty-clock`
- `npm install`
- copy `gamestate_integration_bountyservice.cfg` into `\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration`
- `node server`
- navigate to `http://localhost:1337` using `firefox`

## Browser support

This application is only intended to be run on `Firefox`. The new Google Web Audi API policy prohibits automatic audio playback.

read more:

https://github.com/goldfire/howler.js/issues/939

https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio

`Microsoft Edge/IE `are not supporting SSE (server sent events) 

