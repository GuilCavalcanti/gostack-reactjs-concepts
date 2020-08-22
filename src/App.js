import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);
  
  useEffect(() => {
    api.get('repositories').then(res => {
      setRepos(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      url: "https://github.com/Guil",
      title: "React Native",
      techs: ["Node", "Express", "React Native"]
    });

    const repo = res.data;
    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    const repoIndex = repos.findIndex(repo => repo.id === id);
    repos.splice(repoIndex, 1);
    setRepos([...repos]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(1)}>
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
