import { MdDelete } from "react-icons/md";

import styles from "../../styles/tasks.module.css";
import Header1 from "./components/header/header1";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { FiShare2 } from "react-icons/fi";

const Tasks = () => {
  return (
    <div className={styles.body}>
      <Header1 />

      <section className={styles.container}>
        <div className={styles.content}>
          <h2>Qual sua tarefa?</h2>

          <textarea placeholder="Digite sua tarefa" />
          <div className={styles.input}>
            <input type="checkbox" name="public" />
            <p>Deixar tarefa publica</p>
          </div>

          <button>Registrar</button>
        </div>
      </section>

      <section className={styles.content_tasks}>
        <div className={styles.tasks}>
          <h2>Minhas Tarefas</h2>

          <div className={styles.text}>
            <div>
              <span>
                publico
                <i>
                  <FiShare2 />
                </i>
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad
              magni exercitationem, architecto quas deserunt ducimus vitae a
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad
              magni exercitationem, architecto quas deserunt ducimus vitae a
            </p>
            <i>
              {" "}
              <MdDelete size={24} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default Tasks;
