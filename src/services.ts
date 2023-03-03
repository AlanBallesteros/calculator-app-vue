import axios from "axios";
import Cookie from "js-cookie";
import { API_BASE_URL } from "@/config/constants";
import type {
  Operation,
  OperationResponse,
  Record,
  FiltersObject,
  Pagination,
} from "./config/types";

axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";

export const UserService = {
  async login(username: string, password: string): Promise<void> {
    const user = { username, password };
    await axios.post(API_BASE_URL + "auth/login", user);
  },
  async logout(): Promise<void> {
    await axios.get(API_BASE_URL + "auth/logout");
  },
  getUser(): string | boolean {
    const userLogged = Cookie.get("auth_token_user");
    return userLogged ? userLogged : false;
  },
};
export const OperationsService = {
  async getOperations(): Promise<Operation[]> {
    const { data } = await axios.get(API_BASE_URL + "operations/", {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);
    return data;
  },
  async calculateOperations(
    operationsId: number,
    operationData: number[]
  ): Promise<OperationResponse> {
    const params = { values: operationData.join(",") };
    const { data } = await axios.get(
      `${API_BASE_URL}operations/calculate/${operationsId}`,
      {
        params,
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(data);
    return data;
  },
};

export const RecordService = {
  async getRecords(
    filters: FiltersObject
  ): Promise<{ records: Record[]; pagination: Pagination }> {
    const options = {
      params: filters,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.get(API_BASE_URL + "records/", options);
    console.log(data);
    return data;
  },
};
