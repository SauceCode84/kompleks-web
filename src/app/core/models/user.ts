
export interface User {
  uid: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
  unit?: string;

  fcmTokens?: { [token: string]: true };
}
