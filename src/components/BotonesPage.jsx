import { MAX_PAGE, MIN_PAGE } from "../utils/config"


export default function BotonesPage({ pagina, handlePagesBefore, handlePagesNext }) {
    return (
        <div className="contenedor-botones-paginas">
            <button disabled={pagina === MIN_PAGE} onClick={handlePagesBefore} className="btn-pages">
                <img src="src/assets/left.png" alt="imagen del boton paginas anteriores" />
            </button>
            <button disabled={pagina === MAX_PAGE} onClick={handlePagesNext} className="btn-pages">
                <img src="src/assets/right.png" alt="imagen del boton paginas siguientes" />
            </button>
        </div>
    )
}