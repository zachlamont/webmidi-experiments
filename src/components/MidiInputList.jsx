import React, { useEffect, useState } from "react";
import { WebMidi } from "webmidi";

function MidiInputList({ children }) {
  const [midiInputs, setMidiInputs] = useState([]);

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
    setMidiInputs(inputs);
  }

  return (
    <div>
      <h2>Available MIDI Inputs:</h2>
      {children}
      <ul>
        {midiInputs.map((input, index) => (
          <li key={index}>{input.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MidiInputList;
