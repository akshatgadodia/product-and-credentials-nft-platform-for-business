import React, {useState, useEffect} from "react";
import styles from "./articlesPage.module.css";
import Head from "next/head";
import dynamic from "next/dynamic";
let EditorParser = dynamic(() => import("@/app/components/elements/EditorParser"), {
  ssr: false
});
const Article = (props) => {
  const [t, st] = useState(false);
  useEffect(()=>{
    st(true);
    console.log(props.articleData.data.article.title);
  console.log(props.articleData.data.article.content);
  },[])
  
  return (
    <div className={styles.supportArticle}>
      <Head>
        <title>Articles | Support Drunken Bytes</title>
      </Head>
      t && <EditorParser data={props.articleData.data.article.content}/>
      {/* <EditorParser data={data}/> */}

    </div>
  );
};

export default Article;
