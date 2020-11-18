'use strict';
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from 'react-viro';


//status inhale, hold, exhale,
export default class Energized extends Component {
  constructor() {
    super();
    this.state = {
      text : "Starting Energized",
      time: {},
      seconds: 5,
      breathCount: '0',
      breaths: 0,
      status: 'inhale',
      secondsString: ''
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.onInitialized = this.onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroText text={this.state.status} scale={[.5, .5, .5]} position={[0, .6, -1]} style={styles.helloWorldTextStyle} />
        <ViroText text={this.state.secondsString} scale={[.5, .5, .5]} position={[0, .7, -2]} style={styles.helloWorldTextStyle} />
        <ViroText text={`breaths: ` + this.state.breathCount} scale={[.5, .5, .5]} position={[0, 1.2, -3]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  startTimer() {
  if (this.timer == 0 && this.state.seconds > 0) {
    this.timer = setInterval(this.countDown, 1000);
  }
}
countDown() {
  let seconds = this.state.seconds - 1;
  this.setState({
    seconds: seconds,
    secondsString: `${seconds}`
  });

  if (seconds == 0) {
    let breaths = this.state.breaths + 1;
    this.setState({
      seconds: 5,
      secondsString: `${seconds}`,
      breaths,
      breathCount: `${breaths}`
    })

    clearInterval(this.timer);
    this.timer = setInterval(this.countDown, 1000);
  }
}

  onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.startTimer();
      this.setState({
        text: "Inhale through nose for 4 seconds, then exhale powerfully immediately, for 10 breaths"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = Energized;
