import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CartProductCard from "../Component/CartProductCard";
import LoadingOverlay from "react-loading-overlay";
import { cartItemCountHandle } from "../AppRedux/Action/CartItemCount";
import {
  getCartData,
  deleteCartData,
  placeOrder,
  removeFromCart,
} from "../AppApi";
import { Helmet } from "react-helmet";
import { Button } from "@material-ui/core";
import { addToCart, checkLogin } from "../Util";
import Swal from "sweetalert2";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import "../AppAsset/CSS/Cart.css";
import NoDataFound from "../Component/NoDataFound";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
      data: [],
      temp: true,
    };
  }

  componentDidMount = async () => {
    const cartData = await getCartData();
    this.setState({ data: cartData, load: false });
  };

  onClickAddQuantity = async (id, userId, quantity) => {
    this.setState({ load: true });
    const body = {
      product_id: id,
      vendor_id: userId,
      quantity: quantity,
    };
    await addToCart(body);
    setTimeout(async () => {
      const cartData = await getCartData();
      this.setState({ data: cartData, load: false });
      Swal.fire({
        title: "Item Added",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
        position: "top",
      });
    }, 1000);

    this.setState({ temp: !this.state.temp });
  };

  onClickSubQuantity = async (id) => {
    this.setState({ load: true });
    const res = await removeFromCart(id);
    if (res) {
      const cartData = await getCartData();
      this.setState({ data: cartData, load: false });
      Swal.fire({
        title: "Item Removed",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
        position: "top",
      });
    }
  };

  onDeleteCartProduct = async (id) => {
    this.setState({ load: true });
    await deleteCartData(id);
    const cartData = await getCartData();
    this.props.cartItemCount();
    this.setState({ data: cartData, load: false });
  };

  placeOrderHandle = async () => {
    const res = await placeOrder();
    if (res) {
      Swal.fire({
        title: "Order Placed Successfully",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
        position: "top",
      });
      const cartData = await getCartData();
      this.props.cartItemCount();
      this.setState({ data: cartData });
    }
  };

  render() {
    const totalPriceArray =
      this.state.data && this.state.data.length > 0
        ? this.state.data.map((res) => res.product.price * res.quantity)
        : 0;
    if (!checkLogin()) {
      return <Redirect to="/" />;
    }
    return (
      <LoadingOverlay active={this.state.load} spinner text="Loading...">
        <Helmet>
          <title>Cart</title>
          <meta name="keywords" content="badhat,badat,badat.in" />
          <meta
            name="description"
            content="Badat is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers.Badat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
          />
          <link
            rel="apple-touch-icon"
            href="https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
          />
        </Helmet>
        <div className="cartContainer">
          <div
            className="cartHeader"
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: "orangered",
            }}
          >
            Your Cart
          </div>
          {this.state.data && this.state.data.length > 0 ? (
            <>
              <div className="cartProductContainer">
                {this.state.data && this.state.data.length > 0
                  ? this.state.data.map((res) => (
                      <CartProductCard
                        key={res.id}
                        data={res}
                        onDelete={this.onDeleteCartProduct}
                        onAdd={this.onClickAddQuantity}
                        onSub={this.onClickSubQuantity}
                      />
                    ))
                  : "no data found"}
              </div>
              <div className="cartDetail">
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: "orangered",
                  }}
                >
                  Order Summary
                </div>
                <TableContainer component={Paper}>
                  <Table className="CartDetailTable" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Price/Item</TableCell>
                        <TableCell align="right">Total Quantity</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.data && this.state.data.length > 0
                        ? this.state.data.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.product.name}
                              </TableCell>
                              <TableCell align="right">
                                {row.product.price}
                              </TableCell>
                              <TableCell align="right">
                                {row.quantity}
                              </TableCell>
                              <TableCell align="right">
                                {row.quantity * row.product.price}
                              </TableCell>
                            </TableRow>
                          ))
                        : "no item in cart"}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div
                  style={{ width: "96%", marginLeft: "2%", marginRight: "2%" }}
                >
                  <span style={{ float: "left" }}>Sub Total : </span>
                  <span style={{ float: "Right" }}>
                    {this.state.data && this.state.data.length > 0
                      ? totalPriceArray.reduce((total, res) => {
                          return total + res;
                        })
                      : "no item in cart"}
                  </span>
                </div>
              </div>
              <div
                className="cartPlaceOrdersection"
                onClick={this.placeOrderHandle}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ height: "100%" }}
                >
                  Place Order
                </Button>
              </div>
            </>
          ) : (
            <NoDataFound content="Your Cart Is Empty" />
          )}
        </div>
      </LoadingOverlay>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  cartItemCount: () => dispatch(cartItemCountHandle()),
});

export default connect(null, mapDispatchToProps)(Cart);
