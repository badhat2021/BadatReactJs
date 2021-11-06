import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import { addToCartApi } from "../AppApi";
import { checkLogin } from "../Util";
import { ROUTE_CART, ROUTE_PRODUCT_DETAIL, ROUTE_LOGIN } from "../Constant";
import { cartItemCountHandle } from "../AppRedux/Action/CartItemCount";
import Swal from "sweetalert2";
import "../AppAsset/CSS/ProductCard.css";
// import Login from "./Login";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
      showModal: false,
    };
  }

  // onLoginHandle = () => {
  //   this.setState({ showModal: true });
  // };

  // onLoginModalCloseHandle = () => {
  //   this.setState({ showModal: false });
  // };

  addToCartHandle = async (userId, id, quantity) => {
    const res = checkLogin();
    if (res === true) {
      const body = {
        product_id: id,
        vendor_id: userId,
        quantity: quantity,
      };
      await addToCartApi(body);
      Swal.fire({
        title: "Item Added to cart",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: "top",
      });
      this.props.cartItemCount();
    } else {
      const body = {
        product_id: id,
        vendor_id: userId,
        quantity: quantity,
      };
      this.props.history.push({
        pathname: `/${ROUTE_LOGIN}`,
        state: { itemDetail: body },
      });
    }
  };

  orderNowHandle = async (userId, id, quantity) => {
    const res = checkLogin();
    if (res === true) {
      const body = {
        product_id: id,
        vendor_id: userId,
        quantity: quantity,
      };
      await addToCartApi(body);
      Swal.fire({
        title: "Item Added to cart",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: "top",
      });
      this.props.cartItemCount();
      this.props.history.push(`/${ROUTE_CART}`);
    } else {
      const body = {
        product_id: id,
        vendor_id: userId,
        quantity: quantity,
      };
      this.props.history.push({
        pathname: `/${ROUTE_LOGIN}`,
        state: { itemDetail: body },
      });
    }
  };

  onProductClickHandle = (id) => {
    this.props.history.push(`/${ROUTE_PRODUCT_DETAIL}/${id}`);
  };

  render() {
    return (
      <div className="productCardContainer" key={this.props.data.id}>
        <div
          className="productCardImage"
          onClick={() => this.onProductClickHandle(this.props.data.id)}
        >
          <img
            src={
                this.props.data &&
                this.props.data.images &&
                this.props.data.images.length > 0 &&
                this.props.data.images[0].thumbnail?this.props.data.images[0].thumbnail :
              "../../default-img.png"
            }
            alt={this.props.data.name}
            width="100%"
            height="100%"
            style={{ borderRadius: "10px",objectFit:"cover" }}
          />
        </div>

        <div
          className="productCardDetail"
          onClick={() => this.onProductClickHandle(this.props.data.id)}
        >
          <div className="productDetailName">{this.props.data.name}</div>
          <div className="productDetailMoq1">Selling Price: Rs {this.props.data.price}</div>
          <div className="productDetailPrice">MRP:Rs {this.props.data.price}</div>
          <div className="productDetailPrice">MOQ : {this.props.data.moq}</div>
        </div>
        <div className="productCardButton">
          <div className="productCardButtons">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() =>
                this.addToCartHandle(
                  this.props.data.user_id,
                  this.props.data.id,
                  this.props.data.moq
                )
              }
              style={{
                height: "100%",
                backgroundColor: "rgb(300, 250, 250)",
                color: "black",
              }}
            >
              <span style={{ fontSize: "xx-small" }}>
                <b>Add to cart</b>
              </span>
            </Button>
          </div>
          <div className="productCardButtons">
            <Button
              fullWidth
              variant="contained"
              // color="secondary"
              onClick={() =>
                this.orderNowHandle(
                  this.props.data.user_id,
                  this.props.data.id,
                  this.props.data.moq
                )
              }
              style={{ height: "100%", backgroundColor: "rgb(255 , 111 , 0)" }}
            >
              <span style={{ fontSize: "xx-small" }}>
                <b>Order Now</b>
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  cartItemCount: () => dispatch(cartItemCountHandle()),
});

export default connect(null, mapDispatchToProps)(withRouter(ProductCard));
