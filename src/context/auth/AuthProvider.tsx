import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../../features/authentication/services/auth.services";
import { api } from "../../lib";
import { InternalAxiosRequestConfig } from "axios";
import { CustomAxiosRequestConfigForAuth } from "./types";
import {
    SignInCredentials,
    SignUpCredentials,
} from "../../features/authentication/types";
import { redirect } from "react-router-dom";

type AuthProviderProps = {
    children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>("");

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const { accessToken } = await authService.refreshToken();
                setAccessToken(accessToken);
            } catch (error) {
                setAccessToken(null);
            }
        };
        fetchAccessToken();
    }, []);
    useEffect(() => {
        if (accessToken) setIsAuthenticated(true);
        else setIsAuthenticated(false);
    }, [accessToken]);

    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use(
            (config: InternalAxiosRequestConfig<any>) => {
                const customConfig = config as CustomAxiosRequestConfigForAuth;
                customConfig.headers.Authorization =
                    !customConfig._retry && accessToken
                        ? `Bearer ${accessToken}`
                        : customConfig.headers.Authorization;
                return customConfig;
            }
        );
        return () => {
            api.interceptors.request.eject(authInterceptor);
        };
    }, [accessToken]);

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response.status === 403 &&
                    error.response.data.message === "Unauthorized"
                ) {
                    try {
                        const { accessToken } =
                            await authService.refreshToken();
                        setAccessToken(accessToken);
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        originalRequest._retry = true;
                        return api(originalRequest);
                    } catch (error) {
                        setAccessToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.response.eject(refreshInterceptor);
        };
    }, [accessToken]);

    const signUp = async (credentials: SignUpCredentials) => {
        try {
            const { accessToken } = await authService.signUp(credentials);
            setAccessToken(accessToken);
        } catch (error) {
            setAccessToken(null);
            throw error;
        }
    };
    const signIn = async (credentials: SignInCredentials) => {
        try {
            const { accessToken } = await authService.signIn(credentials);
            setAccessToken(accessToken);
        } catch (error) {
            setAccessToken(null);
            throw error;
        }
    };
    const logout = async () => {
        await authService.logout();
        redirect("/sign-in");
        setAccessToken(null);
    };
    return (
        <AuthContext.Provider
            value={{ accessToken, isAuthenticated, signIn, signUp, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
