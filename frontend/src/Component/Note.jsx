import axios from "axios";
import { useEffect, useState } from "react";
import useAuthStore from "../authStore/useAuthStore";
import { toast } from "react-toastify";
import { data } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoColorPalette } from "react-icons/io5";

const Note = () => {
  const [notes, setNotes] = useState(null);
  const [input, setInput] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [color,setColor] = useState("#FFFFFF");
  const [updateColor,setUpdateColor] = useState("#FFFFFF")


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
          color
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setInput("");
      toast.success(response?.data?.message);
      console.log("response is:", response);
    } catch (error) {
      toast?.error(error?.response?.data?.message);
    } finally {
      fetchNote();
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

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/note/update/${updateId}`,
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
      toast.success( response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      fetchNote();
      setNewNote("");
      setUpdateId(null);
      setUpdateColor("#FFFFFF")
    }
  };

  return (
    <>
      <form
        onSubmit={handleAdd}
        className="flex gap-7 justify-center items-center  "
      >
        <input
          className=" border border-gray-200 shadow-sm rounded-sm  px-5 py-2 w-[40%] outline-none"
          type="text"
          placeholder="write  notes here... "
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 rounded-sm  text-white"
        >
          Add Note
        </button>
        <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} />
      </form>

      <div className="px-10 py-18 grid grid-cols-3 gap-5 ">
        {notes?.data?.map((note, index) => (
          <div
            key={index}
            style={{"backgroundColor":note?.color}}
            className="border-gray-200 border  shadow-md rounded-md  px-7 py-3  flex flex-col gap-5 "
          >
            <div>
              <p className=" ">{note?.note}</p>
            </div>
            <div className="flex justify-end gap-10">
              <button onClick={() => handleDelete(note?._id)} className="">
                <MdDeleteSweep className="text-xl" />
              </button>
              <button
                onClick={() => {
                  setUpdateId(note._id);
                }}
              >
                <MdEditNote className="text-xl" />
              </button>
            </div>
            {updateId === note._id && (
              <>
                <form
                  onSubmit={handleUpdate}
                  className="flex justify-center items-center gap-5 py-5"
                >
                  <input
                    className="border border-gray-200 shadow-sm rounded-sm  px-5 py-2 w-[40%] outline-none"
                    type="text"
                    onChange={(e) => setNewNote(e.target.value)}
                    value={newNote}
                  />
                  <button type="submit">
                    <MdOutlineSaveAlt className="text-2xl" />
                  </button>
                  <input type="color" value={updateColor} onChange={(e)=> {
                    setUpdateColor(e.target.value)
                  }
                  } />
                </form>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default Note;
