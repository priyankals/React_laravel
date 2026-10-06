import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BondForm() {

    const [bondName, setBondName] = useState("");
    const [issuerType, setIssuerType] = useState("PSU");
    const [trustee, setTrustee] = useState("");
    const [registrar, setRegistrar] = useState("");
    const [leadManager, setLeadManager] = useState("");
    const [natureOfSecurity, setNatureOfSecurity] = useState("");
    const [stockExchange, setStockExchange] = useState("BSE");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    async function handleSubmit(e) {

        e.preventDefault();

        const bondData = {
            bond_name: bondName,
            issuer_type: issuerType,
            trustee: trustee,
            registrar: registrar,
            lead_manager: leadManager,
            nat_of_sec: natureOfSecurity,
            stock_ex: stockExchange
        };

        setLoading(true);
        setMessage("");

        try {

            const response = await fetch("/api/bonds", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(bondData)
            });

            const data = await response.json();

            console.log(data);

            setMessage("Bond created successfully");

            setLoading(false);

            navigate("/bonds");

        } catch (error) {

            console.log(error);

            setMessage("Something went wrong");

            setLoading(false);
        }
    }


    return (
        <div>

            <h2>Add Bond</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Bond Name</label>

                    <input
                        type="text"
                        value={bondName}
                        onChange={(e) =>
                            setBondName(e.target.value)
                        }
                    />
                </div>


                <div>
                    <label>Issuer Type</label>

                    <input
                        type="text"
                        value={issuerType}
                        onChange={(e) =>
                            setIssuerType(e.target.value)
                        }
                    />
                </div>


                <div>
                    <label>Trustee</label>

                    <input
                        type="text"
                        value={trustee}
                        onChange={(e) =>
                            setTrustee(e.target.value)
                        }
                    />
                </div>


                <div>
                    <label>Registrar</label>

                    <input
                        type="text"
                        value={registrar}
                        onChange={(e) =>
                            setRegistrar(e.target.value)
                        }
                    />
                </div>


                <div>
                    <label>Lead Manager</label>

                    <input
                        type="text"
                        value={leadManager}
                        onChange={(e) =>
                            setLeadManager(e.target.value)
                        }
                    />
                </div>


                <div>
                    <label>Nature of Security</label>

                    <input
                        type="text"
                        value={natureOfSecurity}
                        onChange={(e) =>
                            setNatureOfSecurity(e.target.value)
                        }
                    />
                </div>


                <div>
                    <label>Stock Exchange</label>

                    <input
                        type="text"
                        value={stockExchange}
                        onChange={(e) =>
                            setStockExchange(e.target.value)
                        }
                    />
                </div>


                <button type="submit" disabled={loading}>

                    {loading ? "Saving..." : "Add Bond"}

                </button>

            </form>

            <br />

            <button onClick={() => navigate("/bonds")}>
                Go to Bond List
            </button>

            <p>{message}</p>

        </div>
    );
}

export default BondForm;