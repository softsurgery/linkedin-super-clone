export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface ConnectPayload {
  usernameOrEmail: string;
  password: string;
}
