import { GetServerSideProps } from "next";

import styles from "../../../styles/profile.module.css";
import Header1 from "../components/header/header1";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/db";

interface DetailProps {
  item: {
    id: string;
    created: string;
    Public: boolean;
    tarefa: string;
    user: string;
  };
}

const Profile = ({ item }: DetailProps) => {
  return (
    <div className={styles.body}>
      <Header1 />

      <section className={styles.container}>
        <div className={styles.content}>
          <textarea>{item?.tarefa}</textarea>

          <div className={styles.content_inputs}>
            <label>Deixar comentario</label>
            <textarea placeholder="Escreva seu comentario" />

            {item?.user && <button>Enviar comentario</button>}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.profile as string;

  const docRef = doc(db, "tarefas", id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.data()?.Public) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const miliSeconds = snapshot.data()?.created?.seconds * 1000;

  const task = {
    id: snapshot.id,
    created: new Date(miliSeconds).toLocaleDateString(),
    tarefa: snapshot.data()?.tarefa,
    Public: snapshot.data()?.Public,
    user: snapshot.data()?.user
  };

  console.log(task);

  return {
    props: {
      item: task
    }
  };
};

export default Profile;
