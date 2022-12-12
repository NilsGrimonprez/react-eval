import React from "react";
import Link from "next/link";
import { Col, Row, Layout } from "antd";

function App() {
  return (
    <Layout>
      <Row justify="space-between" style={{ color: "black" }}>
        <Col>
          <Link href="/signup">S'inscrire</Link>
        </Col>
        <Col>
          <Link href="/login">Se connecter</Link>
        </Col>
      </Row>
      <Row>Bienvenue sur notre Jeu veuillez vous connecter !</Row>
    </Layout>
  );
}

export default App;
