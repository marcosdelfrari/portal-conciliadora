"use client";

import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Edit2 } from "lucide-react";
import { EditPopup } from "./EditPopup";

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  type?: "text" | "select";
  options?: { value: string; label: string }[];
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onUpdate?: (row: T, field: keyof T, value: string) => void;
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T>({
  data,
  columns,
  onUpdate,
  className = "",
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    field: keyof T;
  } | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  // Função para ordenar dados
  const sortedData = useMemo(() => {
    if (!sortField || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection]);

  // Função para filtrar dados
  const filteredData = useMemo(() => {
    return sortedData.filter((row) => {
      return Object.entries(filters).every(([field, filterValue]) => {
        if (!filterValue) return true;
        const cellValue = String(row[field as keyof T]).toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      });
    });
  }, [sortedData, filters]);

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (field: keyof T, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCellClick = (
    rowIndex: number,
    field: keyof T,
    column: Column<T>
  ) => {
    if (!column.editable) return;

    setEditingCell({ rowIndex, field });
    setEditValue(String(filteredData[rowIndex][field]));
  };

  const handleSaveEdit = (value: string) => {
    if (!editingCell || !onUpdate) return;

    const row = filteredData[editingCell.rowIndex];
    onUpdate(row, editingCell.field, value);
    setEditingCell(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const getSortIcon = (field: keyof T) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div
      className={`bg-white dark:bg-[#0a0a0a] rounded-md shadow-lg border  border-black/10 dark:border-white/20 ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-[#0a0a0a] rounded-xl">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-base font-light text-gray-500 dark:text-[#c8d300] tracking-wider ${
                    column.sortable || column.filterable
                      ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                      : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && getSortIcon(column.key)}
                    {column.filterable && (
                      <div className="flex w-full items-center gap-1">
                        <input
                          type="text"
                          placeholder={`Procurar ${column.label.toLowerCase()}...`}
                          value={filters[String(column.key)] || ""}
                          onChange={(e) =>
                            handleFilterChange(column.key, e.target.value)
                          }
                          className="w-full ml-4 px-2 py-2 text-xs border border-black/10 dark:border-white/20 rounded-full bg-white dark:bg-[#1a1a1a] focus:outline-none text-white font-light  dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-[#c8d300] focus:border-transparent"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#0a0a0a] divide-y divide-black/10 dark:divide-white/20">
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="group hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
              >
                {columns.map((column) => {
                  const cellValue = row[column.key];

                  return (
                    <td
                      key={String(column.key)}
                      className={`whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white ${
                        column.editable
                          ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                          : ""
                      }`}
                      onClick={() =>
                        handleCellClick(rowIndex, column.key, column)
                      }
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="flex-1">
                          {column.render
                            ? column.render(cellValue, row)
                            : String(cellValue)}
                        </span>
                        {column.editable && (
                          <Edit2 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Nenhum resultado encontrado</p>
          <p className="text-sm">Tente ajustar os filtros</p>
        </div>
      )}

      <div className="px-6 py-3 bg-gray-50 dark:bg-[#0a0a0a] border-t border-black/10 dark:border-white/20">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredData.length} de {data.length} registros
        </p>
      </div>

      {/* Edit Popup */}
      {editingCell && (
        <EditPopup
          isOpen={!!editingCell}
          onClose={handleCancelEdit}
          value={editValue}
          onChange={handleSaveEdit}
          type={columns.find((col) => col.key === editingCell.field)?.type}
          options={
            columns.find((col) => col.key === editingCell.field)?.options
          }
          columnLabel={
            columns.find((col) => col.key === editingCell.field)?.label
          }
          rowData={
            filteredData[editingCell.rowIndex] as Record<string, unknown>
          }
        />
      )}
    </div>
  );
}
