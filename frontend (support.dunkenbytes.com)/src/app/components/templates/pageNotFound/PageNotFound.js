import React from "react";
import styles from "./pageNotFound.module.css";
import { useRouter } from "next/router";
import Head from "next/head";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <div className={styles.pageNotFound}>
      <Head>
        <title>Page Not Found | Support Drunken Bytes</title>
      </Head>
      <div class={`${styles.container} ${styles.containerStar}`}>
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star1} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
        <div class={styles.star2} />
      </div>
      <div class={`${styles.container} ${styles.containerBird}`}>
        <div class={`${styles.bird} ${styles.birdAnim}`}>
          <div class={`${styles.birdContainer}`}>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingLeftTop}`} />
            </div>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingRightTop}`} />
            </div>
          </div>
        </div>
        <div class={`${styles.bird} ${styles.birdAnim}`}>
          <div class={`${styles.birdContainer}`}>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingLeftTop}`} />
            </div>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingRightTop}`} />
            </div>
          </div>
        </div>
        <div class={`${styles.bird} ${styles.birdAnim}`}>
          <div class={`${styles.birdContainer}`}>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingLeftTop}`} />
            </div>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingRightTop}`} />
            </div>
          </div>
        </div>
        <div class={`${styles.bird} ${styles.birdAnim}`}>
          <div class={`${styles.birdContainer}`}>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingLeftTop}`} />
            </div>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingRightTop}`} />
            </div>
          </div>
        </div>
        <div class={`${styles.bird} ${styles.birdAnim}`}>
          <div class={`${styles.birdContainer}`}>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingLeftTop}`} />
            </div>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingRightTop}`} />
            </div>
          </div>
        </div>
        <div class={`${styles.bird} ${styles.birdAnim}`}>
          <div class={`${styles.birdContainer}`}>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingLeftTop}`} />
            </div>
            <div class={`${styles.wing} ${styles.wingLeft}`}>
              <div class={`${styles.wingRightTop}`} />
            </div>
          </div>
        </div>
        <div class={styles.containerTitle}>
          <div class={styles.title}>
            <div class={styles.number}>4</div>
            <div class={styles.moon}>
              <div class={styles.face}>
                <div class={styles.mouth} />
                <div class={styles.eyes}>
                  <div class={styles.eyeLeft} />
                  <div class={styles.eyeRight} />
                </div>
              </div>
            </div>
            <div class={styles.number}>4</div>
          </div>
          <div class={styles.subtitle}>
            Oops. Looks like you took a wrong turn.
          </div>
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            GO TO HOME
          </button>
          <button
            onClick={() => {
              router.back();
            }}
          >
            PREVIOUS PAGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
