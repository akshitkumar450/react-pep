import React, { useState } from 'react'
import { connect } from "react-redux";
import './CartItem.css';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { deleteFromCart, updateQty } from '../../../redux/actions';

function CartItem1({ item, updateQty, removeFromCart }) {
  const [input, setInput] = useState(item.qty);

  const onChangeHandler = (e) => {
    if (e.target.value > 0) {
      setInput(e.target.value);
      updateQty(item.id, e.target.value);
    }
  };

  return (
    <React.Fragment>
      <hr />
      <div className='itemContainer'>
        <div className='imgc'>
          <img src={item.image} alt={item.title} />
        </div>
        <div className='desc'>
          <div className='itemName'>
            <h3 >{item.title}</h3>
          </div>
          <div className='itemQuantity'>
            <label htmlFor="qty">Qty</label>
            <input
              min="1"
              type="number"
              id="qty"
              name="qty"
              value={input}
              onChange={onChangeHandler}
            />
          </div>
          <div className='itemdesc'>
            <p style={{ color: '#222f3e', fontFamily: 'cursive', textAlign: 'justify' }} >{item.description}</p>
          </div>
          <div className='pc'>
            <Button variant="contained" color="secondary"
              onClick={() => removeFromCart(item.id)}
            >
              <DeleteIcon />Delete
            </Button>
            <h3 style={{ marginTop: '1%', marginLeft: '4%' }}>₹ {item.price}</h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeFromCart: (id) => dispatch({ type: actionTypes.DELETE_FROM_CART, payload: { id: id } }),
//     adjustQty: (id, qty) => dispatch({ type: actionTypes.UPDATE_QTY, payload: { id: id, qty: qty } })
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (id) => dispatch(deleteFromCart(id)),
    updateQty: (id, qty) => dispatch(updateQty(id, qty))
  }
}

export default connect(null, mapDispatchToProps)(CartItem1);