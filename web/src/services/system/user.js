import axios from "../../utils/axios";

export const login = (data) => axios.setAxiosPostPromise('account/login', data)