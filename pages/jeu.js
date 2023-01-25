import Jeu from "../components/Jeu";
import fetch from "node-fetch";

const jeuPage = ({ data }) => {
    return <Jeu data={data} />;
};

export async function getStaticProps() {
    const data = await fetch("https://picsum.photos/v2/list");
    const liste = await data.json();

    let cartes = [];
    for (let index = 0; index < 8; index++) {
        cartes.push({ url: liste[index].download_url, flipped: false });
        cartes.push({ url: liste[index].download_url, flipped: false });
    }
    //cartes.sort(() => Math.random() - 0.5);

    return {
        props: {
            data: cartes,
        },
    };
}

export default jeuPage;
