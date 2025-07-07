import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [selectedMessage, setSelectedMessage] = useState<{
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
  } | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mesaj Detayı</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-4 space-y-4">
                <div>
                  <span className="font-semibold">İsim:</span>{" "}
                  <span>{selectedMessage?.name}</span>
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  <span>{selectedMessage?.email}</span>
                </div>
                <div>
                  <span className="font-semibold">Telefon:</span>{" "}
                  <span>{selectedMessage?.phone}</span>
                </div>
                <div>
                  <span className="font-semibold">Mesaj:</span>{" "}
                  <span>{selectedMessage?.message}</span>
                </div>
                <div>
                  <span className="font-semibold">Tarih:</span>{" "}
                  <span>
                    {selectedMessage?.createdAt
                      ? new Date(selectedMessage.createdAt).toLocaleString(
                          "tr-TR"
                        )
                      : "Tarih belirtilmemiş"}
                  </span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
