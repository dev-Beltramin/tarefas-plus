import Head from "next/head";
import { getDocs, collection } from "firebase/firestore";

import { db } from "./services/db";
import Image from "next/image";
import HeaderOne from "./components/header/header1";
import logo from "./components/images/logo-home.svg";

import styles from "../../styles/Home.module.css";
import { GetStaticProps } from "next";

type homeProps = {
  propsPost: number;
  propsComents: number;
};

export default function Home({ propsComents, propsPost }: homeProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HeaderOne />

      <section className={styles.container}>
        <div className={styles.content}>
          <Image src={logo} width={579} alt="logo do site" />
          <p>Sistema feito para você organizar seus estudos e terefas</p>

          <div className={styles.button}>
            <button>{propsPost} Posts</button>
            <button>{propsComents} comentarios</button>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postRef = collection(db, "tarefas");
  const comentsRef = collection(db, "coments");

  const postSnap = await getDocs(postRef);
  const comentsSnap = await getDocs(comentsRef);

  return {
    props: {
      propsComents: comentsSnap.size || 0,
      propsPost: postSnap.size || 0
    },
    revalidate: 60
  };
};
