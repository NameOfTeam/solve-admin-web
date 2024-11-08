export interface User {
  id: string;
  username: string;
}

export interface Problem {
  id: number;
  title: string;
}

export interface ContestCreateRequest {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  operatorIds: string[];
  participantIds: string[];
  problemIds: number[];
}

export type FormState = Omit<ContestCreateRequest, 'operatorIds' | 'participantIds' | 'problemIds'>;

export interface ModalState {
  operator: boolean;
  participant: boolean;
  problem: boolean;
}

export interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  children: React.ReactNode;
  loadingRef: (node?: Element | null) => void;
  isLoading: boolean;
}

export interface SelectedItemsState {
  operators: User[];
  participants: User[];
  problems: Problem[];
}
