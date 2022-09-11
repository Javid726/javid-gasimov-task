import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ReactComponent as Filter } from '../assets/svg/filter.svg';
import { ReactComponent as Plus } from '../assets/svg/plus.svg';

import { makeStyles } from '@material-ui/core/styles';

import { useState, useEffect } from 'react';
import PaginationComponent from './Pagination';

import PopOverComponent from './PopOverComponent';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSales } from '../store/productSlice';
import StatusBar from './StatusBar';
import NewSaleModal from './NewSaleModal';

const useStyles = makeStyles({
  button: {
    textTransform: 'none !important',
    fontFamily: 'Open Sans !important',
    fontSize: '14px !important',
    fontWeight: '600 !important',
    border: '1px solid #7C818D',
    color: '#fff',
    borderRadius: '8px !important',
  },
});

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

const TableComponent = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const dispatch = useDispatch();
  const data = useSelector(state => state.product.data);

  const [searchResult, setSearchResult] = useState([]);

  const getRandomArbitrary = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

  const handlePaginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = e => {
    let searchResult = [];

    data.forEach(el => {
      if (el.client_name.toLowerCase().includes(e.target.value)) {
        searchResult.push(el);
      }
    });

    setSearchResult(searchResult);
  };

  //   New Sale Modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAllSales());
  }, [dispatch]);

  useEffect(() => {
    setSearchResult(data);
  }, [data]);

  // Get current sales
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <main
        style={{
          border: '1px solid #ECECEE',
          borderRadius: '12px',
          padding: '0 15px',
        }}
      >
        <Box sx={{ m: '20px' }}>
          <span
            style={{
              fontFamily: 'Open Sans',
              fontWeight: '600',
              fontSize: '16px',
            }}
          >
            Qaimələr
          </span>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '440px',
            }}
          >
            <TextField
              id="input-with-icon-textfield"
              placeholder="Qaimə nömrəsi, müştəri adı üzrə axtar"
              onChange={handleSearch}
              size="small"
              fullWidth={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'Open Sans',
                  height: '40px',
                  borderRadius: '10px',
                },
              }}
              variant="outlined"
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              className={classes.button}
              startIcon={<Filter />}
            >
              Filter
            </Button>
            <Button
              className={classes.button}
              onClick={handleClickOpen}
              variant="contained"
              startIcon={<Plus />}
            >
              Yeni qaimə
            </Button>
          </Stack>
        </Box>

        <NewSaleModal open={open} handleClose={handleClose} data={data} />
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
                <StyledTableCell>Qaimə &#8470;</StyledTableCell>
                <StyledTableCell align="center">Müştəri</StyledTableCell>
                <StyledTableCell align="center">Məhsul sayı</StyledTableCell>
                <StyledTableCell align="center">Toplam məbləğ</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Əmrlər</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map(el => (
                <StyledTableRow
                  key={el.id}
                  sx={{
                    borderCollapse: 'unset !important',
                    borderSpacing: '0',
                    padding: '10px 15px',
                  }}
                >
                  <StyledTableCell align="left">
                    {getRandomArbitrary(1, 100000)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {el.client_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {el.product_quantity}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {el.total_amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusBar status={el.status} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <PopOverComponent saleId={el.id} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: '20px',
        }}
      >
        <PaginationComponent
          postsPerPage={postsPerPage}
          totalPosts={data.length}
          paginate={handlePaginate}
        />
      </Box>
    </>
  );
};

export default TableComponent;
