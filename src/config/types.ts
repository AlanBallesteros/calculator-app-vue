export interface OperationResponse {
  amount: number;
  date: string;
  deletedAt: string | null;
  id: number;
  operationId: number;
  operationResponse: number;
  userBalance: number;
}
interface User {
  id: number;
  username: string;
  password: string;
  status: boolean;
  deletedAt: Date | null;
}
export interface Operation {
  id: number;
  type: string;
  cost: number;
  deletedAt: Date;
  min_num: number;
  symbol: string;
}
export interface Record {
  amount: number;
  date: Date;
  deletedAt: Date | null;
  id: number;
  operation: Operation;
  operationId: number;
  operationResponse: string;
  user: User;
  userBalance: number;
  userId: number;
}
export interface Pagination {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
}
export enum SortEnum {
  DESC = "DESC",
  ASC = "ASC",
}
export interface FiltersObject {
  sort: SortEnum;
  limit: number;
  offset: number;
  search: string;
  orderby: string;
}
export interface TableRecord {
  amount: number;
  date: Date;
  deletedAt: Date | null;
  id: number;
  operationId: number;
  operationResponse: string;
  username: string;
  userBalance: number;
  userId: number;
  operationType: string;
}
export enum Align {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}
