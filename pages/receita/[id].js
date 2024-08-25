import fs from 'fs';
import path from 'path';
import styles from "../../styles/detalhe.module.css";

export async function getStaticPaths() {
    const receitasPath = path.resolve('.', 'data', 'receitas.json');
    const receitas = JSON.parse(fs.readFileSync(receitasPath, 'utf8'));

    const paths = receitas.map((receita) => ({
        params: { id: receita.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const receitasPath = path.resolve('.', 'data', 'receitas.json');
    const receitas = JSON.parse(fs.readFileSync(receitasPath, 'utf8'));

    const receita = receitas.find((r) => r.id === params.id);

    return { props: { receita } };
}

export default function Detalhes({ receita }) {
    if (!receita) {
        return <h1>Receita não encontrada</h1>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{receita.titulo}</h1>
            <img className={styles.image} src={receita.imagem} alt={receita.titulo} />
            <h3>Ingredientes:</h3>
            <ul className={styles.ingredients}>
                {receita.ingredientes.map((ingrediente, index) => (
                    <li key={index}>{ingrediente}</li>
                ))}
            </ul>
            <h3>Modo de Preparo:</h3>
            <p className={styles.preparation}>{receita.modoPreparo}</p>
            <div className={styles.timeinfo}>
                <p>Tempo de Preparo: {receita.tempoPreparo} minutos</p>
                <p>Tempo de Cozimento: {receita.tempoCozimento} minutos</p>
            </div>
        </div>
    );
}
