export default function TablUser({ users, pintarColumnas, handleEliminarUsuario }) {


    return (
        <table>
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        return (
                            <tr style={{ backgroundColor: index % 2 === 0 && pintarColumnas ? "#333" : "transparent" }} key={user.login.uuid} >
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
