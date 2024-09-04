import React from 'react';
import { MdDoneAll, MdRemoveDone } from "react-icons/md";
import { GoTrash } from "react-icons/go";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2 bg-white p-2 rounded-lg shadow-xl ">
      {/*---Done check box and text notes---*/}
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        {isComplete ? <MdDoneAll className="w-6 hover:scale-125 duration-200 hover:text-black/85" /> : <MdRemoveDone className="w-6 hover:scale-125 duration-200 hover:text-black/85" />}
        <p
          className={`text-slate-700 ml-4 text-[17px] decoration-yellow-950
          ${isComplete ? "line-through" : ""}`}
        >
          {text}
        </p>
      </div>

      {/*---Delete Icon---*/}
      <GoTrash
        onClick={() => {
          deleteTodo(id);
        }}
        className="w-9 cursor-pointer hover:scale-125 duration-200 hover:text-black/85"
      />
    </div>
  );
}

export default TodoItems;
