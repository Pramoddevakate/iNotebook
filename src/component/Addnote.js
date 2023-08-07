import React, { useContext, useState } from "react";
import notecontext from "../Contetxt/Notes/notecontext";

export default function Addnote(props) {
  const context = useContext(notecontext);
  const { addnote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const handleclick = (e) => {
    e.preventDefault();
    if (note.title !== "" && note.description !== "") {
      addnote(note.title, note.description, note.tag);
      setnote({ title: "", description: "", tag: "General" });
      props.showalert("Note added successfully", "success");
    } else {
      alert("Please fill all the fields");
    }
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Note title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="eg.Games"
            onChange={onchange}
            minLength={5}
            required
            value={note.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">TAG select</label>
          <select
            className="form-control"
            id="tag"
            name="tag"
            onChange={onchange}
            value={note.tag}
          >
            <option>General</option>
            <option>daily</option>
            <option>cooking</option>
            <option>sports</option>
            <option>games</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={onchange}
            minLength={5}
            required
            value={note.description}
          ></textarea>
        </div>
        <button 
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit my-4"
          onClick={handleclick}
          className="btn btn-primary my-3"
        >
          AddNote
        </button>
      </form>
    </div>
  );
}
