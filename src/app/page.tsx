import Logo from "/public/asset/logo.svg";
import styles from "./page.module.css";

export default function Home() {
  return ( 
    <section className={styles.outerSection}>
      <section className={styles.innerSection}>
        <section className={styles.titleSection}>
          <Logo></Logo>
          <div className={styles.logoText}>
            <span>국</span>
            <span>회</span>
            <span>의</span>
            <span>발</span>
            <span>자</span>
            <span>국</span>
          </div>
          <section className={styles.SearchSection}>
            <div className={styles.searchBoxWrapper}>
              <input className={styles.searchBox} type="search"></input>
              
            </div>
            <div className={styles.filterOpenBT}></div>
            <div className={styles.filterSelectBox}>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
