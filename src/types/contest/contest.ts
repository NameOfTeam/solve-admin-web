export interface ContestCreateRequest {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  operatorIds: string[];
  participantIds: string[];
  problemIds: number[];
  visibility: 'PUBLIC' | 'PRIVATE';
}

export interface ContestResponse {
  id: number;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  owner: {
    id: string;
    username: string;
  };
  participants: Array<{
    id: string;
    username: string;
  }>;
  operators: Array<{
    id: string;
    username: string;
  }>;
  problems: Array<{
    title: string;
  }>;
  visibility: 'PUBLIC' | 'PRIVATE';
  createdAt: string;
  updatedAt: string;
}
