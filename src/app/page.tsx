import Logo from "/public/asset/logo.svg";
import styles from "./page.module.css";
import SearchBox from "./_component/SearchBox";
import SearchResult from "./SearchResult";

export default function Home() {
  return ( 
    <section className={styles.outerSection}>
      <section className={styles.innerSection}>
        <section className={styles.titleSection}>
          <Logo className={styles.logoSVG}></Logo>
          <div className={styles.logoText}>
            <span>국</span>
            <span>회</span>
            <span>의 </span>
            <span>발</span>
            <span>자</span>
            <span>국</span>
          </div>
        </section>
        <SearchBox alwaysMenuFixed={true}/>
        <SearchResult />
      </section>
    </section>
  );
}
