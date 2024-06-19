import Image from "next/image";
import HeaderOne from "./components/header/header1";
import logo from "./components/images/logo-home.svg";

import styles from "../../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <HeaderOne />

      <section className={styles.container}>
        <div className={styles.content}>
          <Image src={logo} width={579} height={353} />
          <p>Sistema feito para você organizar seus estudos e terefas</p>

          <div className={styles.button}>
            <button>+ 7 Mil Post</button>
            <button>+ 100 Mil comentarios</button>
          </div>
        </div>
      </section>
    </>
  );
}
