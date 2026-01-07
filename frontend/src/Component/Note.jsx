import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../authStore/useAuthStore";
import { toast } from "react-toastify";
import { data } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoColorPalette } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import EditingNote from "./EditingNote";

const Note = () => {
  const [notes, setNotes] = useState(null);
  const [input, setInput] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [updateColor, setUpdateColor] = useState("#FFFFFF");
  const [showConform, setShowConform] = useState(false);
  const [deleteId, setDeletId] = useState(null);

  const { accessToken } = useAuthStore();

  async function fetchNote() {
    const response = await axios.get("http://localhost:5001/api/note", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = response?.data;
    setNotes(data);
    setInput("");
  }
  useEffect(() => {
    fetchNote();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/note/create",
        {
          note: input,
          color: color,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setInput("");
      toast.success(response?.data?.message);
    } catch (error) {
      toast?.error(error?.response?.data?.message);
    } finally {
      fetchNote();
      setColor("#FFFFFF");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success(response?.data?.message);
      if (response?.status === 200) {
        fetchNote();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUpdate = async (id, e) => {
    e.preventDefault();
    setUpdateId(id);
    setIsEditing(true);
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/note/update/${id}`,
        {
          newNote: newNote,
          color: updateColor,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setNewNote(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      fetchNote();
      setNewNote("");
      setUpdateColor("#FFFFFF");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleAdd(e)}
        className="flex gap-2  sm:gap-5 justify-center items-center py-5 "
      >
        <input
          className=" border border-gray-200 shadow-sm rounded-sm  px-5 py-2 sm:w-[40%] outline-none"
          type="text"
          placeholder="write  notes here... "
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 rounded-sm  text-white max-sm:hidden"
        >
          Add Note
        </button>
        <button type="submit" className="sm:hidden">
          <CiSquarePlus className="text-3xl" />
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10"
        />
      </form>

      <div className="px-10 py-5 md:grid md:grid-cols-3  md:items-start md:auto-rows-min sm:grid sm:grid-cols-2 gap-5 flex flex-col  ">
        {notes?.data?.map((note, index) => (
          <div
            key={index}
            style={{ backgroundColor: note?.color }}
            className="border-gray-200 border  shadow-md rounded-md  px-7 py-3  flex flex-col justify-between gap-5 h-[30vh]   "
          >
            <div>
              <p className="text-sm">{note?.note}</p>
            </div>
            <div className="flex justify-end gap-10">
              <button
                onClick={() => {
                  setDeletId(note?._id);
                  setShowConform(() => true);
                }}
                className=""
              >
                <MdDeleteSweep className="text-xl text-red-400" />
              </button>
              <div className="relative ">
                {showConform && (
                  <div className="bg-white p-5 rounded-sm w-md h-32 shadow-2xl absolute top-0  ">
                    <h1 className="text-sm py-2">
                      Are You Sure You Want to Delete your note?
                    </h1>
                    <div className="flex gap-5">
                      <button
                        onClick={() => handleDelete(note?._id)}
                        className=" px-4 bg-blue-700 rounded-sm text-white"
                      >
                        yes
                      </button>
                      <button
                        onClick={() => setShowConform(false)}
                        className="py-1 px-4 bg-blue-700 rounded-sm text-white"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={(e) => {
                  handleUpdate(note?._id, e);
                }}
              >
                <MdEditNote className="text-xl" />
              </button>
            </div>
            <EditingNote
              setUpdateId={setUpdateId}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              newNote={newNote}
              setNewNote={setNewNote}
              updateColor={updateColor}
              setUpdateColor={setUpdateColor}
              fetchNote={fetchNote}
              handleUpdate={handleUpdate}
              updateId={updateId}
              note={note}
            />

            {/* {isEditing && updateId === note?._id && (
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
            )} */}
          </div>
        ))}
      </div>
    </>
  );
};
export default Note;
