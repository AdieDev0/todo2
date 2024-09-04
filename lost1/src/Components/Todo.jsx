import React, { useEffect, useRef, useState } from "react";
import { PiListHeartFill } from "react-icons/pi";
import TodoItems from "./TodoItems";
import Marquee from "react-fast-marquee";
import { FaRegFaceGrinWink } from "react-icons/fa6";

const Todo = () => {
  const [todolist, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const inputRef = useRef();

  /*---Add a new todo item---*/
  const addTodo = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  /*---Handle Enter Key Press---*/
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  /*---Delete a todo item by id---*/
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  /*---Toggle the completion status of a todo item---*/
  const toggleTodo = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  /*---Persist the todo list in local storage---*/
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <div className="bg-white h-screen flex flex-col relative">
      {/* Top Marquee */}
      <Marquee autoFill className="text-yellow-300 bg-black h-12">
        {[
          "Organize your tasks",
          "Plan your day",
          "Schedule your tasks",
          "Arrange your agenda",
          "Set your goals",
          "Manage your tasks",
        ].map((text, index) => (
          <div className="flex items-center gap-2 mx-5" key={index}>
            <p className="font-bold text-xl">{text}</p>
            <FaRegFaceGrinWink className="text-white w-6 h-6" />
          </div>
        ))}
      </Marquee>

      {/* Todo Input and List */}
      <div className="flex-1 p-8 lg:p-20 overflow-hidden">
        <div className="bg-stone-300 w-full max-w-md mx-auto p-6 rounded-xl flex flex-col border-dashed border-2 border-black">
          <div className="text-black flex items-center gap-2">
            <PiListHeartFill className="w-10 h-10 text-black/80" />
            <p className="font-Fredericka text-xl sm:text-2xl">Task Agenda</p>
          </div>

          {/* Add Todo */}
          <div className="mt-6 flex flex-col sm:flex-row">
            <input
              ref={inputRef}
              type="text"
              placeholder="What's your plan today?"
              className="p-3 bg-white flex-1 rounded-l-lg border-none outline-none placeholder-gray-400 text-black"
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={addTodo}
              className="p-3 w-full sm:w-auto bg-stone-400 text-black rounded-r-lg hover:bg-stone-500/80 transition duration-300"
            >
              List!
            </button>
          </div>

          {/* Todo Items */}
          <div className="mt-5 overflow-y-auto flex-1 max-h-[400px]">
            {todolist.length === 0 ? (
              <p className="text-gray-500 text-center mt-4">No tasks yet. Add some!</p>
            ) : (
              todolist.map((item) => (
                <TodoItems
                  key={item.id}
                  text={item.text}
                  id={item.id}
                  isComplete={item.isComplete}
                  deleteTodo={deleteTodo}
                  toggle={toggleTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <Marquee autoFill direction="right" className="text-yellow-300 bg-black h-12 absolute bottom-0 w-full">
        {[
          "Organize your tasks",
          "Plan your day",
          "Schedule your tasks",
          "Arrange your agenda",
          "Set your goals",
          "Manage your tasks",
        ].map((text, index) => (
          <div className="flex items-center gap-2 mx-5" key={index}>
            <p className="font-bold text-xl">{text}</p>
            <FaRegFaceGrinWink className="text-white w-6 h-6" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Todo;
