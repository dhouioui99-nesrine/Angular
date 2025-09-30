export interface RegisterRequest {
  empCode: string;
  lastname: string;
  email: string;
  password: string;
    mfaEnabled: boolean;
  // etc.
}


export interface RegisterResponse {
  empCode : string ;
  lastname : string ;
  accessToken: string;
  refreshToken?: string;
  mfaEnabled: boolean;
  secretImageUri?: string;
    roles?: string[];
}



export interface AuthenticationRequest {
  email: string;
  password: string;
}