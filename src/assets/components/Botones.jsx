

export default function Botones({ ordenado, handleFilterPais, handlePintarColumnas, handleResetearFilas }) {
    const BOTONES = [
        { id: 1, texto: "Pintar Columnas", metodo: () => handlePintarColumnas(), },
        { id: 2, texto: !ordenado ? "Ordenar por pais" : "No ordenar", metodo: () => handleFilterPais() },
        { id: 3, texto: "Resetear Filas", metodo: () => handleResetearFilas() },
    ]

    return (
        <>
            {
                BOTONES.map(({ id, texto, metodo }) => {
                    return (
                        <button onClick={metodo} key={id}>
                            {texto}
                        </button>
                    )
                })
            }
            <input type="search" name="buscador" placeholder="Buscar por pais" />
        </>

    );
};

