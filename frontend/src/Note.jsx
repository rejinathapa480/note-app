import { useState } from "react"
import { MdEdit } from "react-icons/md";

const Note = () => {
    const [noteList,setNoteList] = useState([]);
    const [input,setInput] = useState("")

    const handleNote = () =>{
       if(!noteList){
        alert("incomplete input")
       }
       setNoteList([...noteList,{id:noteList.length + 1, text:input , completed: false}]);
    
    }
    
    return(
        <>
        <div >
            <h1 className="text-xl p-5">My Note App</h1>
            <div> 
                <div className="flex gap-10 px-10 justify-center items-center">
                <input type="text" value={input} placeholder="write notes" onChange={(e) => setInput(e.target.value)} className=""/>
               <button onClick={handleNote} className="px-3 py-1 bg-blue-300  rounded-sm">Add note</button>
                </div>
                <div className="flex flex-wrap gap-10 justify-center items-center pt-20">
               {noteList?.map((item)=> (
                <div key={item?.id} className="border-blue-100 border w-[25%] h-[50vh]  bg-blue-300 rounded-sm shadow-lg   ">
                    <p className=" text-yellow-950 px-10 text-center text-wrap">{item?.text}</p>
                    <span><MdEdit /></span>
                    </div>
               ))}
                </div>
            </div>
         
        </div>
        </>
    )
}
export default Note