import styles from "../../../../styles/header2.module.css";
const Header2 = () => {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <div className={styles.content}>
          <p>
            Tarefas <span>+</span>
          </p>

          <button>Meu painel</button>
        </div>

        <button>Olá , paulo</button>
      </div>
    </header>
  );
};

export default Header2;
