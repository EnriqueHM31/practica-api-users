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
    setColumnasPintadas(prevState => !prevState);
  }

  const pintarBotones = (estado) => {
    const fondo = estado ? "#ff0" : "transparent"
    const color = estado ? "#000" : "#fff"
    return { fondo, color }
  }

  const { fondo: fondoPintarColumnas, color: colorPintarColumnas } = pintarBotones(columnasPintadas);

  const handleFilterPais = () => {
    const filtradoPais = [...users].toSorted((a, b) => a.location.country.localeCompare(b.location.country));
    setUsers(filtradoPais);

  }

  return (
    <div className="page">
      <header>
        <h1>Api Users App</h1>

        <div className="contenedor-botones">
          <button style={{ backgroundColor: fondoPintarColumnas, color: colorPintarColumnas }} onClick={handlePintarColumnas}>Pintar Columnas</button>
          <button onClick={handleFilterPais}>Ordenar pos pais</button>
        </div>
      </header >

      <main>
        <h2>Tabla de usuarios de la API Random User</h2>

        {users !== null ? <TablUser pintarColumnas={columnasPintadas} users={users} /> : <p>Cargando...</p>}
      </main>
    </div >

  );
}

export default App;
