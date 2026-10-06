import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BondList() {

    const [bonds, setBonds] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    // Get all bonds
    useEffect(() => {

        async function getBonds() {

            try {

                const response = await fetch("/api/bonds");

                const data = await response.json();

                setBonds(data);

                setLoading(false);

            } catch (error) {

                console.log(error);

                setLoading(false);
            }
        }

        getBonds();

    }, []);


    // Delete bond
    async function deleteBond(bondId) {

        const confirmDelete =
            window.confirm("Are you sure you want to delete this bond?");

        if (!confirmDelete) {
            return;
        }


        try {

            const response = await fetch(
                `/api/bonds/${bondId}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            console.log(data);


            // Remove deleted bond from screen
            setBonds(
                bonds.filter((bond) => bond.id !== bondId)
            );

        } catch (error) {

            console.log(error);

        }
    }


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <h2>Bond List</h2>


            <button onClick={() => navigate("/bonds/add")}>
                Add Bond
            </button>


            <br />
            <br />


            {bonds.length > 0 ? (

                bonds.map((bond) => (

                    <div key={bond.id}>

                        <strong>
                            {bond.bond_name}
                        </strong>


                        <button
                            onClick={() =>
                                navigate(`/bonds/edit/${bond.id}`)
                            }
                        >
                            Edit
                        </button>


                        <button
                            onClick={() =>
                                deleteBond(bond.id)
                            }
                        >
                            Delete
                        </button>


                        <hr />

                    </div>

                ))

            ) : (

                <p>No bonds found</p>

            )}

        </div>
    );
}

export default BondList;