import React, { useState } from "react";

const Carte = ({ carte }) => {
    const [flipped, setFlipped] = useState(carte.flipped);

    return flipped ? (
        <img src={url} onClick={() => setFlipped(!flipped)} />
    ) : (
        <p>???</p>
    );
};

export default Carte;
