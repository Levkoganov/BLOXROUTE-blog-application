import { useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { fetchArticles } from "../../../redux/articlesSlice";

import SearchBar from "./SearchBar/Index";
import Article from "./Article/Index";
import CreateArticle from "./CreateArticle/Index";

function Home() {
  const article = useSelector((state: RootState) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    if (article.articles.length === 0) {
      dispatch(fetchArticles());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchBar />
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          display: "flex",
        }}
      >
        <CreateArticle />
        <Container style={{ paddingRight: "0", marginRight: "0" }}>
          <Article data={article} />
        </Container>
      </Container>
    </>
  );
}

export default Home;
