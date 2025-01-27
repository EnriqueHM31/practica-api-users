

export default function Botones({ handleFilterPais, handlePintarColumnas }) {
    const BOTONES = [
        { id: 1, texto: "Pintar Columnas", metodo: () => handlePintarColumnas(), },
        { id: 2, texto: "Ordenar por pais", metodo: () => handleFilterPais() },
        { id: 3, texto: "Resetear Filas" }
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
        </>

    );
};

