import React, { useContext, useEffect, useRef, useState } from "react";
import notecontext from "../Contetxt/Notes/notecontext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(notecontext);
  const { notes, getnotes ,editnote} = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes();
    }else{
      navigate('/login'); 
    }
    
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);

  const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag: "" });
  
  const updatenote = (currentNote) => {
    ref.current.click();
    setnote({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleclick = () => {
    editnote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click();
    props.showalert("Note updated successfully", "success");
   
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {" "}
              <div className="container my-3">
                <h1>Edit a Note</h1>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Note title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      placeholder="eg.Games"
                      value={note.etitle}
                      onChange={onchange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tag">TAG select</label>
                    <select
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onchange}
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
                      id="edescription"
                      name="edescription"
                      rows="3"
                      value={note.edescription}
                      onChange={onchange}
                      minLength={5}
                      required
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
              ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5||note.edescription.length<5} type="button"  onClick={handleclick}className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <Addnote showalert={props.showalert}/>
      <h1 className="my-4">Your Notes</h1>
      <div className="row my-3">
      <div className='container'>
        {notes.length===0 &&  ' No need to display ' }
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updatenote={updatenote} note={note} showalert={props.showalert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
