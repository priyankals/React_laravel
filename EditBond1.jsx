import { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom"; // useNavigate for rediresction puropse -> from one rout to another route in web application
//seParams: Commonly used foe like edit,list to fetch corresponding id to fetch 

function BondEdit() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [bondName, setBondName] = useState("");
    const [issuerType, setIssuerType] = useState("");
    const [trustee, setTrustee] = useState("");

    useEffect(() => {

        async function getBond() {

            const response = await fetch(`/api/bonds/${id}`);

            const data = await response.json();

            setBondName(data.bondName);//keep alreasdy display vvlaue in input field to view if in need to chaneg & update
            setIssuerType(data.issuerType);
            setTrustee(data.trustee);
        }

        getBond();

    }, [id]);//based on id we are getting from     const { id } = useParams(); fetch details & call getBonds

    async function handleSubmit(e) {

        e.preventDefault();

        await fetch(`/api/bonds/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                bondName: bondName,
                issuerType: issuerType,
                trustee: trustee
            })
        });

        navigate("/bonds");  after all update happen navigate to bond list ->redirection
    }

    return (
        <div>

            <h2>Edit Bond</h2>

            <form onSubmit={handleSubmit}>

                <input
                    value={bondName}//came from controller right 
                    onChange={(e) => setBondName(e.target.value)}
                />

                <select
                    value={issuerType}
                    onChange={(e) => setIssuerType(e.target.value)}
                >
                    <option value="PSU">PSU</option>
                    <option value="Private">Private</option>
                </select>

                <input
                    value={trustee}
                    onChange={(e) => setTrustee(e.target.value)}
                />

                <button type="submit">
                    Update Bond
                </button>

            </form>

        </div>
    );
}

export default BondEdit;