import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { MdDelete } from "react-icons/md";

import styles from "../../styles/tasks.module.css";
import Header1 from "./components/header/header1";
import { FiShare2 } from "react-icons/fi";
import { db } from "./services/db";

interface userProps {
  user: {
    email: string;
  };
}

interface tasksProps {
  id: string;
  created: Date;
  Public: boolean;
  tarefa: string;
}

const Tasks = ({ user }: userProps) => {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [tasks, setTasks] = useState<tasksProps[]>([]);

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        created: new Date(),
        user: user.email,
        Public: checked
      });
    } catch (error) {
      console.log(error);
    }

    setInput("");
    setChecked(false);
  };

  useEffect(() => {
    const listTasks = async () => {
      let taskCollection = collection(db, "tarefas");

      const buscar = query(
        taskCollection,
        orderBy("created", "desc"),
        where("user", "==", user?.email)
      );

      onSnapshot(buscar, (snapshot) => {
        let list = [] as tasksProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            created: doc.data().created,
            tarefa: doc.data().tarefa,
            Public: doc.data().Public
          });
        });

        setTasks(list);
      });
    };

    listTasks();
  }, [user?.email]);

  return (
    <div className={styles.body}>
      <Header1 />

      <section className={styles.container}>
        <div className={styles.content}>
          <h2>Qual sua tarefa?</h2>

          <textarea
            placeholder="Digite sua tarefa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <form onSubmit={handleSubmit}>
            <div className={styles.input}>
              <input
                type="checkbox"
                name="public"
                checked={checked}
                onChange={handleChecked}
              />
              <p>Deixar tarefa publica</p>
            </div>

            <button>Registrar</button>
          </form>
        </div>
      </section>

      <section className={styles.content_tasks}>
        <div className={styles.tasks}>
          <h2>Minhas Tarefas</h2>

          {tasks.map((item) => (
            <>
              <div className={styles.text} key={item.id}>
                <div>
                  {item.Public && (
                    <span>
                      {item.Public}
                      publico
                      <i>
                        <FiShare2 />
                      </i>
                    </span>
                  )}
                </div>
                <p>{item.tarefa}</p>
                <i>
                  {" "}
                  <MdDelete size={24} />
                </i>
              </div>
            </>
          ))}
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
    props: {
      user: {
        email: session.user.email
      }
    }
  };
};

export default Tasks;
