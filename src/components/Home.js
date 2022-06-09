import React, { /* useEffect, */ useState } from 'react';

import { api } from '../api';
import { useServerData } from '../state/serverDataContext';

// import { addPosts, getPosts } from '@karan-push/fetch-package';

const Home = () => {
  const serverTodos = useServerData(data => {
    return data.todos || [];
  });
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(serverTodos);

  /* useEffect(() => {
    posts();
  }, []);

  const posts = async () => {
    const data = await getPosts();
    setTodos([
      ...todos,
      ...data.map(el => {
        return { text: el.title, id: el.id };
      })
    ]);
  }; */

  return (
    <div>
      <h1>Home page</h1>

      <form
        onSubmit={e => {
          e.preventDefault();

          const newTodo = {
            text
          };

          api.todos.create(newTodo).then(res => {
            setTodos([...todos, res]);
            setText('');
          });

          /* addPosts(text, text + ' body', 1).then(res => {
            setTodos([{ id: res.id, text: res.title }, ...todos]);
            setText('');
          }); */
        }}
      >
        <label htmlFor="todo">Add a todo</label>
        <br />
        <input
          id="todo"
          type="text"
          value={text}
          autoComplete="off"
          onChange={e => setText(e.target.value)}
        />
      </form>

      <ul>
        {todos.map(todo => (
          <li key={`${todo.id} - ${todo.text}`}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

Home.fetchData = () => {
  return api.todos.all().then(todos => {
    return {
      todos
    };
  });
};

export default Home;
