export function getAccessToken() {
    const authData = localStorage.getItem("AuthData");
    if (!authData) return false;
    const token = `${JSON.parse(authData).name}`;
    if (!token) return false;
    return token;
}

export function getAuthData() {
    const authData = localStorage.getItem("AuthData");
    if (!authData) return false;
    return JSON.parse(authData);
}