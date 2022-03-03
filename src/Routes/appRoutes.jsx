import { Routes, Route, BrowserRouter } from "react-router-dom";
import Produto from "../Pages/Produto";
import Finalizacao from "../Pages/Finalizacao";


const appRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='produto' element={<Produto />} />
                <Route path='finalizacao' element={<Finalizacao />} />
            </Routes>
        </BrowserRouter>
    );
};

export default appRoutes;