import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <div className={styles.LogoContainer}>
      <a href="#" className={styles.Logo}>
        Auth
      </a>
    </div>
  );
};
