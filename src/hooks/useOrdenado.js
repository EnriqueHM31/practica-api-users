import { useMemo } from "react";

export const useOrdenado = (filtrado, users, ordenado) => {
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


    return newUser;
}