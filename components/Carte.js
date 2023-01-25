import React, { useState } from "react";

const Carte = ({ carte }) => {
    const [flipped, setFlipped] = useState(carte.flipped);
    return flipped ? (
        <div>
            <img
                src={carte.url}
                width="200"
                onClick={() => setFlipped(!flipped)}
            />
        </div>
    ) : (
        <div
            style={{ background: "white", width: 200, height: 134, margin: 2 }}
            onClick={() => setFlipped(!flipped)}
        ></div>
    );
};

export default Carte;
