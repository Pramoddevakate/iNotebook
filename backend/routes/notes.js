const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1:getting all notes of user by using GET : api/notes/fetchuser ,login required
router.get("/fechallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).send("internal server error");
  }
});

//Route 2:add notes by using post : api/notes/addnote ,login required
router.post(
  "/addnote",fetchuser,
  [
    body("title", "Enter a valid title of 3 character").isLength({ min: 3 }),
    body("description", "enter valid description of 5 character").isLength({
      min: 5,
    }),
  ],
 

  async (req, res) => {

    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      note =  new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
     const savenote= await note.save();

      res.json(savenote);
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server error");
    }
  }
);

//Route 3:update notes by using put : api/notes/updatenote/:id ,login required
router.put(
  "/updatenote/:id",fetchuser,
  async (req, res) => {

    const {title,description,tag}=req.body;
    try {
      newnote ={};

      if (title) {
        newnote.title=title
      }
      if (description) {
        newnote.description=description
      }
      if (tag) {
        newnote.tag=tag
      }

      //find note to be updated

     let note=await Notes.findById(req.params.id);

     if(!note){
        return res.status(404).send("Notes not found")
     }

     //allowing user to update if user has its note. 

     if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
     }

     note= await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
     res.json(note);

    } catch (err) {
      console.log(err);
      res.status(500).send("internal server error");
    }
  }
);


//Route 4:delete notes by using delete : api/notes/deletenote/:id ,login required
router.delete(
  "/deletenote/:id",fetchuser,
  async (req, res) => 
  {

    
    try
     {
     

      
      //find note to be deleted

     let note=await Notes.findById(req.params.id);

     if(!note){
        return res.status(404).send("Notes not found")
     }
//allowing user to delete if user has its note. 
     if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
     }

     note= await Notes.findByIdAndDelete(req.params.id);
     res.json({"Sucess":"the notes has been successfully deleted",Note:note});
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server error");
    }
  }
);

module.exports = router;
