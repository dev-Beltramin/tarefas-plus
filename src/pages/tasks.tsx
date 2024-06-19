import { MdDelete } from "react-icons/md";

import styles from "../../styles/tasks.module.css";
import Header2 from "./components/header/header2";

const Tasks = () => {
  return (
    <div>
      <Header2 />

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

          <div>
            <span className={styles.delete}>
              <i>
                {" "}
                <MdDelete />
              </i>
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad
              magni exercitationem, architecto quas deserunt ducimus vitae a
              mollitia eveniet, sint, provident nesciunt quaerat eos obcaecati
              dolores nobis ipsa iusto.
            </p>
          </div>

          <div>
            <span className={styles.delete}>
              <i>
                {" "}
                <MdDelete />
              </i>
            </span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ad
              magni exercitationem, architecto quas deserunt ducimus vitae a
              mollitia eveniet, sint, provident nesciunt quaerat eos obcaecati
              dolores nobis ipsa iusto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
