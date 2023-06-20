import React, { useEffect, useState } from "react";
import { WebMidi } from "webmidi";

function MidiComponent({ children }) {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    WebMidi.enable()
      .then(onEnabled)
      .catch((err) => console.warn("Access to MIDI is not possible.", err));
  }, []);

  function onEnabled() {
    const inputs = WebMidi.inputs;
    console.log(
      "Available MIDI inputs:",
      inputs.map((input) => input.name)
    );

    inputs.forEach((input) => {
      input.addListener("noteon", onNoteOn);
    });
  }

  function onNoteOn(e) {
    const noteColors = {
      C: "red",
      "C#": "orange",
      D: "yellow",
      "D#": "green",
      E: "blue",
      F: "indigo",
      "F#": "violet",
      G: "purple",
      "G#": "pink",
      A: "cyan",
      "A#": "magenta",
      B: "brown",
    };

    const noteIdentifier = e.note.name;
    const color = noteColors[noteIdentifier];
    if (color) {
      setBackgroundColor(color);
    }
  }

  return (
    <div className="midi-component" style={{ backgroundColor }}>
      {children}
    </div>
  );
}

export default MidiComponent;
