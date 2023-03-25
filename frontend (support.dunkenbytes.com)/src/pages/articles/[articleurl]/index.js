import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import ArticlesPage from "@/app/components/templates/articlesPage/ArticlesPage";
import baseURL from "@/app/constants/baseURL";

const Article = props => {
  return (
    <DefaultLayout>
      <ArticlesPage articleData={props.articleData} />
    </DefaultLayout>
  );
};

export default Article;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { articleurl: "0xa046091545e6daaa542e80e86fe7798a2e349da98628706e42ccd56259eca762" } }
    ],
    fallback: 'blocking' // false or 'blocking'
  };
}

export async function getStaticProps({params}) {
  const articleurl = params.articleurl;
  const config = {
    method: "GET",
    body: null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include"
  };
  try {
    const article = await fetch(
      `${baseURL}/article/article?url=${articleurl}`,
      config
    );
    const articleData = await article.json();
    return {
      props: {
        articleData
      },
      revalidate: 60
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        articleData: {}
      },
      revalidate: 60
    };
  }
}
