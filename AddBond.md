import { useState } from "react";

function BondForm() {

    const [bondName, setBondName] = useState("");
    const [issuerType, setIssuerType] = useState("PSU");
    const [trustee, setTrustee] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        const response = await fetch("/api/bonds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bondName: bondName,
                issuerType: issuerType,
                trustee: trustee
            })
        });

        const data = await response.json();

        setLoading(false);
        setMessage(data.message);
    }

    return (
        <div>

            <h2>Add Bond</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    value={bondName}
                    onChange={(e) => setBondName(e.target.value)}
                    placeholder="Bond Name"
                />

                <select
                    value={issuerType}
                    onChange={(e) => setIssuerType(e.target.value)}
                >
                    <option value="PSU">PSU</option>
                    <option value="Private">Private</option>
                </select>

                <input
                    type="text"
                    value={trustee}
                    onChange={(e) => setTrustee(e.target.value)}
                    placeholder="Trustee"
                />

                <button type="submit">
                    Save Bond
                </button>

            </form>

            {loading && <p>Saving...</p>}

            {message && <p>{message}</p>}

        </div>
    );
}

export default BondForm;