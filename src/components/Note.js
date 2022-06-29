import React from "react";

export default function Note(props) {
  console.log(props);
  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editId = props.id;
    props.onType(editId, "title", updatedValue);
  };
  const updateBody = (e) => {
    const updatedValue = e.target.value;
    const editId = props.id;
    props.onType(editId, "description", updatedValue);
  };
  const noteDelete = () => {
    props.removeNote(props.id);
  };
  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.title}
        onChange={updateTitle}
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.description}
        onChange={updateBody}
      />
      <span className="note__delete" onClick={noteDelete}>
        X
      </span>
    </li>
  );
}
