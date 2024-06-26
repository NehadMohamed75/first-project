export const checkAuthentication = (): boolean => {
    const token = localStorage.getItem('token');
    return token != null;
}

export const getAuthenticationToken = (): string => {
    return localStorage.getItem('token')
}