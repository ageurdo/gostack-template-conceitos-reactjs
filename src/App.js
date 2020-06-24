import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  async function getData() {

    await api.get('/repositories')
      .then(response => setRepositories(response.data))
  }

  async function handleAddRepository() {
    let newStaticObject = {
      'title': 'Novo item',
      'url': 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      'techs': ['Axios', 'React JS', 'CSS']
    };
    await api.post('/repositories', newStaticObject);
    getData();
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    getData();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

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
