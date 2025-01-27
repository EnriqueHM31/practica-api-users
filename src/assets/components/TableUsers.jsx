export default function TablUser({ users }) {
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
                    users.map(user => {
                        return (
                            <tr key={user.login.uuid}>
                                <td><img src={user.picture.thumbnail} alt={`Avatar de ${user.name.first}`} /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td><button>Eliminar</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}
