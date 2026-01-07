import React from "react";
import { MdOutlineSaveAlt } from "react-icons/md";

const EditingNote = ({
  setUpdateId,
  isEditing,
  newNote,
  setNewNote,
  updateColor,
  setUpdateColor,
  updateId,
  handleUpdate,
  note,
}) => {
  console.log("update id is:", updateId);
  console.log("note id is:", note);

  return (
    <div>
      {isEditing && updateId === note?._id && (
        <>
          <form
            onSubmit={(e) => {
              handleUpdate(note?._id, e);
              setUpdateId(null);
            }}
            className="flex justify-center items-center gap-5 "
          >
            <input
              className="border border-gray-200 shadow-sm rounded-sm  px-5 py-2 w-[40%] outline-none"
              type="text"
              onChange={(e) => {
                setNewNote(e.target.value);
              }}
              value={newNote}
            />
            <button type="submit">
              <MdOutlineSaveAlt className="text-2xl" />
            </button>
            <input
              type="color"
              value={updateColor}
              onChange={(e) => {
                setUpdateColor(e.target.value);
              }}
            />
          </form>
        </>
      )}
    </div>
  );
};

export default EditingNote;
