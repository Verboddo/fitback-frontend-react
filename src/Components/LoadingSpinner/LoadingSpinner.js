import styles from "./LoadingSpinner.module.css"

function LoadingSpinner({ className }) {
    return(
        <div className={className}>
            <div className={styles.loading}></div>
        </div>

    )
}

export default LoadingSpinner