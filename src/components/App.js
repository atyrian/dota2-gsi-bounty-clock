import React, { Component } from "react";
import { Howl, Howler } from 'howler';

import Loader from '../components/Loader/Loader';
import classes from './App.module.css';
import { SOUND_FILES, ENDPOINTS } from '../constants/constants';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.sseSource = new EventSource(ENDPOINTS.SSE_ENDPOINT);

    this.state = {
      game_started: false
    };
  }

  componentDidMount() {
    this.playSound(SOUND_FILES.ON_LOAD);

    this.sseSource.onmessage = e => {
      const json = JSON.parse(e.data)
      this.playSound(SOUND_FILES[json.event]);
    }
  }

  playSound(file) {
    const sound = new Howl({
      src: [file]
    });
    sound.play();
  }

  render() {
    return (
      <div className={classes.Container}>
        {
          this.state.game_started ?
            null
            :
            <div>
              <Loader />
              <div className={classes.StatusContainer}>
                <p>Awaiting game state...</p>
              </div>
            </div>
        }
      </div>
    );
  }
}
