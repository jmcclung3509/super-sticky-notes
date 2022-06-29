import React from "react";

export default function Header(props) {
  const search = (e) => {
    props.onSearch(e.target.value);
  };
  console.log(props.searchText);
  return (
    <header>
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside>
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          className="search add-new"
          type="text"
          placeholder="Type here to search..."
          value={props.searchText}
          onChange={search}
        />
      </aside>
    </header>
  );
}
