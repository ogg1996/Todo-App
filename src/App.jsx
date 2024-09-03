import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <div id='container'>
      <Header title='Todo-App' />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function Header({ title }) {
  return <h1>{title}</h1>
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div id='todo_input'>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          if (inputValue.trim() === '') return;
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  // 수정 버튼이 눌렸는지 체크
  const [updateBtn, setUpdateBtn] = useState(false);
  // 완료 버튼이 눌렸는지 체크
  const [completeCheckBox, setCompleteCheckBox] = useState(false);
  return (
    <li id={'todo_' + todo.id}>
      <input type="checkbox" onChange={() => {
        if (completeCheckBox) {
          document.querySelector('#todo_' + todo.id + ' .todo_text')
            .style.backgroundColor = 'powderblue';
          setCompleteCheckBox(false);
        } else {
          document.querySelector('#todo_' + todo.id + ' .todo_text')
            .style.backgroundColor = 'yellowgreen';
          setCompleteCheckBox(true);
        }
      }} />
      <div className="todo_text">
        {todo.content}
      </div>
      <input
        className='update_todo_input'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <div className="todo_btns">
        <button
          onClick={() => {
            if (updateBtn) {
              setUpdateBtn(false);
              document.querySelector('#todo_' + todo.id + ' .update_todo_input').style.display = 'none';
              if (inputValue.trim() === '') return
              setTodoList((prev) =>
                prev.map((el) =>
                  el.id === todo.id ? { ...el, content: inputValue } : el
                )
              );
            } else {
              setUpdateBtn(true);
              document.querySelector('#todo_' + todo.id + ' .update_todo_input').style.display = 'inline';
            }
          }}
        >
          수정
        </button>
        <button
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id);
            });
          }}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default App;
