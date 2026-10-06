import { useEffect, useState } from "react";

function BondList() {

    const [bonds, setBonds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getBonds() {

            const response = await fetch("/api/bonds");

            const data = await response.json();

            setBonds(data);

            setLoading(false);
        }

        getBonds();

    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>

            <h2>Bond List</h2>

            {bonds.map((bond) => (

                <div key={bond.id}>

                    <h3>{bond.bondName}</h3>

                    <p>{bond.issuerType}</p>

                    <p>{bond.trustee}</p>

                </div>

            ))}

        </div>
    );
}

export default BondList;