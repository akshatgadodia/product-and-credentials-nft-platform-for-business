import React from 'react'
import styles from "../stylesheets/articleCard.module.css";

const ArticleCard = () => {
    return (
        <div className={styles.articleCard}>
            <div className={styles.icon}>ICON</div>
            <h4 className={styles.heading}>HEADINg</h4>
            <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita numquam libero hic molestias porro nobis neque eius 
            blanditiis, soluta a non consequatur corrupti quisquam obcaecati in nam? Harum, quis optio.</p>
        </div>
    )
}

export default ArticleCard