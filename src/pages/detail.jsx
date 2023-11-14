import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FiCheckSquare, FiTrash2, FiTool } from "react-icons/fi";

const Detail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");
  const isDone = searchParams.get("is-done");
  const navigate = useNavigate();

  useEffect(() => console.log(id), [id]);
  useEffect(() => console.log(title), [title]);
  useEffect(() => console.log(isDone), [isDone]);

  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const onClickEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const onClickisDone = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const updatedTodos = parsedTodos.map((v, i) => {
      if (v.id === +id) {
        return { id: v.id, title: v.title, isDone: !v.isDone };
      } else {
        return v;
      }
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/");
  };
  const onClickDel = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const deletedTodos = parsedTodos.filter((v) => {
      if (v.id !== +id) {
        return v;
      }
    });
    if (deletedTodos.length === 0) {
      localStorage.removeItem("todos");
    } else {
      localStorage.setItem("todos", JSON.stringify(deletedTodos));
    }
    navigate("/");
  };

  const onSubmitEditTodo = (e) => {
    e.preventDefault();

    if (!editTodo) return;

    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const updatedTodos = parsedTodos.map((v, i) => {
      if (v.id === +id) {
        return { id: v.id, title: editTodo, isDone: v.isDone };
      } else {
        return v;
      }
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/");
  };

  return (
    <div className="bg-purple-200 min-h-screen justify-center flex items-center">
      <span className="font-black">{id}</span>
      <span className="ml-4 font-black">
        {isEdit ? (
          <form className="flex" onSubmit={onSubmitEditTodo}>
            <input
              className="border-2 focus:outline-none focus:border-blue-300 mr3 px-2 py-1"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
            <input
              className="border-2-transparent focus:outline-none focus:border-green-300 hover:font-bold"
              type="submit"
              value="확 인"
            />
          </form>
        ) : (
          title
        )}
      </span>
      <button
        onClick={onClickisDone}
        className="ml-4 hover:green-600 active:bg-green-700 bg-green-400 rounded-md px-2  h-8 flex justify-center items-center "
      >
        <FiCheckSquare />
        {isDone === "true" ? "완료취소" : "완료"}
      </button>
      <button
        onClick={onClickEditToggle}
        className="ml-[2px] hover:blue-600 active:bg-blue-700 bg-blue-400 rounded-md px-2  h-8 flex justify-center items-center "
      >
        <FiTool /> {isEdit ? "취소" : "수정"}
      </button>
      <button
        onClick={onClickDel}
        className="ml-[2px] hover:green-600 active:bg-red-700 bg-red-400
        rounded-md px-2 h-8 flex justify-center items-center "
      >
        <FiTrash2 />
        삭제
      </button>
    </div>
  );
};

export default Detail;
