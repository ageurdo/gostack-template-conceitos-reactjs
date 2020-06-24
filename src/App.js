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
        {!repositories ? <> Lista de repositórios vazia</> : repositories.map((repositorie) => (
          <li key={repositorie.id}>
            <p>{repositorie.id}</p>
            <p>{repositorie.title}</p>
            <p>{repositorie.url}</p>
            <p>{repositorie.techs}</p>
            <p>{repositorie.likes}</p>
            < button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
