import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Link from 'next/link';
import { doc, setDoc, getFirestore, serverTimestamp} from "firebase/firestore"

import firebase from "firebase/app";
import "firebase/auth";

import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Typography,
} from "antd";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";
import Router from "next/router";

const firebaseApp = initializeApp(firebaseConfig);

const SignUp = () => {
  const auth = getAuth(firebase);
  const db = getFirestore(firebaseApp);
  const [state, setState] = useState({});
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, state.email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        message.success("inscrit")
        await setDoc(doc(db, "users", user.uid), {... state, createdAt: serverTimestamp(),})
        setLoading(false);
        Router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.code , error.message);
        message.error("erreur")
        setLoading(false);
      });   

  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Content>
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            md={{ span: 12, offset: 6 }}
            lg={{ span: 8, offset: 8 }}
          >
            <Typography
              style={{
                borderRadius: 8,
                marginTop: "6vh",
                marginBottom: 64,
                textAlign: "center",
              }}
            >
              <Title level={1} style={{ fontSize: 32, marginBottom: 32 }}>
                Inscription
              </Title>

              <Form onFinish={handleSubmit} className="login-form">
              <Form.Item name="Votre Prénom" rules={[{ required: true }]}>
                  <Input
                    prefix={<UserOutlined />}
                    type="text"
                    size="large"
                    placeholder="Votre Prénom"
                    name="firstname"
                    onChange={(e) =>
                        setState ({...state, [e.target.name]: e.target.value})
                    }
                  />
                </Form.Item>
                <Form.Item name="Votre Nom" rules={[{ required: true }]}>
                  <Input
                    prefix={<UserOutlined />}
                    type="text"
                    size="large"
                    placeholder="Votre Nom"
                    name="lastname"
                    onChange={(e) =>
                        setState ({...state, [e.target.name]: e.target.value})
                    }
                  />
                </Form.Item>
                <Form.Item name="Votre Email" rules={[{ required: true }]}>
                  <Input
                    prefix={<MailOutlined />}
                    type="email"
                    size="large"
                    placeholder="Votre Email"
                    name="email"
                    onChange={(e) =>
                        setState ({...state, [e.target.name]: e.target.value})
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="Votre Mot de passe"
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={<LockOutlined />}
                    size="large"
                    type="password"
                    placeholder=" Votre Mot de passe"
                    onChange={onPasswordChange}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    {loading ? <LoadingOutlined /> : null}
                    Inscription
                  </Button>
                </Form.Item>
              </Form>
            </Typography>

            <Typography
              style={{
                textAlign: "center",
              }}
            >
              <Title level={4} style={{ fontWeight: 500, fontSize: 18 }}>
               Déjà un compte sur Recipes ?
              </Title>
              <Link href="/login">Connexion</Link>
            </Typography>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SignUp;
