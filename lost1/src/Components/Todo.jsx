import React, { useEffect, useRef, useState } from "react";
import { PiListHeartFill } from "react-icons/pi";
import TodoItems from "./TodoItems"; // Import TodoItems
import Marquee from "react-fast-marquee";
const Todo = () => {
  const [todolist, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputref = useRef();

  /*---Add a new todo item---*/
  const add = () => {
    const inputText = inputref.current.value.trim();

    if (inputText === "") {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputref.current.value = "";
  };

  /*---Delete a todo item by id---*/
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  /*---Toggle the completion status of a todo item---*/
  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  /*---Log the todo list whenever it changes---*/
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  return (
    <div className="bg-white min-h-screen">
      {/* Marquee */}
      <Marquee>
        <p>Organize your tasks</p>
        <p>Plan your day</p>
        <p>Schedule your tasks</p>
        <p>Arrange your agenda</p>
        <p>Set your goals</p>
        <p>Manage your tasks</p>
      </Marquee>
      {/* box */}
      <div className="p-8 lg:p-20">
        <div className="bg-stone-300 w-full max-w-md h-auto mx-auto p-6 rounded-xl flex flex-col border-dashed border-2 border-black">
          <div className="text-black flex items-center gap-2">
            <PiListHeartFill className="size-10 text-black/80" />
            <p className="font-Fredericka text-xl sm:text-2xl">Task Agenda</p>
          </div>

          {/* list */}
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <input
              ref={inputref}
              type="text"
              placeholder="Whats your plan today?"
              className="p-3 bg-white flex-1 rounded-l-lg border-none outline-0 placeholder-gray-400 text-black"
            />
            <button
              onClick={add}
              className="p-3 w-full sm:w-auto bg-stone-400 text-black rounded-r-lg hover:bg-stone-500/80 duration-300"
            >
              List!
            </button>
          </div>

          {/* Todo Items */}
          <div className="mt-5 overflow-y-auto flex-1">
            {todolist.map((item) => (
              <TodoItems
                key={item.id}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
