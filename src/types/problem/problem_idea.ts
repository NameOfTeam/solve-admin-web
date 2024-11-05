export interface ProblemIdeaResponse {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: ProblemIdeaAuthorResponse;
  comments: ProblemIdeaCommentResponse[];
  isAuthor?: boolean;
  isLiked?: boolean;
  likeCount: number;
}

export interface ProblemIdeaCommentResponse {
  id: number;
  content: string;
  author: ProblemIdeaAuthorResponse;
  createdAt: string;
  updatedAt: string;
  children: ProblemIdeaCommentResponse[];
  isAuthor?: boolean;
}

export interface ProblemIdeaAuthorResponse {
  id: number;
  username: string;
}
