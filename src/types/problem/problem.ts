export interface ProblemResponse {
  id: number;
  title: string;
  content: string;
  input: string;
  output: string;
  memoryLimit: number;
  timeLimit: number;
  correctRate: number;
  testCases: ProblemTestCaseResponse[];
  author: ProblemAuthorResponse;
  state: ProblemSubmitState;
}

interface ProblemTestCaseResponse {
  id: number;
  input: string;
  output: string;
}

interface ProblemAuthorResponse {
  username: string;
}

export type ProblemSubmitState =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'PRESENTATION_ERROR'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'RUNTIME_ERROR'
  | 'PENDING'
  | 'JUDGING'
  | 'JUDGING_IN_PROGRESS';
