import { ColumnDef } from "@tanstack/react-table";

export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "name",
    header: "İsim",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
  },
  {
    accessorKey: "message",
    header: "Mesaj",
    cell: ({ row }) => {
      const message = row.original;
      const truncatedMessage =
        message.message.length > 50
          ? message.message.substring(0, 50) + "..."
          : message.message;

      return <span className="whitespace-normal">{truncatedMessage}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tarih",
    cell: ({ row }) => {
      return (
        <span>{new Date(row.original.createdAt).toLocaleString("tr-TR")}</span>
      );
    },
  },
];
