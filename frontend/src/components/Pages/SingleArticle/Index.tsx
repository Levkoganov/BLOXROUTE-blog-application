import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Container } from "@mui/material";
import moment from "moment";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../../redux/articlesSlice";
import { useEffect } from "react";

function SingleArticle() {
  const { article, isLoading } = useSelector(
    (state: RootState) => state.article
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  const articleData = (
    <div key={article?.id} className="div-article">
      <p style={{ paddingTop: "10px" }}>
        {moment(article?.date).format("LLL")}
      </p>
      <h5>{article?.title}</h5>
      <p>{article?.body}</p>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <h1 style={{ textAlign: "center" }}>loading...</h1>
      ) : (
        <div>
          {article?.id ? (
            <>
              <h1 style={{ textAlign: "center" }}>
                Article Number:{article?.id}
              </h1>
              <Container
                sx={{
                  mt: 2,
                }}
              >
                {articleData}
              </Container>
            </>
          ) : (
            <h1 style={{ textAlign: "center" }}>
              Article not found...{article?.id}
            </h1>
          )}
        </div>
      )}
    </>
  );
}

export default SingleArticle;
