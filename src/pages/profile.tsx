import styles from "../../styles/profile.module.css";
import Header1 from "./components/header/header1";

const Profile = () => {
  return (
    <div className={styles.body}>
      <Header1 />

      <section className={styles.container}>
        <div className={styles.content}>
          <textarea placeholder="teste 123" />

          <div className={styles.content_inputs}>
            <label>Deixar comentario</label>
            <textarea placeholder="Escreva seu comentario" />

            <button>Enviar comentario</button>
          </div>
        </div>
      </section>

      <section className={styles.coments}>
        <p>Todos os comentarios</p>

        <div>
          <div className={styles.coments_users}>
            <p>Lucas silva</p>
            Precisamos ajustar a interface do projeto.
          </div>

          <div className={styles.coments_users}>
            <p>Lucas silva</p>
            Precisamos ajustar a interface do projeto.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
