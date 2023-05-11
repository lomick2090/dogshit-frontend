import { useState } from 'react';

export default function NameChange() {
    const [input, setInput]= useState()

    function handleChange(e) {
        const { value } = e.target
        setInput(value)
    }

    return (
        <div className="namechange">
            <h1>Add Name To Coin:</h1>

            <input type="text" value={input} onChange={(e) => handleChange(e)}/>

            <button>Submit Name</button>

        </div>
    )
}