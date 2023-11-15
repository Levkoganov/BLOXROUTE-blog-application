import { Paper, InputBase, Divider, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { searchArticle, fetchArticles } from "../../../../redux/articlesSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (search === "" || search.trim() === "") {
      dispatch(fetchArticles());
    } else {
      dispatch(searchArticle(search));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton
          onClick={handleSubmit}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search article (by title)"
          value={search}
          name="search"
          inputProps={{ "aria-label": "Search" }}
          onChange={handleChange}
        />
      </Paper>
    </form>
  );
}

export default SearchBar;
