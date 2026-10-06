import { useReducer } from "react";/// is a react hook that makes state logic easiable ->if sttae  logic is more complex

const initialState = {
    bondName: "",
    issuerType: "PSU",
    trustee: ""
}; // intialze state value

function reducer(state, action) {  userReDucer we have state -Curent value, action -type ,dispatch -ask useReducer -that they are going to perform  action , useReducer -perform action

    if (action.type === "setBondName") { //if value we are geeting from input field is same as setBondName means
        return {
            ...state, // update only bondname remain field keeps there without chnaging
            bondName: action.value
        };
    }

    if (action.type === "setIssuerType") {
        return {
            ...state,
            issuerType: action.value
        };
    }

    if (action.type === "setTrustee") {
        return {
            ...state,
            trustee: action.value
        };
    }

    if (action.type === "clear") {
        return initialState;
    } //Clear value & delcare as empty

    return state;
}

function BondForm() {

    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    function handleSubmit(e) {

        e.preventDefault();

        console.log(state);
    }

    return (
        <div>

            <h2>Add Bond</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    value={state.bondName}// this value is input field value right 
                    onChange={(e) =>
                        dispatch({
                            type: "setBondName",
                            value: e.target.value
                        })
                    }//on change functuon ->triger value on input field we type -> dispatch perform what action need to perfom ->type is setBoond name  will compare with  if (action.type === "setBondName") & value ->User typing ->
                    placeholder="Bond Name"
                />

                <select
                    value={state.issuerType}
                    onChange={(e) =>
                        dispatch({
                            type: "setIssuerType",
                            value: e.target.value
                        })
                    }
                >
                    <option value="PSU">PSU</option>
                    <option value="Private">Private</option>
                </select>

                <input
                    type="text"
                    value={state.trustee}
                    onChange={(e) =>
                        dispatch({
                            type: "setTrustee",
                            value: e.target.value
                        })
                    }
                    placeholder="Trustee"
                />

                <button type="submit">
                    Save Bond
                </button>

                <button
                    type="button"
                    onClick={() => dispatch({ type: "clear" })}
                >
                    Clear
                </button>

            </form>

            <h3>Bond Name: {state.bondName}</h3> // print bond name we type in input field 
            <h3>Issuer Type: {state.issuerType}</h3>
            <h3>Trustee: {state.trustee}</h3>

        </div>
    );
}

export default BondForm;