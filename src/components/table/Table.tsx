import { IconButton, IconButtonProps, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import React from "react";
import { RowProps } from "react-bootstrap";
import { ColumnProps, MUITableProps } from "../../shared/types/type";

const StyledTable = styled(Table)`
    width: 90%;
    margin: 90px 0 0 90px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 25px
    }
`;

const TableData: React.FC<MUITableProps> = ({ rows, columns }: MUITableProps) => {
    return (
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>
                        {columns && columns.map((column: ColumnProps) => (
                            <TableCell key={column.title}>{column.title}</TableCell>
                        ))}
                    </TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {rows && rows.map((row: RowProps) => {
                    const { actionButtons, ...cells } = row
                    return (
                        <TRow key={row.key}>
                            {Object.values(cells).map((cell) => (
                                <TableCell key={cell}>{cell}</TableCell>
                            ))}
                        </TRow>
                    )
                })}
            </TableBody>
        </StyledTable>
        // <TableContainer component={Paper}>
        //     <Table>
        //         <TableHead>
        //             <TableRow>
        //                 {columns && columns.map((column: ColumnProps) => (
        //                     <TableCell key={column.title}>{column.title}</TableCell>
        //                 ))}
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {rows && rows.map((row: RowProps) => {
        //                 const { actionButtons, ...cells } = row
        //                 return (
        //                     <TableRow key={row.key}>
        //                         {Object.values(cells).map((cell) => (
        //                             <TableCell key={cell}>{cell}</TableCell>
        //                         ))}
        //                     </TableRow>
        //                 )
        //             })}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
    )
}

export default TableData;