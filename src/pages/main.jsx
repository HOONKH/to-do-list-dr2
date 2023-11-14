import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TodoCard from "../components/TodoCard";

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [lastTodoId, setLastTodoId] = useState(0);
  const getTodos = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    setTodos(parsedTodos);

    setLastTodoId(parsedTodos[parsedTodos.length - 1].id);
  };
  //   로컬스토리지로부터 읽어오는 함수
  useEffect(() => {
    getTodos();
    console.log(todos);
  }, []);
  useEffect(() => {
    console.log(lastTodoId);
  });

  return (
    <main className="bg-purple-400 min-h-screen max-w-screen-md mx-auto">
      <h1 className=" flex justify-center text-4xl font-black h-[136px] items-center">
        To Do List
      </h1>
      <CreateTodo todos={todos} getTodos={getTodos} lastTodoId={lastTodoId} />
      <ul className=" mx-auto w-[24rem] mt-12 h-[30rem] overflow-y-auto rounded-md">
        {todos.length === 0
          ? "할거생각해"
          : todos.map((v, i) => {
              return <TodoCard key={i} todo={v} />;
            })}
      </ul>
    </main>
  );
};

export default Main;
