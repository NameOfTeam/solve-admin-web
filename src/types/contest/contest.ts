export interface ContestCreateRequest {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  operatorIds: string[];
  participantIds: string[];
  problemIds: number[];
}
