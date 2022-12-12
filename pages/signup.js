import Head from "next/head";
import { Layout } from "antd";
import SignUp from '../components/Session/SignUp';

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