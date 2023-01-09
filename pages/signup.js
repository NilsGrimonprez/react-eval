import Head from "next/head";
import { Layout } from "antd";
import SignUp from '../components/Session/Singup';

export default function SignUpPage(){
    return (
        <Layout>
            <Head>
                <title>Inscription</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <SignUp/>
        </Layout>
    );
}