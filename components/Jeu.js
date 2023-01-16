import { useState, useEffect } from "react";
import Carte from "./Carte/Carte";

const Jeu = ({ data }) => {
    // true est le J1 et false le J2
    const [joueurCourant, setJoueurCourant] = useState(true);

    const [scoreJ1, setScoreJ1] = useState(0);
    const [scoreJ2, setScoreJ2] = useState(0);

    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);

    const [decouvertes, setDecouvertes] = useState([]);

    const [cartes, setCartes] = useState();

    handleCardClick = (carte) => {
        if (firstCard === null) {
            setFirstCard(carte);
        } else {
            setSecondCard(carte);
            checkMatch();
        }
    };

    checkMatch = () => {
        if (firstCard === secondCard) {
            if (joueurCourant) {
                setScoreJ1(scoreJ1 + 1);
            } else {
                setScoreJ2(scoreJ2 + 1);
            }
            setJoueurCourant(!joueurCourant);
            setDecouvertes([...decouvertes, firstCard, secondCard]);
        } else {
            setJoueurCourant(!joueurCourant);
        }
    };

    useEffect(() => {
        data.map((carte) => {
            if (decouvertes.includes(carte)) {
                setCartes((cartes) => [
                    ...cartes,
                    {
                        ...carte,
                        flipped: true,
                    },
                ]);
            } else {
                setCartes((cartes) => [
                    ...cartes,
                    {
                        ...carte,
                        flipped: false,
                    },
                ]);
            }
        });
    }, [decouvertes]);

    return (
        <div>
            {cartes.map((carte) => {
                <Carte carte={carte} onClick={() => handleCardClick(carte)} />;
            })}
        </div>
    );
};

export default Jeu;
