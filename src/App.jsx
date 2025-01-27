import { useEffect } from "react";
import { useState } from "react";
import TablUser from "./assets/components/TableUsers";
import Botones from "./assets/components/Botones";
import { useRef } from "react";

function App() {
  const API_URL = "https://randomuser.me/api/?results=100";

  const [users, setUsers] = useState([]);
  const [columnasPintadas, setColumnasPintadas] = useState(false);

  const originalUser = useRef();

  useEffect(() => {
    setTimeout(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((dataUser) => {
          setUsers(dataUser.results)
          originalUser.current = dataUser.results;
        });
    }, 2000)

  }, []);

  const handlePintarColumnas = () => {
    setColumnasPintadas(prevState => !prevState);
  }


  const handleFilterPais = () => {
    const filtradoPais = [...users].toSorted((a, b) => a.location.country.localeCompare(b.location.country));
    setUsers(filtradoPais);
  }

  const handleResetearFilas = () => {
    setUsers(originalUser.current);
  }

  const handleEliminarUsuario = (userId) => {
    const eliminado = users.filter(user => user.login.uuid !== userId);
    setUsers(eliminado);
  }

  return (
    <div className="page">
      <header>
        <h1>Api Users App</h1>

        <div className='contenedor-botones'>
          <Botones handleFilterPais={handleFilterPais} handlePintarColumnas={handlePintarColumnas} handleResetearFilas={handleResetearFilas} />
        </div>
      </header >

      <main>
        <h2>Tabla de usuarios de la API Random User</h2>

        {users.length !== 0 ? <TablUser pintarColumnas={columnasPintadas} users={users} handleEliminarUsuario={handleEliminarUsuario} /> : <p className="loading">Cargando...</p>}
      </main>
    </div >

  );
}

export default App;
