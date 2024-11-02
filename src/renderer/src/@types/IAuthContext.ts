interface IAuthContext {
    currentUser?: IUser,
    accessToken?: string,
    refreshToken?: string,
    csrftoken?: string,
    setCurrentUser?: (user: IUser) => void,
    setAccessToken?: (accessToken: string) => void,
    setRefreshToken?: (refreshToken: string) => void,
    setCSRFToken?: (csrftoken: string) => void,
}