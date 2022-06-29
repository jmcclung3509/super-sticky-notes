import React from "react";
import Note from "./Note.js";

export default function Noteslist(props) {
  const keepMatches = (note) => note.doesMatchSearch;
  const searchMatches = props.notes.filter(keepMatches);
  const indivNotes = searchMatches.map((item) => {
    return (
      <Note
        id={item.id}
        key={item.id}
        title={item.title}
        description={item.description}
        doesMatchSearch={item.true}
        onType={props.onType}
        removeNote={props.removeNote}
      />
    );
  });
  return <ul className="notes-list">{indivNotes}</ul>;
}
