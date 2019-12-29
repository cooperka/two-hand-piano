import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import Tone from 'tone';

function getStartedNotes() {
  return []; // TODO
}

function getStoppedNotes() {
  return []; // TODO
}

class ToneAudio extends Component {
  constructor(props) {
    super(props);
    this.synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
  }

  componentDidMount() {
    const { notes } = this.props;
    this.startPlayingNotes(notes);
  }

  componentDidUpdate(prevProps) {
    const { notes } = this.props;
    const { notes: prevNotes } = prevProps;

    if (!isEqual(notes, prevNotes)) {
      const startedNotes = getStartedNotes(notes, prevNotes);
      this.startPlayingNotes(startedNotes);

      const stoppedNotes = getStoppedNotes(notes, prevNotes);
      this.stopPlayingNotes(stoppedNotes);
    }
  }

  startPlayingNotes(startedNotes) {
    this.synth.triggerAttack(startedNotes);
  }

  stopPlayingNotes(stoppedNotes) {
    this.synth.triggerRelease(stoppedNotes);
  }

  render() {
    return null;
  }
}

export default ToneAudio;
