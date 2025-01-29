import { useState } from "react";
import { FORMAS_ORDENAR } from "../utils/config";

export const useBotones = () => {

    const { none, pais } = FORMAS_ORDENAR;
    const [columnasPintadas, setColumnasPintadas] = useState(false);
    const [filtrado, setFiltrado] = useState(null);
    const [ordenado, setOrdenado] = useState(none);

    const handlePintarColumnas = () => {
        setColumnasPintadas(prevState => !prevState);
    }

    const handleFilterPais = () => {
        const paises = ordenado === none ? pais : none
        setOrdenado(paises)
    }

    const ChangeInputBuscar = (e) => {
        setFiltrado(e.target.value);
    }

    const handleFiltrarHead = (ordenar) => {
        setOrdenado(ordenar);
    }



    return {
        columnasPintadas,
        filtrado,
        ordenado,
        handlePintarColumnas,
        handleFilterPais,
        ChangeInputBuscar,
        handleFiltrarHead
    }

}