export interface WorkbookResponse {
  id: number;
  title: string;
  problems: WorkbookProblemResponse[];
  author: WorkbookAuthorResponse;
  createdAt: string;
  updatedAt: string;
}

export interface WorkbookProblemResponse {
  id: number;
  title: string;
  content: string;
  input: string;
  output: string;
  memoryLimit: number;
  timeLimit: number;
}

export interface WorkbookAuthorResponse {
  id: string;
  username: string;
}
