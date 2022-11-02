import { IconButton, IconButtonProps, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { RowProps, Table } from "react-bootstrap";
import { ColumnProps, MUITableProps } from "../../../shared/types/type";

const TableData: React.FC<MUITableProps> = ({ rows, columns }: MUITableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns && columns.map((column: ColumnProps) => (
                            <TableCell key={column.title}>{column.title}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row: RowProps) => {
                        const { actionButtons, ...cells } = row
                        return (
                            <TableRow key={row.key}>
                                {Object.values(cells).map((cell) => (
                                    <TableCell key={cell}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableData;