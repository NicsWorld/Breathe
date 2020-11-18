'use strict';
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
} from 'react-viro';


//status inhale, hold, exhale,
export default class CalmAndRelax extends Component {
  constructor() {
    super();
    this.state = {
      inhaleText : "Starting Calm and Relaxations",
      text : "Starting Calm and Relaxations",
      time: {},
      seconds: 5,
      breathCount: '0',
      breaths: 0,
      status: 'inhale',
      secondsString: ''
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    // this.countDown = this.countDown.bind(this);
    this.onInitialized = this.onInitialized.bind(this);
    // this.countUp = this.countUp.bind(this);
    this.inhale = this.inhale.bind(this);
    this.hold = this.hold.bind(this);
    this.exhale = this.exhale.bind(this);
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
    this.timer = setInterval(this.inhale, 1000);
  }
}
// countUp() {
//   let seconds = this.state.seconds + 1;
//   let breaths = this.state.breaths + 1;
//   this.setState({
//     seconds: seconds,
//     secondsString: `${seconds}`
//   });
//
//   if (seconds == 4) {
//     this.countDown();
//     this.setState({
//       seconds: 5,
//       status: 'hold'
//     });
//     clearInterval(this.timer);
//     this.timer = setInterval(this.countDown, 1000);
//   }
// }
//
// countDown() {
//   if(this.state.status === 'hold') {
//     this.setState({
//       status: 'exhale'
//     });
//   }
//   let seconds = this.state.seconds - 1;
//   let breaths = this.state.breaths + 1;
//   this.setState({
//     seconds: seconds,
//     secondsString: `${seconds}`
//   });
//
//   if (seconds == 0) {
//     let breaths = this.state.breaths + 1;
//     if(this.state.status === 'exhale') {
//       this.setState({
//         breaths: breaths,
//         breathCount: `${breaths}`
//       })
//     }
//     this.setState({
//       status: this.state.status === 'exhale' ? 'inhale' : 'hold'
//     });
//     clearInterval(this.timer);
//     this.timer = setInterval(this.countUp, 1000);
//   }
// }

inhale() {
  let seconds = this.state.seconds - 1;

  this.setState({
    seconds: seconds,
    secondsString: `${seconds}`,
    status: 'inhale'
  });

  if (seconds == 0) {
      this.setState({
        seconds: 5
      });
    clearInterval(this.timer);
    this.timer = setInterval(this.hold, 1000);
  }
}

hold() {
  let seconds = this.state.seconds - 1;

  this.setState({
    seconds: seconds,
    secondsString: `${seconds}`,
    status: 'hold'
  });

  if (seconds == 0) {
    this.setState({
      seconds: 5
    });
    clearInterval(this.timer);
    this.timer = setInterval(this.exhale, 1000);
  }
}

exhale() {
  let seconds = this.state.seconds - 1;
  let breaths = this.state.breaths + 1;

  this.setState({
    seconds: seconds,
    secondsString: `${seconds}`,
    status: 'exhale'
  });

  if (seconds == 0) {
    let breaths = this.state.breaths + 1;
      this.setState({
        seconds: 5,
        breaths: breaths,
        breathCount: `${breaths}`
      });
    clearInterval(this.timer);
    this.timer = setInterval(this.inhale, 1000);
  }
}

  onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.startTimer();
      this.setState({
        text: "Inhale 4 count, hold 4 count, exhale 4 count. 10 breaths"
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

module.exports = CalmAndRelax;
