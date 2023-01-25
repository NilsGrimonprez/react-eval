import React from "react";
import { Col, Row, Layout, Button } from "antd";
import Navbar from "./Navbar";

function App() {
    return (
        <Layout>
            <Navbar />
            <div style={{ color: "black", textAlign: "center", margin: 20 }}>
                Bienvenue sur notre Jeu veuillez vous connecter !
                <Button href="/signup">S'inscrire</Button>
                <Button href="/login">Se connecter</Button>
            </div>
        </Layout>
    );
}

export default App;
