import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import SliderCategory from "../Component/SliderCategory";
import { getVerticalCategory, getProducts, getDistrict } from "../AppApi";
import { Paper, Fab } from "@material-ui/core";
import { Helmet } from "react-helmet";
import {
  ROUTE_SUBCATEGORIES,
  ROUTE_ALL_PRODUCT,
  ENDPOINT_GET_SUB_CATEGORIES_BANNER,
} from "../Constant";
import Product from "../Component/Product";
import Banners from "../Component/Banners";
import {
  loginPopUp,
  checkSkip,
  checkLogin,
  checkBadatExpiration,
} from "../Util";
import "../AppAsset/CSS/VerticalCategory.css";
import Footer from "../Component/Footer";

class VerticleCategory extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      data: [],
      productData: [],
      verticleCategories: null,
      state: null,
      district: null,
      price: null,
      verticalCategoryList: [],
      districtList: [],
      drawer: false,
      sort: null,
      sortOrder: null,
    };
  }

  componentDidMount = async () => {
    const id = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    const res = await getVerticalCategory(id);
    this.setState({ load: false, data: res.data.data });
    const params = {
      subcategory_id: id,
    };
    const prod = await getProducts(params);
    this.setState({
      load: false,
      data: res.data.data,
      productData: prod.data.data.data,
    });
  };

  onClickHandle = (id) => {
    const tempString = `vertical=${id}&`;
    this.props.history.push(`/${ROUTE_ALL_PRODUCT}/${tempString}`);
  };

  onClickCategoryHandle = async (id) => {
    this.props.history.push(`/${ROUTE_SUBCATEGORIES}/${id}`);
  };

  onFilterChangeHandle = async (e) => {
    const name = e.target.name;
    this.setState({
      ...this.state,
      [name]: e.target.value,
    });

    if (e.target.name === "subCategories") {
      const tempVerticalData = await getVerticalCategory(e.target.value);
      this.setState({ verticalCategoryList: tempVerticalData.data.data });
    }

    if (e.target.name === "state") {
      const tempDistrictData = await getDistrict(e.target.value);
      this.setState({ districtList: tempDistrictData });
    }
  };

  onFilterReset = async () => {
    this.setState({
      drawer: false,
      load: true,
      sort: null,
      price: null,
      sortOrder: null,
      verticleCategories: null,
      state: null,
      district: null,
      districtList: [],
    });
    const id = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    const params = {
      subcategory_id: id,
    };
    const res = await getProducts(params);
    this.setState({
      load: false,
      productData:
        res.data && res.data.data && res.data.data.data
          ? res.data.data.data
          : [],
    });
  };

  onFilterSubmit = async () => {
    this.setState({ drawer: false, load: true, productData: [] });
    const params = {
      subcategory_id: window.location.href.slice(
        window.location.href.lastIndexOf("/") + 1
      ),
      vertical_id: this.state.verticleCategories,
      sortBy: this.state.sort,
      sortOrder: this.state.sortOrder,
      state: this.state.state,
      district: this.state.district,
    };
    const res = await getProducts(params);
    this.setState({
      load: false,
      productData:
        res.data && res.data.data && res.data.data.data
          ? res.data.data.data
          : [],
    });
  };

  onDrawerClick = (p) => {
    this.setState({ drawer: p });
  };

  render() {
    if (
      (!checkLogin() && !checkSkip()) ||
      (!checkLogin() && !checkBadatExpiration())
    ) {
      loginPopUp(this.props.history);
    }
    return (
      <LoadingOverlay active={this.state.load} spinner text="Loading...">
        <Helmet>
          <title>
            {this.state.productData && this.state.productData.length > 0
              ? this.state.productData[0].subcategory.name
              : "Badat"}
          </title>
          <meta name="keywords" content="badhat,badat,badat.in" />
          <meta
            name="description"
            content="Badat is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers.Badat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
          />
          <link
            rel="apple-touch-icon"
            href={
              this.state.productData && this.state.productData.length > 0
                ? this.state.productData[0].category.bg_image
                : "%https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
            }
          />
        </Helmet>
        <Fab
          variant="extended"
          size="small"
          // color="red"
          aria-label="add"
          style={{
            zIndex: "5",
            margin: 0,
            top: 300,
            right: -8,
            left: "auto",
            position: "fixed",
            height: 25,
            fontSize: "small",
            textAlign: "left",
            paddingLeft: 4,
            backgroundColor: "rgb(255, 171, 36)",
            textTransform: "capitalize",
          }}
          onClick={() =>
            window.open(
              "https://play.google.com/store/apps/details?id=com.badhat.app"
            )
          }
        >
          Open App
        </Fab>
        <div className="verticleCategoryContainer">
          <div className="categoryCardContainer_VerticleCategory">
            <SliderCategory
              onClickCategoryHandle={this.onClickCategoryHandle}
            />
          </div>
          <div className="selectedVerticleCategory">
            <div>
              {this.state.productData &&
              this.state.productData.length > 0 &&
              this.state.productData[0].category &&
              this.state.productData[0].category.name ? (
                <span>{`${this.state.productData[0].category.name}`}</span>
              ) : null}
              {this.state.productData &&
              this.state.productData.length > 0 &&
              this.state.productData[0].subcategory &&
              this.state.productData[0].subcategory.name ? (
                <span>{`>${this.state.productData[0].subcategory.name}`}</span>
              ) : null}
            </div>
            {this.state.data && this.state.data.length > 0 ? (
              <div
                className={
                  this.state.data && this.state.data.length < 5
                    ? "verticleCategoryGridContainer_Less_item"
                    : "verticleCategoryGridContainer"
                }
              >
                {this.state.data && this.state.data.length > 0
                  ? this.state.data.map((res) => (
                      <div
                        className="verticleCategorySliderCard"
                        key={res.id}
                        onClick={() => this.onClickHandle(res.id)}
                      >
                        <Paper className="verticleCategoryPaper" elevation={5}>
                          <div className="sliderCardVerticleCategoryName">
                            {res.name}
                          </div>
                        </Paper>
                      </div>
                    ))
                  : null}
              </div>
            ) : null}
          </div>
          <Banners
            endPoint={ENDPOINT_GET_SUB_CATEGORIES_BANNER}
            id={window.location.href.slice(
              window.location.href.lastIndexOf("/") + 1
            )}
          />
          <Product
            showCategoryFilter={false}
            showVerticleCategoriesFilter={true}
            showSubCategoryFilter={false}
            sortValue={this.state.sort}
            categoryValue={this.state.categoryId}
            verticleCategoriesValue={this.state.verticleCategories}
            subCategoriesValue={true}
            priceValue={this.state.price}
            onFilterChangeHandle={this.onFilterChangeHandle}
            onFilterReset={this.onFilterReset}
            onFilterSubmit={this.onFilterSubmit}
            productData={this.state.productData}
            verticalCategoryList={this.state.data}
            districtList={this.state.districtList}
            stateValue={this.state.state}
            districtValue={this.state.districtValue}
            sortOrderValue={this.state.sortOrder}
            drawer={this.state.drawer}
            onDrawerClick={this.onDrawerClick}
          />
        </div>
        <Footer />
      </LoadingOverlay>
    );
  }
}

export default withRouter(VerticleCategory);
