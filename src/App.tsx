import { useEffect, useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
  status: string;
  detail: string;
}

export const App = () => {
  const [ text, setText ] = useState('');
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ onClickedId, setOnClickedId ] = useState<number>();
  const [ todoEditing, setTodoEditing ] = useState(false);
  const [ detail, setDetail ] = useState('');
  const [ filteredTodos, setFilteredTodos ] = useState<Todo[]>([]);
  const [ filter, setFilter ] = useState('未着手');

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: todos.length + 1,
      status: "未着手",
      detail: detail,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText('');
    setDetail('');
  }

  const handleValueEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.value = value;
          todo.detail = detail;
        }
        return todo;
      });
      return newTodos;
    });
  }

  const handleDetailEdit = (id: number, detail: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.detail = detail;
        }
        return todo;
      });
      return newTodos;
    });
  }

  const onEdit = (id: number) => {
    setOnClickedId(id);
    setTodoEditing(true);
  }

  const onUpdateSubmit = () => {
    setOnClickedId(undefined);
    setTodoEditing(false);
  }

  const handleDelete = (id: number) => {
    setTodos((todos) => {
      return todos.filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  const handleStatusChange = (id: number, e:any ) => {
    const newTodos = todos.map((todo) => ({...todo}));

    setTodos(
      newTodos.map((todo) => 
        todo.id === id ? { ...todo, status: e.target.value } : todo
      )
    );
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "未着手" :
          setFilteredTodos(
            todos.filter((todo) => todo.status === "未着手")
          );
          break;
        case "進行中" :
          setFilteredTodos(
            todos.filter((todo) => todo.status === "進行中")
          );
          break;
        case "完了" :
          setFilteredTodos(
            todos.filter((todo) => todo.status === "完了")
          );
        break;
      default:
        setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);

  return (
    <>
    <h2>TODOリスト</h2>
    <div className='todoList'>
      <form 
        className='addForm'
        onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <label htmlFor="title">Title</label>
        <input 
          id="title"
          type="text" 
          className='inputForm' 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />
        <label htmlFor="detail">Detail</label>
        <textarea 
          id="detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <input className='addButton' type="submit" value="追加" onSubmit={handleSubmit} />
      </form>
      <select 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      <ul className=''>
        {filteredTodos.map((todo) => {
          return (
            <li 
              className='addedList'
              key={todo.id}
            >
              { onClickedId === todo.id ? 
              <div className="flex">
                  <select 
                    className='inputStatus'
                    value={todo.status} 
                    onChange={(e) => handleStatusChange(todo.id, e)}
                  >
                    <option value="未着手">未着手</option>
                    <option value="進行中">進行中</option>
                    <option value="完了">完了</option>
                  </select>
                  <div className='todoEditContent'>
                    <input 
                    type="text" 
                    value={todo.value} 
                    autoFocus
                    className='editForm'
                    onChange={(e) => handleValueEdit(todo.id, e.target.value)}
                    />
                    <textarea 
                      className='editTextarea'
                      value={todo.detail}
                      onChange={(e) => handleDetailEdit(todo.id, e.target.value)}
                    />
                  </div>
              </div>
                : 
                <table className='todoTable'>
                  <tbody>
                    <tr>
                      <td>
                        <span className='status'>{todo.status}</span>
                      </td>
                      <td>
                        <p>{todo.value}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className='taskNum'>No.{todo.id}</p>
                      </td>
                      <td>
                        <p>{todo.detail}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              }
              <div className='btns'>
                { todoEditing ?
                  <button className='editConfirmButton' onClick={() => onUpdateSubmit()}>確定</button>
                  : <button className='editConfirmButton' onClick={() => onEdit(todo.id)}>更新</button>
                }
                <button className='deleteButton' onClick={() => handleDelete(todo.id)}>削除</button>
              </div>
            </li>
            
          )
        })}
      </ul>
    </div>
    </>
  );
};