import React from "react";
import { MdDoneAll, MdRemoveDone } from "react-icons/md";
import { GoTrash } from "react-icons/go";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2 bg-white p-3 rounded-lg shadow-xl">
      {/*--- Toggle Completion Status ---*/}
      <div
        onClick={() => toggle(id)}
        className="flex flex-1 items-center cursor-pointer"
        aria-label={isComplete ? "Mark as incomplete" : "Mark as complete"}
      >
        {isComplete ? (
          <MdDoneAll
            className="w-6 text-green-600 hover:scale-125 duration-200 hover:text-green-700"
            aria-hidden="true"
          />
        ) : (
          <MdRemoveDone
            className="w-6 text-gray-600 hover:scale-125 duration-200 hover:text-gray-700"
            aria-hidden="true"
          />
        )}
        <p
          className={`ml-4 text-lg text-gray-800 
          ${isComplete ? "line-through decoration-yellow-600" : ""}`}
        >
          {text}
        </p>
      </div>

      {/*--- Delete Item ---*/}
      <button
        onClick={() => deleteTodo(id)}
        className="p-1 text-black hover:scale-125 duration-200 hover:text-red-700"
        aria-label="Delete todo"
      >
        <GoTrash className="w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default TodoItems;
