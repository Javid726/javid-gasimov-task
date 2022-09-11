import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import { deleteSales } from '../store/productSlice';

const useStyles = makeStyles({
  button: {
    textTransform: 'none !important',
    fontFamily: 'Open Sans !important',
    fontSize: '14px !important',
    lineHeight: '18px !important',
    fontWeight: '500 !important',
    border: '1px solid #7C818D',
    width: '120px !important',
    height: '36px !important',
    color: '#fff',
    borderRadius: '8px !important',
  },
});

const AlertDialog = ({ open, handleClickOpen, handleClose, saleId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSales(saleId));
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{
          padding: '50px 0',
          margin: '0',
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '24px',
            fontWeight: 600,
            fontFamily: 'Open Sans',
          }}
        >
          {'Qaiməni silməyinizə əminsiniz?'}
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}
        >
          <Button
            className={classes.button}
            onClick={handleClose}
            variant="outlined"
          >
            İmtina
          </Button>
          <Button
            onClick={handleDelete}
            className={classes.button}
            autoFocus
            variant="contained"
            sx={{ margin: '40px 0' }}
          >
            Sil
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
