export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  tokenExpirationDate: Date | null;
}
