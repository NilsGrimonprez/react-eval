import { useState, useEffect } from "react";
import Carte from "./Carte";
import { Layout } from "antd";
import Navbar from "./Navbar";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, arrayUnion, setDoc } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import Router from "next/router";

const firebaseApp = initializeApp(firebaseConfig);

const Jeu = ({ data }) => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    const [playing, setPlaying] = useState(true);

    const [score, setScore] = useState(0);

    const [firstCard, setFirstCard] = useState(null);

    const [cartes, setCartes] = useState([]);
    const [decouvertes, setDecouvertes] = useState([]);

    const [finished, setFinished] = useState(false);

    const [uid, setUid] = useState();

    const handleCardClick = (carte) => {
        if (playing) {
            if (firstCard === null) {
                setFirstCard(carte);
            } else {
                checkMatch(firstCard, carte);
                setFirstCard(null);
            }
        } else {
            if (firstCard === null) {
                setFirstCard(carte);
            } else {
                setFirstCard(null);
                setPlaying(true);
            }
        }
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUid(user.uid);
        } else {
            Router.push("/login");
        }
    });

    const checkMatch = async (firstCard, secondCard) => {
        if (firstCard.url == secondCard.url) {
            setScore(score + 5);
            setDecouvertes([...decouvertes, firstCard, secondCard]);
        } else {
            setScore(score - 1);
            setPlaying(false);
            setJoueurCourant(!joueurCourant);
        }
    };

    useEffect(() => {
        const saveScore = async () => {
            await setDoc(
                doc(db, "users", uid),
                {
                    scores: arrayUnion(String(score)),
                },
                { merge: true }
            );
        };
        if (decouvertes.length === 16) {
            saveScore();
            setFinished(true);
        }
    }, [decouvertes]);

    useEffect(() => {
        if (data?.length > 0) {
            setCartes(data);
        } else {
            console.log("Error : no data");
        }
    }, [data]);

    useEffect(() => {
        if (finished) {
            alert("Votre score est " + score);
        }
    }, [finished]);

    return (
        <Layout>
            <Navbar />
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: 850,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                {cartes.map((carte) => (
                    <div onClick={() => handleCardClick(carte)}>
                        <Carte carte={carte} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Jeu;
