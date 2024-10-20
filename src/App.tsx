import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  status: string;
  detail: string;
}

type EditTodo = {
  id: number;
  title: string;
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
  const [ editTodo, setEditTodo ] = useState<EditTodo>({  
    id: 1,
    title: "",
    status: "",
    detail: "",
  });

  const handleSubmit = () => {
    if (!text || !detail) return;

    const newTodo: Todo = {
      id: todos.length + 1,
      title: text,
      status: "未着手",
      detail: detail,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText('');
    setDetail('');
  }

  const handleStatusChange = ( e:any ) => {
    const changedEditTodo = {...editTodo, status:e.target.value}
    setEditTodo(changedEditTodo);
  };

  const handleTitleEdit = (e:any) => {
    const changedEditTodo = {...editTodo, title:e.target.value}
    setEditTodo(changedEditTodo);
    console.log(editTodo);
  }

  const handleDetailEdit = ( e:any ) => {
    const changedEditTodo = {...editTodo, detail:e.target.value}
    setEditTodo(changedEditTodo);
  }

  const onEdit = (id: number) => {
    setOnClickedId(id);
    setTodoEditing(true);
  }

  const onUpdateSubmit = () => {
    const newTodo: EditTodo = {
      id: editTodo.id,
      title: editTodo.title,
      status: editTodo.status,
      detail: editTodo.detail,
    };
    setTodos((todos) => [newTodo, ...todos]);
    console.log(todos);
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
        case "全て" :
          setFilteredTodos(todos);
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
        <option value="全て">全て</option>
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
              { onClickedId === editTodo.id ? 
                <div className="flex">
                    <select 
                      className='inputStatus'
                      value={editTodo.status} 
                      onChange={handleStatusChange}
                    >
                      <option value="未着手">未着手</option>
                      <option value="進行中">進行中</option>
                      <option value="完了">完了</option>
                    </select>
                    <div className='todoEditContent'>
                      <input 
                        type="text" 
                        value={editTodo.title} 
                        autoFocus
                        className='editForm'
                        onChange={handleTitleEdit}
                      />
                      <textarea 
                        className='editTextarea'
                        value={editTodo.detail}
                        onChange={handleDetailEdit}
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
                        <p>{todo.title}</p>
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
                  : <button className='editConfirmButton' onClick={() => onEdit(editTodo.id)}>更新</button>
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