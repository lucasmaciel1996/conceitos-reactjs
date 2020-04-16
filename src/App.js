import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] =useState([]);
  
  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const repository = { 
      title: `Desafio Node.js ${Date.now()}`, 
      url: "http://github.com/...",
      techs: ["Node.js", "..."],
      likes: 0
    }
    const response = await api.post('repositories',repository);
    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204) {
      const newRepositories = repositories.filter(repo => repo.id !== id);
      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
