import axios from "axios";
import { BACKEND, IMGBB_API_KEY } from "utils/constants";

export const backendAPI = axios.create({
	baseURL: BACKEND,
});

export const imgbbAPI = axios.create({
	baseURL: `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
});
