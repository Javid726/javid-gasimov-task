import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, InputAdornment } from '@mui/material';

import { ReactComponent as ArrowDown } from '../assets/svg/arrowDown.svg';
import { ReactComponent as Success } from '../assets/svg/success.svg';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NewTableComponent from './NewTableComponent';

import {
  addRecord,
  calculateTotalAmount,
  fetchProducts,
  postProducts,
  updateProducts,
} from '../store/addSaleSlice';
import { reset } from '../store/addSaleSlice';

const useStyles = makeStyles({
  paper: {
    minHeight: '100vh !important',
    height: '100vh !important',
  },
  button: {
    textTransform: 'none !important',
    fontFamily: 'Open Sans !important',
    fontSize: '14px !important',
    lineHeight: '18px !important',
    fontWeight: '500 !important',
    border: '1px solid #7C818D',
    width: '120px !important',
    height: '36px !important',
    margin: '0 !important',
    color: '#fff',
    borderRadius: '8px !important',
  },
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const NewSaleModal = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(state => state.product.data);
  const products = useSelector(state => state.sale.products);
  const saleRecord = useSelector(state => state.sale.saleRecord);
  const totalAmount = useSelector(state => state.sale.total_amount);

  const [success, setSuccess] = useState(false);
  const [userList, setUserList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const listOfUsers = props.data.map((el, index) => ({
      value: index,
      label: el.client_name,
    }));

    dispatch(fetchProducts());

    setUserList(listOfUsers);
  }, [data]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleChange = (event, value) => {
    setSelectedUser(value.label);
  };

  const handleProduct = (event, value) => {
    setSelectedProduct(value);
  };

  const handleCloseModal = () => {
    props.handleClose();
    dispatch(reset());
    setSuccess(false);
  };

  const addNewRecord = () => {
    const newSale = {
      client_name: selectedUser,
      product_id: selectedProduct.id,
      product_name: selectedProduct.product_name,
      product_quantity: selectedProduct.product_quantity,
      product_price: selectedProduct.product_price,
      total_amount:
        selectedProduct.product_quantity * selectedProduct.product_price,
    };

    if (newSale) {
      dispatch(addRecord(newSale));
      dispatch(calculateTotalAmount());
    }
  };

  const handleSave = () => {
    const product_quantity = saleRecord.reduce((prevValue, currValue) => {
      return prevValue + +currValue.product_quantity;
    }, 0);

    let client_name;

    saleRecord.forEach(el => (client_name = el.client_name));

    const newSaleRecord = {
      client_name,
      product_quantity,
      total_amount: totalAmount,
      status: 'pending',
    };

    // this part could be done differently, it is not preferable way like this (but time limit also important :). )
    saleRecord.forEach(el => {
      const updatedItems = {
        id: el.product_id,
        product_name: el.product_name,
        product_quantity: el.product_quantity,
        product_price: el.product_price,
      };
      dispatch(updateProducts(updatedItems));
    });
    dispatch(postProducts(newSaleRecord));
    dispatch(reset());

    setSuccess(true);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      className={classes.paper}
      PaperProps={{
        sx: {
          width: '80%',

          minHeight: '80% !important',
          margin: '0 !important',
        },
      }}
      onClose={props.handleClose}
    >
      <DialogTitle
        sx={{ color: '#266AEB', fontWeight: '600', fontSize: '20px' }}
      >
        {success ? 'Uğurlu Əməliyyat' : 'Qaimə'}
      </DialogTitle>
      <DialogContent className={`${success ? 'dialog' : ''}`}>
        {/* can divide into usable components, readability isn't good */}
        {!success ? (
          <>
            <Box
              sx={{
                mb: '60px',
                display: 'flex',
                gap: '50px',
              }}
            >
              <Box
                sx={{
                  width: '440px',
                }}
              >
                <span style={{ display: 'inline-block', marginBottom: '5px' }}>
                  Müştəri
                </span>
                <Autocomplete
                  popupIcon={<ArrowDown />}
                  options={userList}
                  getOptionLabel={option => option.label}
                  onChange={(e, val) => handleChange(e, val)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      id="input-with-icon-textfield"
                      placeholder="Axtar"
                      size="small"
                      fullWidth={true}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <Box>
                <span style={{ display: 'inline-block', marginBottom: '5px' }}>
                  Məhsulun adı
                </span>
                <Box
                  sx={{
                    width: '440px',
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <Autocomplete
                    disablePortal
                    onChange={(e, val) => handleProduct(e, val)}
                    popupIcon={<ArrowDown />}
                    options={productList}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    size="small"
                    getOptionLabel={option =>
                      `${option.product_name} (${option.product_quantity})`
                    }
                    sx={{ width: 450, maxHeight: 80, height: '60 !important' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        id="input-with-icon-textfield"
                        placeholder="Axtar"
                        size="small"
                        fullWidth={true}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      />
                    )}
                  />
                  <Button
                    sx={{ display: 'inline' }}
                    variant="contained"
                    onClick={addNewRecord}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </Box>
            {saleRecord.length > 0 && (
              <>
                <NewTableComponent />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mt: '20px',
                  }}
                >
                  <div style={{ color: '#0051EC', fontSize: '20px' }}>
                    Toplam: ${totalAmount}
                  </div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '10px',
                    mt: '10px',
                  }}
                >
                  <Button
                    className={classes.button}
                    variant="outlined"
                    onClick={handleCloseModal}
                  >
                    İmtina et
                  </Button>
                  <Button
                    className={classes.button}
                    onClick={handleSave}
                    autoFocus
                    variant="contained"
                    sx={{ margin: '40px 0' }}
                  >
                    Yadda Saxla
                  </Button>
                </Box>
              </>
            )}
          </>
        ) : (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Success />
            <Box>
              <span
                style={{
                  color: '#3D4047',
                  fontWeight: '500',
                  display: 'inline-block',
                  marginTop: '30px',
                  marginLeft: '-50px',
                  fontSize: '20px',
                  textAlign: 'center',
                  fontFamily: 'Open Sans',
                }}
              >
                Qaimə əməliyyatınız uğurla tamamlanmışdır!
              </span>
            </Box>
          </div>
        )}
      </DialogContent>
      <DialogActions sx={{ position: 'absolute', top: 0, right: 0 }}>
        <Button
          onClick={() => {
            props.handleClose();
            dispatch(reset());
            setSuccess(false);
          }}
        >
          x
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSaleModal;
