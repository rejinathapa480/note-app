import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const NoteCard = ({ noteList, date }) => {
  return (
    <>
      <div className="flex flex-wrap gap-10 justify-center items-center py-20">
        {noteList?.map((item) => (
          <div
            key={item?.id}
            className=" flex flex-col  w-[25%] h-[50vh]  bg-blue-300 rounded-sm shadow-lg justify-between  "
          >
            <p className=" text-yellow-950 px-10 text-justify py-3 italic">
              {item?.text}
            </p>
            <div className="flex justify-between p-2">
              <span>{date.toLocaleDateString()}</span>
              <div className="flex gap-3">
                <span className=" p-2 rounded-full bg-black text-white">
                  <MdEdit />
                </span>
                <span className=" p-2 rounded-full bg-black text-white">
                  <MdDelete />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default NoteCard;

import { useState } from "react"


