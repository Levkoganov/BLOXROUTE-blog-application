import MUIPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

interface IProps {
  articlesPerPage: number;
  totalArticles: number;
  numberOfArticles: number;
  paginate: (pageNumber: number) => void;
}

function Pagination({
  articlesPerPage,
  totalArticles,
  numberOfArticles,
  paginate,
}: IProps) {
  const [pageNumbers, setPageNumbers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
      if (i === Math.ceil(totalArticles / articlesPerPage)) setPageNumbers(i);
    }

    if (numberOfArticles === 0) {
      paginate(pageNumbers);
      setCurrentPage(pageNumbers);
    }
  }, [numberOfArticles, pageNumbers, paginate, articlesPerPage, totalArticles]);

  const handlePageChange = (e: any, page: number) => {
    setCurrentPage(page);
    paginate(page);
  };

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <MUIPagination
        count={pageNumbers}
        page={currentPage}
        color="primary"
        shape="rounded"
        variant="outlined"
        onChange={handlePageChange}
      />
    </Stack>
  );
}

export default Pagination;
