import { Fragment } from "react";
import TableUser from "./components/TableUsers";
import Botones from "./components/Botones";
import { useObtenerUsuarios } from "./services/obtenerUsuarios";
import { useBotones } from "./hooks/useBotones";
import { usePages } from "./hooks/usePages";
import { useOrdenado } from "./hooks/useOrdenado";
import { MAX_PAGE } from "./utils/config";



function App() {


  const { pagina, handlePagesNext, handlePagesBefore } = usePages();
  const { users, loading, error, handleEliminarUsuario, handleResetearFilas } = useObtenerUsuarios(pagina);
  const { columnasPintadas, filtrado, ordenado, handlePintarColumnas, handleFilterPais, ChangeInputBuscar, handleFiltrarHead } = useBotones();
  const newUser = useOrdenado(filtrado, users, ordenado);

  return (
    <div className="page">
      <header>
        <h1>Api Users App</h1>

        <main className='contenedor-botones'>
          <Botones
            users={newUser}
            filtrado={filtrado}
            ordenado={ordenado}
            columnasPintadas={columnasPintadas}
            error={error}
            loading={loading}
            ChangeInputBuscar={ChangeInputBuscar}
            handleFilterPais={handleFilterPais}
            handlePintarColumnas={handlePintarColumnas}
            handleResetearFilas={handleResetearFilas}
          />
          <strong className="paginas">Pagina {pagina} / {MAX_PAGE}</strong>
        </main>
      </header >

      <main>
        <h2>Tabla de usuarios de la API Random User</h2>

        {error !== null && <p className="error">{error}</p>}
        {!loading && error === null && newUser.length > 0
          &&
          <Fragment>
            <TableUser
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
