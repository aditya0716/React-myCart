import React from "react";

const CartItem = (props) => {
  const { price, title, qty, id, img } = props.product;
  const {
    product,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onDeleteQuantity,
  } = props;
  //console.log(props);
  return (
    <div className="cart-item">
      <div className="left-block">
        {" "}
        <img style={styles.image} src={img} />{" "}
      </div>
      <div className="right-block">
        <div style={{ fontSize: 25 }}>{title}</div>
        <div style={{ color: "#777" }}>Rs {price}</div>
        <div style={{ color: "#777" }}>Qty: {qty}</div>
        <div className="cart-item-actions">
          <img
            alt="increase"
            className="action-icons"
            src="https://www.flaticon.com/svg/vstatic/svg/992/992651.svg?token=exp=1613671257~hmac=c4fc26a86c96547101916972e7823de1"
            onClick={() => onIncreaseQuantity(product)}
          />
          <img
            alt="decrease"
            className="action-icons"
            src="https://www.flaticon.com/svg/vstatic/svg/992/992683.svg?token=exp=1613671232~hmac=99aba0f945004ce38879f99817d8e7db"
            onClick={() => onDecreaseQuantity(product)}
          />
          <img
            alt="delete"
            className="action-icons"
            src="https://www.flaticon.com/svg/vstatic/svg/992/992660.svg?token=exp=1613671287~hmac=a4d59861125ec2aa4acd1b4daaf23737"
            onClick={() => onDeleteQuantity(id)}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  image: {
    height: 100,
    width: 110,
    borderRadius: 4,
    background: "#ccc",
  },
};

export default CartItem;
