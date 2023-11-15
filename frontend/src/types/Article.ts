export interface IArticle {
  id: number;
  title: string;
  body: string;
  date: Date;
}

export interface ArticleState {
  articles: IArticle[];
  article: IArticle | null;
  isLoading: boolean;
}
