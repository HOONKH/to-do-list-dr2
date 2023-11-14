import { useEffect } from "react";
import { Link } from "react-router-dom";

const TodoCard = ({ todo }) => {
  useEffect(() => console.log(todo), []);
  return (
    <li
      className={`h-12 flex items-center w-[22rem] ${
        todo.isDone && "line-through"
      }`}
    >
      <span className=" w-1/12 text-xl text-right font-black">{todo.id}</span>
      <span className=" w-8/12 pl-6 text-lg font-md">{todo.title}</span>
      <Link
        to={`/${todo.id}?title=${todo.title}&is-done=${todo.isDone}`}
        className=" w-3/12 hover:font-bold text-m font-black "
      >
        자세히
      </Link>
    </li>
  );
};
export default TodoCard;
