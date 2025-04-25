import axios from "axios";

const baseURL = axios.create({
    baseURL: "https://glow-era-production.up.railway.app",
});

export default baseURL;