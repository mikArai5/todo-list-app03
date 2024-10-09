import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
}

export const App = () => {
  const [ text, setText ] = useState('');
  const [ todos, setTodos ] = useState<Todo[]>([]);
  const [ onClickedId, setOnClickedId ] = useState<number>();

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: todos.length + 1,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText('');
  }

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.value = value;
        }
        return todo;
      });
      return newTodos;
    });
  }

  const onEdit = (id: number) => {
    setOnClickedId(id);
  }

  const onSubmit = (id: number) => {
    setOnClickedId(id);
  }

  const handleDelete = (id: number) => {
    setTodos((todos) => {
      return todos.filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  return (
    <div className='todoList'>
      <select 
        defaultValue='all' 
      >
        <option value="all">全て</option>
        <option value="waiting">未着手</option>
        <option value="doing">進行中</option>
        <option value="completed">完了</option>
      </select>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <input 
          type="text" 
          className='inputForm' 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="追加" onSubmit={handleSubmit} />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              { onClickedId === todo.id ? 
                <form onSubmit={() => onSubmit(todo.id)}>
                  <input 
                  type="text" 
                  value={todo.value} 
                  autoFocus
                  className='editForm'
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                />
                </form>
                : <p>{todo.value}</p>
              }
              <button onClick={() => onEdit(todo.id)}>更新</button>
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
};