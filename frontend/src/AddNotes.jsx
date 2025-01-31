import { useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
const AddNotes = () => {
  const [input, setInput] = useState("");
  const [openNote, setOpenNote] = useState(false);
   
  const addNotes = () => {
    setOpenNote(true);
  }
  return (
    <>
      <div className="flex flex-col gap-10 justify-center items-center">
        <div>
          <button
            onClick={addNotes}
            className="bg-red-800 px-4 py-2 text-white rounded-sm"
          >
            Add Notes
          </button>
        </div>
        <div>
          {openNote ? (
            <>
              <input
              value={input}
                onChange={(e) => setInput(e.target.value)}
                className=" bg-pink-300 w-80 h-80 rounded-sm relative"
              />
              <MdOutlineSaveAlt className="absolute bottom-5 " />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default AddNotes;
