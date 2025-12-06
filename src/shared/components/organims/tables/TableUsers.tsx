import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
  Tooltip,
} from "@heroui/react";

export const columns = [
  { name: "Usuario", uid: "name" },
  { name: "Correo", uid: "email" },
  { name: "Documento", uid: "identification" },
  { name: "Rol", uid: "rol" },
  { name: "Acciones", uid: "actions" },
];

export const TableUsers = ({
  dataTable,
  chooseUserByDelete,
  chooseUserByUpdate,
  chooseUserInfo,
}: any) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(dataTable.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return dataTable.slice(start, end);
  }, [page, dataTable]);

  const renderCell = React.useCallback(
    (user: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex items-center gap-3 relative">
              <div className="h-[50px] min-w-[50px] rounded-full border grid place-items-center">
                <i className="fi fi-rr-user text-[20px]"></i>
              </div>
              <p>{cellValue}</p>
            </div>
          );
        case "rol":
          return (
            <div
              className={`h-[30px] w-[100px] rounded-[20px] border grid place-items-center ${
                cellValue === "administrador"
                  ? "border-yellow-1-custom bg-yellow-1-custom/30 text-yellow-1-custom"
                  : "border-blue-1-custom bg-blue-1-custom/30 text-[#0055ff]"
              }`}
            >
              <p className="text-xs capitalize">{cellValue}</p>
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center gap-3">
              <Tooltip
                classNames={{ content: "bg-red-800 text-white" }}
                content="Editar"
              >
                <Button
                  onPress={() => chooseUserByUpdate(user)}
                  className="bg-black-2-custom w-10 min-w-0 border border-white grid place-items-center"
                >
                  <i className="fi fi-rr-edit text-base flex text-white"></i>
                </Button>
              </Tooltip>
              <Tooltip
                classNames={{ content: "bg-red-800 text-white" }}
                content="Ver detalles"
              >
                <Button
                  onPress={() => chooseUserInfo(user)}
                  className="bg-black-2-custom w-10 min-w-0 border border-white place-items-center"
                >
                  <i className="fi fi-rr-eye text-base flex text-white"></i>
                </Button>
              </Tooltip>
              <Tooltip
                classNames={{ content: "bg-red-800 text-white" }}
                content="Eliminar"
              >
                <Button
                  onPress={() => chooseUserByDelete(user)}
                  className="bg-red-1-custom w-10 min-w-0 place-items-center"
                >
                  <i className="fi fi-rr-trash text-base flex text-white"></i>
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            classNames={{
              cursor: "bg-linear-to-r from-blue-1-custom to-green-1-custom ",
              item: "bg-gray-2-custom text-white ",
              next: "bg-gray-2-custom text-white",
              prev: "bg-gray-2-custom text-white ",
            }}
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        table: "border-separate border-spacing-y-3",
        wrapper: "bg-black-2-custom px-0 pt-0",
        tr: "bg-gray-2-custom hover:bg-white/10 transition-all duration-200 ease py-20 z-50",
        th: "bg-black-2-custom text-white px-5 rounded-0",
        td: "text-white py-6 px-5",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} className="text-sm font-extrabold">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item?.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
