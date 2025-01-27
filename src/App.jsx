import { useEffect } from "react";
import { useState } from "react";
import TablUser from "./assets/components/TableUsers";

function App() {
  const API_URL = "https://randomuser.me/api/?results=100";

  const [users, setUsers] = useState([]);
  const [columnasPintadas, setColumnasPintadas] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((dataUser) => setUsers(dataUser.results));
    }, 2000)

  }, []);

  const handlePintarColumnas = () => {
    setColumnasPintadas(!columnasPintadas);
  }

  return (
    <div className="page">
      <header>
        <h1>Api Users App</h1>

        <div className="contenedor-botones">
          <button onClick={handlePintarColumnas}>Pintar Columnas</button>
        </div>
      </header>

      <main>
        <h2>Tabla de usuarios de la API Random User</h2>

        {users !== null ? <TablUser users={users} /> : <p>Cargando...</p>}
      </main>
    </div>

  );
}

export default App;
