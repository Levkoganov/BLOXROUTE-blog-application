import moment from "moment";

import "./style.css";
import Pagination from "./Pagination";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArticleState } from "../../../../types/Article";
import { useDispatch } from "react-redux";
import { deleteArticle } from "../../../../redux/articlesSlice";

interface IProps {
  data: ArticleState;
}

function Article({ data }: IProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { articles, isLoading } = data;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const articlesPerPage = 4;
  const indexOfLastPost = currentPage * articlesPerPage;
  const indexOfFirstPost = indexOfLastPost - articlesPerPage;

  const currentArticles = articles
    .map((item) => (
      <div key={item.id} className="div-article">
        <p>
          {moment(item.date).format("LLL")}
          <Button color="error" onClick={() => handleOnClickDelete(item.id)}>
            ❌
          </Button>
        </p>
        <h5>{item.title}</h5>
        <p>
          {item.body.length > 3 ? `${item.body.slice(0, 3)}...` : item.body}
        </p>
        {item.body.length > 3 && (
          <Button
            onClick={() => handleOnClick(item.id)}
            size="small"
            variant="outlined"
          >
            Full article
          </Button>
        )}
      </div>
    ))
    .slice(indexOfFirstPost, indexOfLastPost);

  const handleOnClick = (id: number) => {
    navigate(`/${id}`);
  };

  const handleOnClickDelete = (id: number) => {
    const isConfrim = window.confirm(`Delete article number:${id}?`);
    if (isConfrim) {
      dispatch(deleteArticle(id));
    }
  };

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : articles.length === 0 ? (
        "No Articles founds..."
      ) : (
        <div>
          {currentArticles}
          <Pagination
            articlesPerPage={articlesPerPage}
            totalArticles={articles.length}
            numberOfArticles={currentArticles.length}
            paginate={paginate}
          />
        </div>
      )}
    </>
  );
}

export default Article;
