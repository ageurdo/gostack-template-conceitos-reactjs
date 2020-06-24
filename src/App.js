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
    try {
      let newStaticObject = {
        title: 'Novo item',
        url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
        techs: ['Axios', 'React JS', 'CSS']
      };

      const response = await api.post('/repositories', newStaticObject);

      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.error(error);
    }
  }


  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {!repositories ? <></> : repositories.map(repository => (
          <li key={repository.id}>
            {String(repository.title)}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))
        }
      </ul >

      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
