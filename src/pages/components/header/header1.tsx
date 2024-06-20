import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../../../styles/header1.module.css";
import Link from "next/link";

const Header2 = () => {
  const { data: session, status } = useSession();

  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <div className={styles.content}>
          <p>
            <Link href={"/"}>
              Tarefas <span>+</span>
            </Link>
          </p>

          {session?.user ? (
            <button type="button">
              <Link href={"/tasks"}>Meu painel</Link>
            </button>
          ) : (
            <></>
          )}
        </div>

        {status === "loading" ? (
          <>
            <h4>Aguarde...</h4>
          </>
        ) : session ? (
          <button onClick={() => signOut()}>Olá, {session.user?.name}</button>
        ) : (
          <button onClick={() => signIn("google")}>minha conta</button>
        )}
      </div>
    </header>
  );
};

export default Header2;
