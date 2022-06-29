import React, { Component } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import Noteslist from "./components/Noteslist";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    //create new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };
  // this.setState({notes:[newNote, ...this.state.notes]})

  //add new note to existing notes array in state

  onType = (editId, updatedKey, updatedValue) => {
    //editId = id of note that is editied
    //updatedKey = updated title/description
    //updatedValue == value of title or description
    //map over existing notes in state, return each note as is except for one that has been edited. Then find key, add in value of field

    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();

        const titleMatch = title.includes(newSearchText);
        const descMatch = description.includes(newSearchText);
        const hasMatch = titleMatch || descMatch;
        note.doesMatchSearch = hasMatch;
        return note;
        //   if(titleMatch){
        //     note.doesMatchSearch = true
        //   } else if(descMatch){
        //     note.doesMatchSearch = true
        //   }else {
        //     note.doesMatchSearch = false
        //   }
        //   return note
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };
  removeNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((item) => item.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    const stringNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringNotes);
  }
  componentDidMount() {
    const stringifyNotes = localStorage.getItem("savedNotes");
    if (stringifyNotes) {
      const savedNotes = JSON.parse(stringifyNotes);
      this.setState({ notes: savedNotes });
    }
  }
  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <Noteslist
          notes={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}
export default App;
