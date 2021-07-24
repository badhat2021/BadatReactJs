import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, MenuItem, Button } from "@material-ui/core";
import {
  getCategory,
  registerUser,
  addToCartApi,
  getState,
  getDistrict,
} from "../AppApi";
import { ROUTE_CART } from "../Constant";
import "../AppAsset/CSS/Login.css";
import { cartItemCountHandle } from "../AppRedux/Action/CartItemCount";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { storeToken, checkLogin } from "../Util";
import { Redirect } from "react-router-dom";
import Footer from "../Component/Footer";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: false,
      mobile:
        this.props &&
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.mobile,
      mobileerror: false,
      user: "",
      userError: "",
      bussinessDomain: "",
      bussinessDomainError: false,
      pincode: "",
      pincodeError: false,
      state: "",
      stateError: false,
      district: "",
      districtError: false,
      streetAddress: "",
      streetAddressError: false,
      cityAddress: "",
      cityAddressError: false,
      errorMessage: "",
      bussinessDomainData: [],
      stateData: [],
      districtData: [],
      load: true,
      shopNameError: false,
      shopName: "",
      showDistrict: false,
    };
  }

  componentDidMount = async () => {
    console.log("mounted await register")
    const tempCategoryData = await getCategory();
    const tempState = await getState();
    console.log("mounted recieved register")
    this.setState({
      bussinessDomainData: tempCategoryData.data.data || [],
      load: false,
      stateData: tempState,
    });
  };

  onClickSubmitOtp = async () => {
    const param = {
      name: this.state.name,
      business_name: this.state.shopName,
      mobile: this.state.mobile,
      state: this.state.state,
      district: this.state.district,
      business_type: this.state.user,
      business_category: this.state.bussinessDomain,
      pincode: this.state.pincode,
      address: this.state.streetAddress,
      city: this.state.cityAddress,
    };
    if (this.validation()) {
      const registerTemp = await registerUser(param);
      if (registerTemp) {
        storeToken(this.props.location.state.token);
        console.log("-------------77777777")
        if (this.props.location.state && this.props.location.state.itemDetail) {
          const addToCartres = await addToCartApi(
            this.props.location.state.itemDetail
          );
          if (addToCartres) {
            Swal.fire({
              title: "Item Added to cart",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
              position: "top",
            });
            console.log("--------------12121212")
            this.props.cartItemCount();
            this.props.history.push(`/${ROUTE_CART}`);
          } else {
            Swal.fire({
              title: "Something Went wrong",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
              position: "top",
            });
          }
        } else if (
          this.props.location.state &&
          this.props.location.state.fromLoginButton
        ) {
          console.log("------------8888888888")
          this.props.cartItemCount();
          this.props.history.go(-2);
        } else {
          console.log("------------999999999")
          this.props.cartItemCount();
          this.props.history.push(`/`);
        }
      } else {
        console.log("---------------10101010")
        Swal.fire({
          title: "Something Went wrong",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top",
        });
      }
    }
  };

  onChangeHandle = async (e) => {
    const data = {
      ...this.state,
      [e.target.name]: e.target.value,
    };
    this.setState(data);

    if (e.target.name === "state") {
      const tempDistrictData = await getDistrict(e.target.value);
      this.setState({ districtData: tempDistrictData, showDistrict: true });
    }
  };

  validation = () => {
    this.setState({
      nameError: false,
      // mobileerror: false,
      userError: false,
      bussinessDomainError: false,
      streetAddressError: false,
      cityAddressError: false,
      pincodeError: false,
      stateError: false,
      districtError: false,
      shopNameError: false,
      errorMessage: "",
    });

    if (this.state.name === "") {
      this.setState({
        nameError: true,
        errorMessage: "This field is required",
      });
      return false;
    }
    // else if (
    //   this.state.mobile === "" ||
    //   this.state.mobile.length < 10 ||
    //   this.state.mobile.length > 10
    // ) {
    //   this.setState({
    //     mobileerror: true,
    //     errorMessage:
    //       this.state.mobile === ""
    //         ? "This field is required"
    //         : "Invalid Mobile Number (10 digit number required)",
    //   });
    //   return false;
    // }
    else if (this.state.shopName === "") {
      this.setState({
        shopNameError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (this.state.user === "") {
      this.setState({
        userError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (this.state.bussinessDomain === "") {
      this.setState({
        bussinessDomainError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (this.state.streetAddress === "") {
      this.setState({
        streetAddressError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (this.state.cityAddress === "") {
      this.setState({
        cityAddressError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (
      this.state.pincode === "" ||
      this.state.pincode.length < 6 ||
      this.state.pincode.length > 6
    ) {
      this.setState({
        pincodeError: true,
        errorMessage:
          this.state.pincode === ""
            ? "This field is required"
            : "Invalid Pin code",
      });
      return false;
    } else if (this.state.state === "") {
      this.setState({
        stateError: true,
        errorMessage: "This field is required",
      });
      return false;
    } else if (this.state.district === "") {
      this.setState({
        districtError: true,
        errorMessage: "This field is required",
      });
      return false;
    }
    return true;
  };

  render() {
    // if (checkLogin()) {
    //   console.log("-----------14141414")
    //   return <Redirect to="/" />;
    // }
    return (
      <>
        <Helmet>
          <title>{"Badat"}</title>
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
        <div className="loginContainer">
          <div className="loginFormContainer">
            <div style={{ textAlign: "center" }}>
              <strong>Enter details to complete your profile</strong>
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.name}
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                onChange={this.onChangeHandle}
              />
              {this.state.nameError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.mobile}
                name="mobile"
                label="Mobile Number"
                variant="outlined"
                type="number"
                disabled
                // onChange={this.onChangeHandle}
              />
              {/* {this.state.mobileerror ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null} */}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.shopName}
                name="shopName"
                type="text"
                label="Shop/Business Name"
                variant="outlined"
                onChange={this.onChangeHandle}
              />
              {this.state.shopNameError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                select
                defaultValue={this.state.user}
                name="user"
                label="You are a"
                variant="outlined"
                onChange={this.onChangeHandle}
              >
                <MenuItem key={"Retail"} value={"Retail"}>
                  {"Retail"}
                </MenuItem>
                <MenuItem key={"Distributer"} value={"Distributer"}>
                  {"Distributer"}
                </MenuItem>
                <MenuItem key={"Stockist"} value={"Stockist"}>
                  {"Stockist"}
                </MenuItem>
                <MenuItem key={"Manufacturer"} value={"Manufacturer"}>
                  {"Manufacturer"}
                </MenuItem>
                <MenuItem key={"Wholeseller"} value={"Wholeseller"}>
                  {"Wholeseller"}
                </MenuItem>
                <MenuItem key={"Agent"} value={"Agent"}>
                  {"Agent"}
                </MenuItem>
                <MenuItem key={"Brand"} value={"Brand"}>
                  {"Brand"}
                </MenuItem>
                <MenuItem key={"Supplier"} value={"Supplier"}>
                  {"Supplier"}
                </MenuItem>
                <MenuItem key={"OnlineSeller"} value={"OnlineSeller"}>
                  {"Online Seller"}
                </MenuItem>
                <MenuItem key={"Reseller"} value={"Reseller"}>
                  {"Reseller"}
                </MenuItem>
              </TextField>
              {this.state.userError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                select
                defaultValue={this.state.bussinessDomain}
                name="bussinessDomain"
                label="Bussiness Domain"
                variant="outlined"
                onChange={this.onChangeHandle}
              >
                {this.state.bussinessDomainData &&
                this.state.bussinessDomainData.length > 0
                  ? this.state.bussinessDomainData.map((res) => (
                      <MenuItem key={res.id} value={res.id}>
                        {res.name}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
              {this.state.bussinessDomainError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.streetAddress}
                name="streetAddress"
                label="Shop/House No. & Street Name"
                variant="outlined"
                onChange={this.onChangeHandle}
              />
              {this.state.streetAddressError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.cityAddress}
                name="cityAddress"
                label="City/Town/Village Area"
                variant="outlined"
                onChange={this.onChangeHandle}
              />
              {this.state.cityAddressError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                defaultValue={this.state.pincode}
                name="pincode"
                label="Pincode"
                variant="outlined"
                type="number"
                onChange={this.onChangeHandle}
              />
              {this.state.pincodeError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            <div className="loginFormField">
              <TextField
                fullWidth
                required
                select
                defaultValue={this.state.state}
                name="state"
                label="State"
                variant="outlined"
                onChange={this.onChangeHandle}
              >
                {this.state.stateData && this.state.stateData.length > 0
                  ? this.state.stateData.map((res) => (
                      <MenuItem key={res} value={res}>
                        {res}
                      </MenuItem>
                    ))
                  : null}
              </TextField>

              {this.state.stateError ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "x-small",
                    fontWeight: "700",
                  }}
                >
                  {this.state.errorMessage}
                </span>
              ) : null}
            </div>
            {this.state.showDistrict ? (
              <div className="loginFormField">
                <TextField
                  fullWidth
                  required
                  select
                  defaultValue={this.state.district}
                  name="district"
                  label="District"
                  variant="outlined"
                  onChange={this.onChangeHandle}
                >
                  {this.state.districtData && this.state.districtData.length > 0
                    ? this.state.districtData.map((res) => (
                        <MenuItem key={res} value={res}>
                          {res}
                        </MenuItem>
                      ))
                    : null}
                </TextField>
                {this.state.districtError ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "x-small",
                      fontWeight: "700",
                    }}
                  >
                    {this.state.errorMessage}
                  </span>
                ) : null}
              </div>
            ) : null}
            <div className="loginFormField">
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "50%",
                  marginLeft: "25%",
                  marginRight: "25%",
                }}
                onClick={this.onClickSubmitOtp}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  cartItemCount: () => dispatch(cartItemCountHandle()),
});

export default connect(null, mapDispatchToProps)(Register);
