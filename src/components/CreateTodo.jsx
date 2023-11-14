import { useState } from "react";

const CreateTodo = ({ todos, getTodos, lastTodoId }) => {
  const [newTodo, setNewTodo] = useState("");

  const onSubmitNewTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;

    const newTodos = [
      ...todos,
      { id: lastTodoId + 1, title: newTodo, isDone: false },
    ];

    localStorage.setItem("todos", JSON.stringify(newTodos));

    getTodos();
    setNewTodo("");
  };

  return (
    <form onSubmit={onSubmitNewTodo} className="mx-auto w-96 mt-12 flex ">
      <input
        className="focus:outline-none w-3/4 mr-4 rounded-md p-2 border-2 focus:border-purple-700"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      ></input>
      <input
        className="w-1/4 bg-purple-200 rounded-md font-semibold hover:bg-purple-600 active:bg-purple-400"
        type="submit"
        value="생 성"
      ></input>
    </form>
  );
};
export default CreateTodo;
