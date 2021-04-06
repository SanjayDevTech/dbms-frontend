import axios from "axios";
import { BACKEND } from "utils/constants";

export const backendAPI = axios.create({
	baseURL: BACKEND,
});
