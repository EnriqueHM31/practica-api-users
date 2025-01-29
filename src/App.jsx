import { useEffect } from "react";
import { useState } from "react";
import TablUser from "./assets/components/TableUsers";
import Botones from "./assets/components/Botones";
import { useRef } from "react";
import { useMemo } from "react";

function App() {
  const API_URL = "https://randomuser.me/api/?results=100";

  const FORMASORDENAR = { none: 'none', nombre: 'nombre', apellidos: 'apellidos', pais: 'pais' }

  const { none, pais } = FORMASORDENAR;


  const [ordenado, setOrdenado] = useState(none);

  const [users, setUsers] = useState([]);
  const [columnasPintadas, setColumnasPintadas] = useState(false);
  const [filtrado, setFiltrado] = useState(null);




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
    const paises = ordenado === none ? pais : none
    setOrdenado(paises)
  }

  const handleResetearFilas = () => {
    setUsers(originalUser.current);
  }

  const handleEliminarUsuario = (userId) => {
    const eliminado = users.filter(user => user.login.uuid !== userId);
    setUsers(eliminado);
  }

  const ChangeInputBuscar = (e) => {
    setFiltrado(e.target.value);
  }

  const handleFiltrarHead = (ordenar) => {
    setOrdenado(ordenar);
  }

  const filtrar = useMemo(() => {
    return filtrado !== null && filtrado.length > 0
      ? users.filter(user => { return user.location.country.toLowerCase().includes(filtrado.toLowerCase()) })
      : users;
  }, [filtrado, users]);

  const newUser = useMemo(() => {

    if (ordenado === 'none') return filtrar;
    if (ordenado === 'nombre') return [...filtrar].sort((a, b) => a.name.first.localeCompare(b.name.first));
    if (ordenado === 'apellidos') return [...filtrar].sort((a, b) => a.name.last.localeCompare(b.name.last));
    if (ordenado === 'pais') return [...filtrar].sort((a, b) => a.location.country.localeCompare(b.location.country));
    console.log(filtrar);
  }, [filtrar, ordenado]);


  return (
    <div className="page">
      <header>
        <h1>Api Users App</h1>

        <div className='contenedor-botones'>
          <Botones columnasPintadas={columnasPintadas} ChangeInputBuscar={ChangeInputBuscar} handleFilterPais={handleFilterPais} ordenado={ordenado} handlePintarColumnas={handlePintarColumnas} handleResetearFilas={handleResetearFilas} users={newUser} filtrado={filtrado} />
        </div>
      </header >

      <main>
        <h2>Tabla de usuarios de la API Random User</h2>

        {users.length !== 0 ? <TablUser ordenado={ordenado} handleFiltrarHead={handleFiltrarHead} pintarColumnas={columnasPintadas} users={newUser} handleEliminarUsuario={handleEliminarUsuario} /> : <p className="loading">Cargando...</p>}
      </main>
    </div >

  );
}

export default App;
