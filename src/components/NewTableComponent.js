import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useState, useEffect } from 'react';
import PopOverComponent from './PopOverComponent';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSales } from '../store/productSlice';
import EditableInputComponent from './EditableInputComponent';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FAFAFC',
    color: '#6B707C',
    fontSize: 12,
    fontWeight: 400,
    borderCollapse: 'unset',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'Open Sans',
    padding: '25px 10px !important',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const NewTableComponent = props => {
  const dispatch = useDispatch();
  const saleRecord = useSelector(state => state.sale.saleRecord);

  const [newItem, setNewItem] = useState([]);

  useEffect(() => {
    dispatch(fetchAllSales());
  }, [dispatch]);

  useEffect(() => {
    setNewItem(saleRecord);
  }, [saleRecord]);

  return (
    <>
      <main
        style={{
          border: '1px solid #ECECEE',
          borderRadius: '12px',
          padding: '0 15px',
        }}
      >
        <TableContainer sx={{ margin: '30px 0' }}>
          <Table
            sx={{
              minWidth: 700,
              borderCollapse: 'unset',
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Məhsul adı</StyledTableCell>
                <StyledTableCell align="center">Miqdar</StyledTableCell>
                <StyledTableCell align="center">Qiymət</StyledTableCell>
                <StyledTableCell align="center">Toplam məbləğ</StyledTableCell>
                <StyledTableCell align="center">Əmrlər</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newItem.map(el => (
                <StyledTableRow
                  key={el.id}
                  sx={{
                    borderCollapse: 'unset !important',
                    borderSpacing: '0',
                    padding: '10px 15px',
                  }}
                >
                  <StyledTableCell align="left">
                    {el.product_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditableInputComponent editedItem={el} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {el.product_price}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    $ {Math.ceil(el.total_amount * 100) / 100}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <PopOverComponent saleId={el.id} key={el.id} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </>
  );
};

export default NewTableComponent;
