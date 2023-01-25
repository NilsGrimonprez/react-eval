import React from "react";
import { Row, Col, Layout } from "antd";
import Link from "next/link";

const Navbar = () => {
    const { Header } = Layout;
    return (
        <Header>
            <Row justify="space-between" style={{ color: "white" }}>
                <Col>
                    <Link href="/jeu">Memory</Link>
                </Col>
            </Row>
        </Header>
    );
};

export default Navbar;
