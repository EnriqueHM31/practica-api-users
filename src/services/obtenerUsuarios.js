import { useEffect, useState, useRef } from "react";
import { API } from "../utils/services";
import { ERROR_OK, ERROR_SERVICE } from "../utils/error";


export const useObtenerUsuarios = (pagina) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const originalUser = useRef();

    useEffect(() => {
        setLoading(true);
        fetch(API(pagina))
            .then((response) => {
                if (!response.ok) {
                    setError(ERROR_OK)
                    throw new Error(ERROR_OK);
                }
                return response.json();
            })
            .then((dataUser) => {
                setUsers(dataUser.results);
                originalUser.current = dataUser.results;
            })
            .catch(() => {
                setError(ERROR_SERVICE);
                throw new Error(ERROR_SERVICE);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [pagina]);

    const handleResetearFilas = () => {
        setUsers(originalUser.current);
    }

    const handleEliminarUsuario = (userId) => {
        const eliminado = users.filter(user => user.login.uuid !== userId);
        setUsers(eliminado);
    }

    return { users, loading, error, handleEliminarUsuario, handleResetearFilas };
};
