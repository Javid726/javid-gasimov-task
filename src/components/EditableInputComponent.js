import { TextField } from '@mui/material';
import { changeQuantityOfProduct } from '../store/addSaleSlice';
import { useDispatch } from 'react-redux';

const EditableInputComponent = ({ editedItem }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = event => {
    dispatch(
      changeQuantityOfProduct({
        value: event.target.value,
        itemId: editedItem.product_id,
      }),
    );
  };

  return (
    <TextField
      InputProps={{
        style: {
          fontSize: '14px',
          fontFamily: 'Open Sans',
          fontWeight: '400',
          padding: '0',
          height: '40px',
          width: '80px',
          borderRadius: '10px',
        },
      }}
      value={editedItem.product_quantity}
      onChange={handleQuantityChange}
      type="number"
      variant="outlined"
    />
  );
};

export default EditableInputComponent;
