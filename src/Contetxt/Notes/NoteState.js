import notecontext from "./notecontext";
import React, { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  //get all notes
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fechallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setnotes(json);
  };

  //add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const note = await response.json(); //todo api call
    setnotes(notes.concat(note));
    
  };

  //delete a note
  const deletenote = async (id) => {
    //api call to delete a note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    //logic for deleting a note
     await response.json();

    const newNotes = notes.filter((note) => note._id !== id);
    setnotes(newNotes);
   
  };

  //edit a note
  const editnote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    await response.json();
    

    let newNotes = await JSON.parse(JSON.stringify(notes));
    //logic to edit note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
   
  };

  const [notes, setnotes] = useState(notesInitial);

  return (
    <notecontext.Provider
      value={{ notes, setnotes, addnote, deletenote, editnote, getnotes }}
    >
      {props.children}
    </notecontext.Provider>
  );
};

export default NoteState;
