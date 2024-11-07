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

export enum ContestVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum ContestState {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}

export interface ContestOperatorResponse {
  username: string;
}

export interface ContestOwnerResponse {
  username: string;
}
export interface ContestParticipantResponse {
  username: string;
}

export interface ContestProblemResponse {
  title: string;
}

export interface ContestResponse {
  id: number;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  owner: ContestOwnerResponse;
  state: ContestState;
  operators: ContestOperatorResponse[];
  participants: ContestParticipantResponse[];
  problems: ContestProblemResponse[];
  visibility: ContestVisibility;
  createdAt: string;
  updatedAt: string;
}
