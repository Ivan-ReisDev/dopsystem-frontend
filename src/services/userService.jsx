import { API, requestConfig } from "../utils/config";

//GET user

const profile = async(data, token) => {
    const config = requestConfig("GET", data, token);

    try {
        const res = await fetch(API + "profile", config).then((res) => res.json()).catch((err) => err)
        return res;

    } catch (error) {
        console.log(error)
    }

};

const userService = {
    profile,
}

export default userService;