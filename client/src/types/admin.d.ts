// src/types/admin.d.ts
export interface AdminLoginResponse {
  token: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}
