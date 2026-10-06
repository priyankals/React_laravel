import { BrowserRouter, Routes, Route } from "react-router-dom";

import BondList from "./BondList";
import BondForm from "./BondForm";
import EditBond from "./EditBond";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Bond List */}
                <Route
                    path="/bonds"
                    element={<BondList />}
                />

                {/* Add Bond */}
                <Route
                    path="/bonds/add"
                    element={<BondForm />}
                />

                {/* Edit Bond */}
                <Route
                    path="/bonds/edit/:bondId"
                    element={<EditBond />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;