import React, { useEffect, useRef, useState } from "react";
import { PiListHeartFill } from "react-icons/pi";
import TodoItems from "./TodoItems"; // Import TodoItems

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
    <div className='bg-white h-screen p-20'>
      {/* box */}
      <div className='bg-stone-300 w-[500px] h-[500px] mx-auto p-10 rounded-xl flex flex-col'>
        <div className='text-black flex items-center gap-2'>
          <PiListHeartFill className='size-10 text-black/80'/>
          <p className='font-Fredericka text-2xl'>Task Agenda</p>
        </div>

        {/* list */}
        <div className='mt-10'>
          <input ref={inputref} type="text" placeholder='Whats your plan today?' className='p-3 bg-white w-80 rounded-l-lg border-none outline-0 placeholder-gray-600'/>
          <button onClick={add} className='p-3 w-24 bg-stone-400 text-black rounded-r-lg hover:bg-stone-500/80 duration-300'>List!</button>
        </div>

        {/* Todo Items */}
        <div className='mt-5 overflow-y-auto flex-1'>
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
  );
}

export default Todo;
