import { AxiosResponse } from "axios";
import { SignInCredentials, SignUpCredentials } from "../types";
import { api } from "../../../lib";

interface AuthResponse {
    accessToken: string;
}

class AuthService {
    constructor() {}

    async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
        const response: AxiosResponse<AuthResponse> = await api.post(
            "/auth/login",
            {
                email: credentials.email,
                password: credentials.password,
            },
            { withCredentials: true }
        );

        const { accessToken } = response.data;
        return { accessToken };
    }

    async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
        const response: AxiosResponse<AuthResponse> = await api.post(
            "/auth/register",
            {
                email: credentials.email,
                password: credentials.password,
                name: credentials.name,
            },
            { withCredentials: true }
        );

        const { accessToken } = response.data;
        return { accessToken };
    }

    async logout(): Promise<void> {
        await api.post("/auth/logout", {}, { withCredentials: true });
    }

    async refreshToken(): Promise<AuthResponse> {
        const response: AxiosResponse<AuthResponse> = await api.post(
            "/auth/refresh",
            {},
            { withCredentials: true }
        );
        console.log(response);

        const { accessToken } = response.data;
        return { accessToken };
    }
}

export const authService = new AuthService();
