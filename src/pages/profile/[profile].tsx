import { GetServerSideProps } from "next";

import styles from "../../../styles/profile.module.css";
import Header1 from "../components/header/header1";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { db } from "../services/db";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";

interface DetailProps {
  item: {
    id: string;
    created: string;
    Public: boolean;
    tarefa: string;
    user: string;
  };
  coments: comentsProps[];
}

interface comentsProps {
  id: string;
  user: string;
  email: string;
  created: Date;
  coments: string;
}

const Profile = ({ item, coments }: DetailProps) => {
  const [input, setInput] = useState("");
  const [comentario, setComentario] = useState<comentsProps[]>(coments || []);

  const { data: session } = useSession();

  const handleComments = async (e: FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) return;

    if (!session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "coments"), {
        coments: input,
        created: new Date().toLocaleDateString(),
        user: session?.user?.name,
        email: session.user?.email,
        taskId: item?.id
      });

      const data = {
        taskId: docRef.id,
        user: session?.user.name,
        coments: input
      };
      setComentario((item) => [...item, data]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComents = async (id: string) => {
    try {
      const docRef = doc(db, "coments", id);
      const deleteComent = comentario.filter((item) => item.id !== id);
      setComentario(deleteComent);
      await deleteDoc(docRef);
      alert("deletado com sucesso ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Detalhes</title>
      </Head>
      <div className={styles.body}>
        <Header1 />

        <section className={styles.container}>
          <div className={styles.content}>
            <textarea>{item?.tarefa}</textarea>

            <form onSubmit={handleComments}>
              <div className={styles.content_inputs}>
                <label>Deixar comentario</label>
                <textarea
                  placeholder="Escreva seu comentario"
                  value={input}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setInput(e.target.value)
                  }
                />

                {session?.user ? (
                  <button type="submit">Enviar comentario</button>
                ) : (
                  <button disabled>Desconectado</button>
                )}
              </div>
            </form>
          </div>
        </section>

        <section className={styles.coments}>
          <p>Todos os comentarios</p>

          {coments.length === 0 && <span>Sem comentarios</span>}
          {comentario.map((doc) => (
            <div className={styles.coments_users} key={doc.id}>
              <p>{doc.user}</p>

              <div className={styles.coments_delete}>
                {doc.coments}

                {session?.user?.email && (
                  <button onClick={() => handleDeleteComents(doc.id)}>
                    excluir
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.profile as string;

  const docRef = doc(db, "tarefas", id);

  const q = query(collection(db, "coments"), where("taskId", "==", id));

  const snapComents = await getDocs(q);

  let coments: comentsProps[] = [];

  snapComents.forEach((item) => {
    coments.push({
      id: item.id,
      user: item.data().user,
      email: item.data().email,
      created: item.data().created,
      coments: item.data().coments
    });
  });

  const snapshot = await getDoc(docRef);

  if (!snapshot.data()?.Public) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  const task = {
    id: snapshot.id,
    created: new Date().toLocaleDateString(),
    tarefa: snapshot.data()?.tarefa,
    Public: snapshot.data()?.Public,
    user: snapshot.data()?.user
  };

  return {
    props: {
      item: task,
      coments: coments
    }
  };
};

export default Profile;
