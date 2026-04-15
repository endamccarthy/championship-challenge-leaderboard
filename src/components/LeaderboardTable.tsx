import { useState, useMemo } from "preact/hooks";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import type { LeaderboardEntry } from "../types";

const columnHelper = createColumnHelper<LeaderboardEntry>();

const columns = [
  columnHelper.accessor("position", {
    header: "#",
    cell: (info) => info.getValue(),
    enableGlobalFilter: false,
    size: 50,
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("points", {
    header: "Points",
    cell: (info) => info.getValue(),
    enableGlobalFilter: false,
  }),
  columnHelper.accessor("munsterWinner", {
    header: "Munster Winner",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("leinsterWinner", {
    header: "Leinster Winner",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("topScorerMunster", {
    header: "Top Scorer (Munster)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("topScorerLeinster", {
    header: "Top Scorer (Leinster)",
    cell: (info) => info.getValue(),
  }),
];

interface LeaderboardTableProps {
  data: LeaderboardEntry[];
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableData = useMemo(() => data, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <div class="table-container">
      <div class="table-controls">
        <input
          type="search"
          placeholder="Search by name, county, or player..."
          value={globalFilter}
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          class="search-input"
          aria-label="Search leaderboard"
        />
      </div>

      <div class="table-scroll">
        <table role="grid" class="leaderboard-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    class={header.column.getCanSort() ? "sortable" : ""}
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : "none"
                    }
                    style={{
                      width:
                        header.getSize() !== 150
                          ? `${header.getSize()}px`
                          : undefined,
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getIsSorted() === "asc" ? " ▲" : ""}
                    {header.column.getIsSorted() === "desc" ? " ▼" : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} class="no-results">
                  No results found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      data-label={cell.column.columnDef.header as string}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button
          class="pagination-btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ← Previous
        </button>
        <span class="pagination-info">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          class="pagination-btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
