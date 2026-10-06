import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditBond() {

    // Get ID from URL
    const { bondId } = useParams();

    // Navigation
    const navigate = useNavigate();


    // Form states
    const [bondName, setBondName] = useState("");
    const [issuerType, setIssuerType] = useState("PSU");
    const [trustee, setTrustee] = useState("");
    const [registrar, setRegistrar] = useState("");
    const [leadManager, setLeadManager] = useState("");
    const [natureOfSecurity, setNatureOfSecurity] = useState("");
    const [stockExchange, setStockExchange] = useState("BSE");


    // Loading states
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    // Get existing bond
    useEffect(() => {//intial render  &

        async function getBond() {

            try {

                const response =
                    await fetch(`/api/bonds/${bondId}`);

                const data = await response.json();


                // Put API values into state
                setBondName(data.bond_name);
                setIssuerType(data.issuer_type);
                setTrustee(data.trustee);
                setRegistrar(data.registrar);
                setLeadManager(data.lead_manager);
                setNatureOfSecurity(data.nat_of_sec);
                setStockExchange(data.stock_ex);


                setLoading(false);

            } catch (error) {

                console.log(error);

                setLoading(false);
            }
        }

        getBond();

    }, [bondId]);


    // Update bond
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


        setSaving(true);


        try {

            const response =
                await fetch(`/api/bonds/${bondId}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(bondData)
                });


            const data = await response.json();

            console.log(data);


            setSaving(false);


            // Go back to list
            navigate("/bonds");

        } catch (error) {

            console.log(error);

            setSaving(false);
        }
    }


    if (loading) {
        return <p>Loading bond...</p>;
    }


    return (
        <div>

            <h2>Edit Bond</h2>


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


                <br />


                <button
                    type="submit"
                    disabled={saving}
                >
                    {saving ? "Updating..." : "Update Bond"}
                </button>


                <button
                    type="button"
                    onClick={() => navigate("/bonds")}
                >
                    Cancel
                </button>

            </form>

        </div>
    );
}

export default EditBond;