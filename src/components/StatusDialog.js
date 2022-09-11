import * as React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../store/productSlice';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
  button: {
    textTransform: 'none !important',
    fontFamily: 'Open Sans !important',
    fontSize: '14px !important',
    lineHeight: '18px !important',
    fontWeight: '500 !important',
    border: '1px solid #7C818D',
    width: '100% !important',
    height: '36px !important',
    color: '#fff',
    borderRadius: '8px !important',
  },
  buttonStatus: {
    textTransform: 'none !important',
    fontFamily: 'Open Sans !important',
    fontSize: '14px !important',
    lineHeight: '18px !important',
    fontWeight: '500 !important',
    border: '1px solid transparent !important',
    width: '100% !important',
    height: '36px !important',
    color: '#FF463D !important',
    backgroundColor: '#FFF7F6 !important',
    borderRadius: '8px !important',
  },
  pending: {
    color: '#E0B300 !important',
    backgroundColor: '#FFFAE8 !important',
  },
  approved: {
    color: '#488C6E !important',
    backgroundColor: '#ECFDF3 !important',
  },
  selectApproved: {
    border: '1px solid #488C6E !important',
  },
  selectRejected: {
    border: '1px solid #FF463D !important',
  },
  selectPending: {
    border: '1px solid #E0B300 !important',
  },
});

const StatusDialog = ({
  open,
  handleClickOpen,
  handleCloseStatus,
  saleId,
  anchorEl,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(state => state.product.data);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [updatedSale, setUpdatedSale] = useState();

  useEffect(() => {
    const updatedElement = data.find(el => el.id === saleId);

    let copy = { ...updatedElement };

    for (const key in copy) {
      if (key === 'status') {
        copy[key] = selectedStatus;
      }
    }

    setUpdatedSale(copy);
  }, [selectedStatus]);

  const handleChange = () => {
    dispatch(updateStatus({ saleId, updatedSale }));
    handleCloseStatus();
  };

  return (
    <div>
      <Popover
        open={open}
        onClose={handleCloseStatus}
        sx={{
          width: '250px !important',
          display: 'flex',
          flexDirection: 'column',
        }}
        anchorEl={anchorEl}
        // elevation={1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ul className="list" style={{ paddingRight: 0 }}>
          <li className="list-item" style={{ margin: '0 10px' }}>
            <Button
              className={`${classes.buttonStatus} ${classes.approved} ${
                selectedStatus === 'approved' && classes.selectApproved
              }`}
              variant="outlined"
              onClick={() => setSelectedStatus('approved')}
            >
              <span className="list-span" style={{ textAlign: 'center' }}>
                təsdiqlənib
              </span>
            </Button>
          </li>
          <li className="list-item" style={{ margin: '0 10px' }}>
            <Button
              className={`${classes.buttonStatus} ${classes.pending} ${
                selectedStatus === 'pending' && classes.selectPending
              }`}
              onClick={() => setSelectedStatus('pending')}
              variant="outlined"
            >
              <span className="list-span" style={{ textAlign: 'center' }}>
                gözləyir
              </span>
            </Button>
          </li>
          <li className="list-item" style={{ margin: '0 10px' }}>
            <Button
              className={`${classes.buttonStatus} ${
                selectedStatus === 'rejected' && classes.selectRejected
              }`}
              variant="outlined"
              onClick={() => setSelectedStatus('rejected')}
            >
              <span className="list-span" style={{ textAlign: 'center' }}>
                xitam olunub
              </span>
            </Button>
          </li>
        </ul>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '0 15px',
          }}
        >
          <Button
            className={classes.button}
            onClick={handleCloseStatus}
            variant="outlined"
          >
            İmtina
          </Button>
          <Button
            onClick={handleChange}
            className={classes.button}
            autoFocus
            variant="contained"
            sx={{ margin: '40px 0' }}
          >
            Təsdiqlə
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default StatusDialog;
