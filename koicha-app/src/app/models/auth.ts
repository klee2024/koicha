export interface AuthSignUpPayload {
  email: string;
  username: string;
  password: string;
}

export interface AuthSignInPayload {
  username: string;
  password: string;
}
