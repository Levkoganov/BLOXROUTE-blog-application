import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArticleState, IArticle } from "../types/Article";
import axios from "axios";

const initialState: ArticleState = {
  articles: [],
  article: null,
  isLoading: false,
};

export const fetchArticles: any = createAsyncThunk(
  "articles/fetch",
  async () => {
    const { data } = await axios(`get`);
    return data;
  }
);

export const fetchArticleById: any = createAsyncThunk(
  "article/fetchById",
  async (id: number) => {
    const { data } = await axios(`get/${id}`);
    return data;
  }
);

export const searchArticle: any = createAsyncThunk(
  "article/search",
  async (keyword: string) => {
    const { data } = await axios(`search/${keyword}`);
    return data;
  }
);

export const deleteArticle: any = createAsyncThunk(
  "article/delete",
  async (id: number) => {
    const { data } = await axios.delete(`delete/${id}/`);
    return data;
  }
);

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle: (state, action: PayloadAction<IArticle>) => {
      state.articles = [...state.articles, action.payload];
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchArticles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.isLoading = false;
    });

    builder.addCase(searchArticle.fulfilled, (state, action) => {
      state.articles = action.payload;
    });

    builder.addCase(fetchArticleById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchArticleById.fulfilled, (state, action) => {
      state.article = action.payload;
      state.isLoading = false;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.articles = state.articles.filter(
        (item) => item.id !== action.payload.id
      );
    });
  },
});

export const { addArticle } = articleSlice.actions;

export default articleSlice.reducer;
