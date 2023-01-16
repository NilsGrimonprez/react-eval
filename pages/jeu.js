import Jeu from "../components/Jeu";
import fetch from "node-fetch";

export default jeuPage = ({ data }) => {
    return <Jeu data={data} />;
};

export async function getStaticProps() {
    const data = await fetch("https://api.unsplash.com/photos/random?count=8");
    const cartes = await data.json();

    return {
        props: {
            data: cartes,
        },
    };
}
