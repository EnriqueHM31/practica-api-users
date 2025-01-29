import { useEffect, useState, useRef, useMemo, Fragment } from "react";
import TablUser from "./components/TableUsers";
import Botones from "./components/Botones";

function App() {

  const FORMASORDENAR = { none: 'none', nombre: 'nombre', apellidos: 'apellidos', pais: 'pais' }

  const { none, pais } = FORMASORDENAR;


  const [ordenado, setOrdenado] = useState(none);

  const [users, setUsers] = useState([]);
  const [columnasPintadas, setColumnasPintadas] = useState(false);
  const [filtrado, setFiltrado] = useState(null);
  const [pagina, setPagina] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const originalUser = useRef();


  useEffect(() => {
    setLoading(true);
    fetch(`https://randomuser.me/api/?page=${pagina}&results=10&seed=Enrique`)
      .then((response) => {
        if (!response.ok) {
          setError("Ocurrio un error con la API")
          throw new Error("Ocurrio un error");
        }
        return response.json()
      })
      .then(dataUser => {
        setUsers(dataUser.results);
        originalUser.current = dataUser.results;
      })
      .catch(() => {
        setError('Ocurrio un error con el servicio')
        throw new Error("Ocurrio un error con el servicio");
      })
      .finally(() => { setLoading(false) });

  }, [pagina]);

  const handlePagesNext = () => {
    setPagina(prevState => prevState + 1);
  }

  const handlePagesBefore = () => {
    setPagina(prevState => prevState - 1);
  }

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
          <Botones
            users={newUser}
            filtrado={filtrado}
            ordenado={ordenado}
            columnasPintadas={columnasPintadas}
            ChangeInputBuscar={ChangeInputBuscar}
            handleFilterPais={handleFilterPais}
            handlePintarColumnas={handlePintarColumnas}
            handleResetearFilas={handleResetearFilas}
          />
        </div>
      </header >

      <main>
        <h2>Tabla de usuarios de la API Random User</h2>

        {error !== null && <p className="error">{error}</p>}
        {!loading && error === null
          &&
          <Fragment>
            <TablUser
              users={newUser}
              ordenado={ordenado}
              pintarColumnas={columnasPintadas}
              handleFiltrarHead={handleFiltrarHead}
              handleEliminarUsuario={handleEliminarUsuario} />
            <div className="contenedor-botones-paginas">
              <button onClick={() => handlePagesBefore()} className="btn-pages">
                <img src="src/assets/left.png" alt="imagen del boton paginas anteriores" />
              </button>
              <button onClick={() => handlePagesNext()} className="btn-pages">
                <img src="src/assets/right.png" alt="imagen del boton paginas siguientes" />
              </button>
            </div>


          </Fragment>
        }
        {loading ? error === null ? <p className="loading">Cargando...</p> : null : null}
      </main>
    </div >

  );
}

export default App;
