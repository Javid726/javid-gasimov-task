import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as Edit } from '../assets/svg/edit.svg';
import { ReactComponent as Delete } from '../assets/svg/delete.svg';
import { ReactComponent as Status } from '../assets/svg/statusChange.svg';

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AlertDialog from './AlertDialog';
import StatusDialog from './StatusDialog';

const useStyles = makeStyles({
  button: {
    textTransform: 'none !important',
    border: '1px solid #7C818D',
    color: '#5F646E !important',
    borderRadius: '8px !important',
    width: '100% !important',
  },
});

const PopOverComponent = ({ saleId }) => {
  const [openDialog, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorStatusEl, setAnchorStatusEl] = useState(null);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickStatus = event => {
    setAnchorStatusEl(event.currentTarget);
  };

  const handleCloseStatus = () => {
    setAnchorStatusEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openStatus = Boolean(anchorStatusEl);
  const idStatus = openStatus ? 'simple-popover-status' : undefined;

  return (
    <div>
      <button aria-describedby={id} className="button" onClick={handleClick}>
        <MoreVertIcon width="5px" />
      </button>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <ul className="list">
          <li className="list-item">
            <Button className={classes.button}>
              <Edit width="20" />
              <span className="list-span">Düzəliş et</span>
            </Button>
          </li>
          <li className="list-item">
            <Button className={classes.button} onClick={handleClickOpen}>
              <Delete width="20" />
              <span className="list-span">Sil</span>
            </Button>
          </li>
          <li className="list-item">
            <Button
              className={classes.button}
              aria-describedby={idStatus}
              onClick={handleClickStatus}
            >
              <Status width="20" />
              <span className="list-span">Statusu Dəyiş</span>
            </Button>
          </li>
        </ul>
      </Popover>
      <AlertDialog
        open={openDialog}
        handleClickOpen={handleClickOpen}
        handleClose={handleClickClose}
        saleId={saleId}
      />
      <StatusDialog
        open={openStatus}
        anchorEl={anchorStatusEl}
        handleCloseStatus={handleCloseStatus}
        saleId={saleId}
      />
    </div>
  );
};

export default PopOverComponent;
