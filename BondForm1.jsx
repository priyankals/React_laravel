import { useState } from "react"; //react hook  ->create new & intialze state value
//By using use State  -> we have to set eacch on eby one  

function BondForm() {

    const [bondName, setBondName] = useState("");//bondName- current state value // setbondName -Update/esisting bond vale // 
    const [issuerType, setIssuerType] = useState("PSU");
    const [trustee, setTrustee] = useState("");
    const [registrar, setRegistrar] = useState("");
    const [leadManager, setLeadManager] = useState("");
    const [natureOfSecurity, setNatureOfSecurity] = useState("");
    const [stockExchange, setStockExchange] = useState("BSE");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        const bondData = {
            bondName: bondName,  //store value  bondName(db value)
            issuerType: issuerType,
            trustee: trustee,
            registrar: registrar,
            leadManager: leadManager,
            natureOfSecurity: natureOfSecurity,
            stockExchange: stockExchange
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

            if (!response.ok) {
                throw new Error("Failed to save bond");
            }

            const data = await response.json();

            console.log(data);

            setMessage(data.message);

        } catch (error) {

            console.log("API Error:", error);

            setMessage("Something went wrong");

        } finally {

            setLoading(false);
        }
    }

    return (
        <div>

            <h2>Add Bond Details</h2>

            <form onSubmit={handleSubmit}>

                {/* Bond Name */}
                <div>
                    <label>Bond Name</label>

                    <input
                        type="text"
                        value={bondName}
                        onChange={(e) => setBondName(e.target.value)}
                        placeholder="Enter Bond Name"
                    />
                </div>

                {/* Nature of Security */}
                <div>
                    <label>Nature of Securities</label>

                    <input
                        type="text"
                        value={natureOfSecurity}
                        onChange={(e) =>
                            setNatureOfSecurity(e.target.value)
                        }
                    />
                </div>

                {/* Issuer Type */}
                <div>
                    <label>Issue Type</label>

                    <input
                        type="text"
                        value={issuerType}
                        readOnly
                    />
                </div>

                {/* Trustee */}
                <div>
                    <label>Trustee</label>

                    <input
                    
                        type="text"
                        value={trustee}
                        onChange={(e) => setTrustee(e.target.value)}
                    />
                </div>

                {/* Stock Exchange */}
                <div>
                    <label>Stock Exchange</label>

                    <select
                        value={stockExchange}
                        onChange={(e) =>
                            setStockExchange(e.target.value)
                        }
                    >
                        <option value="BSE">BSE</option>
                        <option value="NSE">NSE</option>
                    </select>
                </div>

                {/* Lead Manager */}
                <div>
                    <label>Lead Managers / Arrangers</label>

                    <input
                        type="text"
                        value={leadManager}
                        onChange={(e) =>
                            setLeadManager(e.target.value)
                        }
                    />
                </div>

                {/* Registrar */}
                <div>
                    <label>Register and Transfer Agent</label>

                    <input
                        type="text"
                        value={registrar}
                        onChange={(e) =>
                            setRegistrar(e.target.value)
                        }
                    />
                </div>

                <button type="submit" disabled={loading}>

                    {loading
                        ? "Saving..."
                        : "Save & Proceed"
                    }

                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

        </div>
    );
}

export default BondForm;