import React, { useState } from "react";

function Configuration() {
    const [panelOpen, setPanelOpen] = useState(false);

    // add a button to open the configuration page
    const Button = () => {
        return (
            <button
                onClick={() => { setPanelOpen(!panelOpen) }}
            >
                Config
            </button>
        );
    };

    return (
        <>
            <Button />
            {panelOpen && (
                <div className="panel">
                    <div className="close" onClick={() => { setPanelOpen(!panelOpen) }}>X</div>

                    <h1>Configuration</h1>
                    <p>Some configuration options</p>

                </div>
            )}

        </>

    );

}

export default Configuration;
