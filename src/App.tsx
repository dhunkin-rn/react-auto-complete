import React from 'react';
import './App.css';
import { AutoComplete } from './components';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

function App() {
  const parseData = (results: Array<TodoItem>): string[] => {
    return results.map(({ title }) => title);
  }

  return (
    <div className='App'>
      <AutoComplete
        dataUrl='https://jsonplaceholder.typicode.com/todos'
        dataTransformer={parseData}
        suggestionsLimit={10}
        onChange={console.log}
      ></AutoComplete>
      <hr></hr>
    </div>
  );
}

export default App;
