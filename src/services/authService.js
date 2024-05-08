import { API, requestConfig } from "../utils/config";

const register = async (data) => {
    const config = requestConfig("POST", data);
    try {
        const res = await fetch(API + "register", config).then((res) => res.json()).catch((err) => err);
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
    } catch (error) {
        console.log(error);
    }
};

const logout = () => {
    localStorage.removeItem("user");
};

const login = async (data) => {
    const config = requestConfig("POST", data);
    try {
        const res = await fetch(API + "login", config).then((res) => res.json()).catch((err) => err);
        if (res.token) {
            localStorage.setItem('user', JSON.stringify(res));
        }
    } catch (error) {
        console.log(error);
    }
};

const authService = {
    register,
    logout,
    login
};

export default authService;