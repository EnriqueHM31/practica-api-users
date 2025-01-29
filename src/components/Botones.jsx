

export default function Botones({ error, loading, columnasPintadas, ChangeInputBuscar, ordenado, handleFilterPais, handlePintarColumnas, handleResetearFilas, users, filtrado }) {


    const BOTONES = [
        { id: 1, texto: "Pintar Columnas", metodo: () => handlePintarColumnas(), activo: columnasPintadas ? "button-activo" : "button-inactivo" },
        { id: 2, texto: "Ordenar por pais", metodo: () => handleFilterPais(), activo: ordenado === "pais" ? "button-activo" : "button-inactivo" },
        { id: 3, texto: "Resetear Filas", metodo: () => handleResetearFilas() },
    ]

    return (
        <>
            {
                BOTONES.map(({ id, texto, metodo, activo }) => {
                    return (
                        <button className={activo} onClick={metodo} key={id}>
                            {texto}
                        </button>
                    )
                })
            }
            <input onChange={(e) => ChangeInputBuscar(e)} type="text" name="buscador" placeholder="Mexico, Canada, Germany" />

            {filtrado !== null && error === null && !loading && users.length === 0 ? <p className="sin-resultados">Sin resultados</p> : null}
        </>

    );
};

