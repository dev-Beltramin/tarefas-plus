
import styles from '../../../../styles/header1.module.css'



const HeaderOne = () => {
  return (
    <header className={styles.container}>

        <div className={styles.content}>
            <p>
                Tarefas <span>+</span>
            </p>

            <button>
                minha conta 
            </button>
        </div>

    </header>
  )
}

export default HeaderOne