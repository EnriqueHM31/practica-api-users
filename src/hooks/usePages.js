import { useState } from "react";
import { MIN_PAGE, MAX_PAGE } from "../utils/config";

export const usePages = () => {
    const [pagina, setPagina] = useState(MIN_PAGE);

    const handlePagesNext = () => {
        setPagina(prevState => {
            const newPage = prevState >= MAX_PAGE ? MAX_PAGE : prevState + 1;
            return newPage;
        });
    }

    const handlePagesBefore = () => {
        setPagina(prevState => {
            const newPage = prevState === MIN_PAGE ? MIN_PAGE : prevState - 1;
            return newPage;
        });
    }

    return { pagina, handlePagesNext, handlePagesBefore };

}