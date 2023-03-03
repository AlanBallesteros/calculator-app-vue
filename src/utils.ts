import { type Record, type TableRecord, Align } from "./config/types";
export const formatRecordsForTable = (records: Record[]): TableRecord[] => {
  const formattedRecords = records;
  return formattedRecords.map((record: Record) => {
    const { user, operation, ...all } = record;
    return { ...all, username: user?.username, operationType: operation?.type };
  });
};
export const columns = [
  {
    name: "record.id",
    label: "Operation Id",
    field: "id",
    required: true,
    sortable: true,
    align: Align.LEFT,
  },
  {
    name: "user.username",
    label: "Username",
    field: "username",
    required: true,
    align: Align.LEFT,
  },
  {
    name: "operation.type",
    label: "Operation Type",
    field: "operationType",
    required: true,
    sortable: true,
    align: Align.LEFT,
  },
  {
    name: "record.amount",
    label: "Operation Cost",
    field: "amount",
    sortable: true,
    required: true,
    align: Align.LEFT,
  },
  {
    name: "record.userBalance",
    label: "User Balance",
    field: "userBalance",
    required: true,
    align: Align.LEFT,
  },
  {
    name: "record.operationResponse",
    label: "Operation Response",
    field: "operationResponse",
    required: true,
    style: "max-width: 48px; overflow: hidden;",
    align: Align.LEFT,
  },
  {
    name: "record.date",
    label: "Operation Date",
    field: "date",
    sortable: true,
    required: true,
    align: Align.LEFT,
  },
  {
    name: "record.deletedAt",
    label: "Deleted Date",
    field: "deletedAt",
    required: true,
    sortable: true,
    align: Align.LEFT,
  },
];
