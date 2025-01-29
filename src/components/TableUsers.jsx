export default function TableUser({ ordenado, handleFiltrarHead, users, pintarColumnas, handleEliminarUsuario }) {

    const FORMASORDENAR = { none: 'none', nombre: 'nombre', apellidos: 'apellidos', pais: 'pais' }

    const { none, nombre, apellidos, pais } = FORMASORDENAR;

    const ordenarPor = (opcionOrdenar) => {
        return ordenado === opcionOrdenar ? none : opcionOrdenar;
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th className="thead" style={{ backgroundColor: ordenado === nombre ? "#333" : "" }} onClick={() => handleFiltrarHead(ordenarPor(nombre))}>Nombre</th>
                    <th className="thead" style={{ backgroundColor: ordenado === apellidos ? "#333" : "" }} onClick={() => handleFiltrarHead(ordenarPor(apellidos))}>Apellidos</th>
                    <th className="thead" style={{ backgroundColor: ordenado === pais ? "#333" : "" }} onClick={() => handleFiltrarHead(ordenarPor(pais))}>Pais</th>
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
