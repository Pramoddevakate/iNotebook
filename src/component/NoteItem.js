import React from "react";
import { useContext } from "react";
import notecontext from "../Contetxt/Notes/notecontext";

function NoteItem(props) {
  const { note, updatenote } = props;
  const context = useContext(notecontext);
  const { deletenote } = context;

  return (
    <div className="col-md-3">
      <div
        className="card text-white bg-success mb-3"
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header"> {note.tag}</div>
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text"> {note.description}</p>

          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => updatenote(note)}
          ></i>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() =>{ deletenote(note._id); props.showalert("Note deleted successfully", "success");}}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
