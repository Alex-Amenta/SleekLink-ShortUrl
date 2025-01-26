import styles from "./loader.module.css";

interface LoaderProps {
  className?: string | null;
}

const Loader = ({ className = null }: LoaderProps) => {
  return (
    <>
      <div
        className={`${styles.spinner} ${styles.center} relative inline-block size-4 ${className}`}
      >
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
        <div className={styles.spinnerBlade}></div>
      </div>
    </>
  );
};

export default Loader;
