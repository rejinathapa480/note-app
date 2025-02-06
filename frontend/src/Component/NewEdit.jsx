import axios from "axios";
import { useState } from "react"
import useAuthStore from "../authStore/useAuthStore";


const NewEdit = ({notes, updateId, setIsOpenEdit, setNotes}) =>{
  const [newNote,setNewNote] = useState("");
  const { accessToken } = useAuthStore();

  console.log("id", updateId)
   const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/note/update/${updateId}`,
        {
          newNote: newNote,
          color: "#09856b",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("response is:",response?.data);
    } catch (error) {
      console.log(error)
    }
    setIsOpenEdit(false)
  };
  return(

    <>
    <div>
      <input className="border-2" type="text" onChange={(e)=>setNewNote(e.target.value)}  value={newNote} />
      <button onClick={handleUpdate}>conform</button>
    </div>
    </>
  )
}
export default  NewEdit