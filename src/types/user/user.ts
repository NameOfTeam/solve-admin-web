export interface UserUpdateRequest {
  password?: string;
  role?: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  role: string;
}
