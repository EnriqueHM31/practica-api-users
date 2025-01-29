import { FORMAS_ORDENAR } from "../utils/config";

export default function TableUser({ ordenado, handleFiltrarHead, users, pintarColumnas, handleEliminarUsuario }) {


    const { none, nombre, apellidos, pais } = FORMAS_ORDENAR;

    const ordenarPor = (opcionOrdenar) => {
        return ordenado === opcionOrdenar ? none : opcionOrdenar;
    }

    const ponerFondo = (formaOrdenado) => {
        return ordenado === formaOrdenado ? "encabezado-ordenado" : "";
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th className={`thead ${ponerFondo(nombre)}`} onClick={() => handleFiltrarHead(ordenarPor(nombre))}>Nombre</th>
                    <th className={`thead ${ponerFondo(apellidos)}`} onClick={() => handleFiltrarHead(ordenarPor(apellidos))}>Apellidos</th>
                    <th className={`thead ${ponerFondo(pais)}`} onClick={() => handleFiltrarHead(ordenarPor(pais))}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        return (
                            <tr className="filas-users" style={{ backgroundColor: index % 2 === 0 && pintarColumnas ? "#333" : "transparent" }} key={user.login.uuid} >
                                <td><img src={user.picture.thumbnail} alt={`Avatar de ${user.name.first}`} /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td><button onClick={() => handleEliminarUsuario(user.login.uuid)}>Eliminar</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table >
    );
}
