/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import SliderCategory from "../Component/SliderCategory";
import SliderCategoryNew from "../Component/SliderCategoryNew";
import {
  getProducts,
  getSubCategory,
  getVerticalCategory,
  getDistrict,
} from "../AppApi";

import { Helmet } from "react-helmet";
import { Drawer, Fab } from "@material-ui/core";
import ShareIcon from "@mui/icons-material/Share";
import {
  ROUTE_SUBCATEGORIES,
  ROUTE_ALL_PRODUCT,
  ENDPOINT_GET_VERTICALS_BANNER,
  ROUTE_VERTICLE_CATEGORIES,
  hjid,
  hjsv,
} from "../Constant";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import Product from "../Component/AllProducts";
import "../AppAsset/CSS/AllProductPage.css";
import Banners from "../Component/Banners";
import {
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  PinterestIcon,
  InstapaperIcon,
  InstapaperShareButton,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  EmailShareButton,
  LinkedinIcon,
  EmailIcon,
} from "react-share";
import {
  loginPopUp,
  checkSkip,
  checkLogin,
  checkBadatExpiration,
  getCatId,
  swapToTop,
} from "../Util";
import Footer from "../Component/Footer";
import { hotjar } from "react-hotjar";
import { Paper } from "@mui/material";

const vertical = "vertical=";
const categoryId = "categoryId=";
const subCategoryId = "subCategoryId=";
const state = "state=";
const sortBy = "sortBy=";
const sortOrder = "sortOrder=";
const search = "search=";
const district = "district=";

class AllProductPage extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      productData: [],
      searchKey: null,
      sort: [],
      sortOrder: [],
      category: [],
      verticleCategories: [],
      subCategories: [],
      state: [],
      district: [],
      price: null,
      subCategoryList: [],
      verticalCategoryList: [],
      districtList: [],
      drawer: false,
      shareDrawer: false,
      params: { page: 1 },
      dataList: [],
      type: "all",
    };
  }

  componentDidMount = async () => {
    //Code For the hotjar
    hotjar.initialize(hjid, hjsv);
    hotjar.event("All Products page Loaded");
    const tempString = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    let verticalIdTemp = null;
    let categoryIdTemp = null;
    let subCategoryIdTemp = null;
    let stateTemp = null;
    let districtTemp = null;
    let sortByTemp = null;
    let sortOrderTemp = null;
    let searchkeyTemp = null;

    if (tempString.indexOf(vertical) !== -1) {
      verticalIdTemp = tempString.slice(
        tempString.indexOf(vertical) + vertical.length,
        tempString.indexOf("&", tempString.indexOf(vertical) + vertical.length)
      );
    }
    if (tempString.indexOf(categoryId) !== -1) {
      categoryIdTemp = tempString.slice(
        tempString.indexOf(categoryId) + categoryId.length,
        tempString.indexOf(
          "&",
          tempString.indexOf(categoryId) + categoryId.length
        )
      );
      const tempSubCategoryList = await getSubCategory(
        parseInt(categoryIdTemp, 10)
      );
      this.setState({ subCategoryList: tempSubCategoryList.data.data });
    }
    if (tempString.indexOf(subCategoryId) !== -1) {
      subCategoryIdTemp = tempString.slice(
        tempString.indexOf(subCategoryId) + subCategoryId.length,
        tempString.indexOf(
          "&",
          tempString.indexOf(subCategoryId) + subCategoryId.length
        )
      );
      const tempVerticalData = await getVerticalCategory(
        parseInt(subCategoryIdTemp, 10)
      );
      this.setState({ verticalCategoryList: tempVerticalData.data.data });
    }
    if (tempString.indexOf(state) !== -1) {
      stateTemp = tempString.slice(
        tempString.indexOf(state) + state.length,
        tempString.indexOf("&", tempString.indexOf(state) + state.length)
      );
      const tempDistrictData = await getDistrict(stateTemp);

      this.setState({ districtList: tempDistrictData });
    }
    if (tempString.indexOf(district) !== -1) {
      districtTemp = tempString.slice(
        tempString.indexOf(district) + district.length,
        tempString.indexOf("&", tempString.indexOf(district) + district.length)
      );
    }
    if (tempString.indexOf(sortBy) !== -1) {
      sortByTemp = tempString.slice(
        tempString.indexOf(sortBy) + sortBy.length,
        tempString.indexOf("&", tempString.indexOf(sortBy) + sortBy.length)
      );
    }
    if (tempString.indexOf(sortOrder) !== -1) {
      sortOrderTemp = tempString.slice(
        tempString.indexOf(sortOrder) + sortOrder.length,
        tempString.indexOf(
          "&",
          tempString.indexOf(sortOrder) + sortOrder.length
        )
      );
    }
    if (tempString.indexOf(search) !== -1) {
      searchkeyTemp = tempString.slice(
        tempString.indexOf(search) + search.length,
        tempString.indexOf("&", tempString.indexOf(search) + search.length)
      );
    }

    const catId = getCatId(
      decodeURIComponent(this.props.location.search)
        .split("?")[1]
        ?.split("=")[1]
    );

    const subCatId = decodeURIComponent(this.props.location.search)
      .split("?")[2]
      ?.split("=")[1];

    const verticalId = this.props.match.params.key;

    const params = {
      search_key: searchkeyTemp,
      category_id: catId,
      vertical_id: verticalId,
      subcategory_id: subCatId,
      state: stateTemp,
      district: districtTemp,
      sortBy: sortByTemp,
      sortOrder: sortOrderTemp,
      page: 1,
    };

    const prod = await getProducts(params);

    this.setState({
      load: false,
      productData: (prod.data && prod.data.data) || prod.data.data || {},
      searchKey: searchkeyTemp,
      verticleCategories: verticalIdTemp ? parseInt(verticalIdTemp, 10) : null,
      category: categoryIdTemp ? parseInt(categoryIdTemp, 10) : null,
      subCategories: subCategoryIdTemp ? parseInt(subCategoryIdTemp, 10) : null,
      state: stateTemp ? stateTemp.replace(/%20/g, " ") : null,
      district: districtTemp ? districtTemp.replace(/%20/g, " ") : null,
      sort: sortByTemp,
      sortOrder: sortOrderTemp,
      catId,
      subCatId,
      verticalId,
    });

    if (
      this.state.productData &&
      this.state.productData.data &&
      this.state.productData.data.length
    ) {
      let lists = [...this.state.dataList, ...this.state.productData.data];
      this.setState({ dataList: lists });
    }

    const response = await getSubCategory(catId);
    const res = await getVerticalCategory(subCatId);

    if (res.data.data && res.data.data.length > 0) {
      this.setState({
        sections:
          res.data.data && res.data.data.length > 0
            ? [
                {
                  id: "",
                  name: "All",
                  subcategory_id: "",
                  updated_at: "",
                  created_at: "",
                },
                ...res.data.data,
              ]
            : res.data.data,
      });
    }
    if (response.data.data && response.data.data.length > 0) {
      this.setState({
        subCats:
          response.data.data && response.data.data.length
            ? [
                {
                  id: "",
                  name: "All",
                  category_id: "",
                  updated_at: "",
                  created_at: "",
                  verticals: [],
                },
                ...response.data.data,
              ]
            : response.data.data,
        selectedSubCategory: +decodeURIComponent(this.props.location.search)
          .split("?")[2]
          ?.split("=")[1],
        selectedCat: decodeURIComponent(this.props.location.search)
          .split("?")[1]
          ?.split("=")[1],
      });
    }
  };

  getProductList = async () => {
    const params = {
      search_key: this.state.searchKey,
      category_id: this.state.catId,
      vertical_id: this.state.verticalId,
      subcategory_id: this.state.subCatId,
      state: this.state.state,
      district: this.state.district,
      sortBy: this.state.sort,
      sortOrder: this.state.sortOrder,
      page: 1,
    };
    this.setState({ params, load: true });
    const prod = await getProducts(params);
    this.setState({
      load: false,
      // productData:
      //   prod.data && prod.data.data && prod.data.data.data
      //     ? prod.data.data.data
      //     : [],
      productData: (prod.data && prod.data.data) || prod.data.data || {},
    });

    if (
      this.state.productData &&
      this.state.productData.data &&
      this.state.productData.data.length
    ) {
      let lists = [...this.state.dataList, ...this.state.productData.data];
      this.setState({ dataList: lists });
    }
  };

  pageChangeCallback = async (id) => {
    if (id === "all") {
      const params = {
        category_id: this.state.catId,
        vertical_id: this.state.verticalId,
        subcategory_id: this.state.subCatId,
        page: this.state.productData.current_page + 1,
      };
      const prod = await getProducts(params);
      this.setState({
        load: false,
        productData: (prod.data && prod.data.data) || prod.data.data || {},
      });

      if (
        this.state.productData &&
        this.state.productData.data &&
        this.state.productData.data.length
      ) {
        let lists = [...this.state.dataList, ...this.state.productData.data];
        this.setState({ dataList: lists });
      }
    }
    if (id !== "all") {
      const params = {
        category_id: this.state.catId,
        vertical_id: this.state.verticalId,
        subcategory_id: this.state.subCatId,
        sortBy: this.state.sort,
        sortOrder: this.state.sortOrder,
        state: this.state.state,
        district: this.state.district,
        page: 1,
      };
      params.page = id + 1;
      const prod = await getProducts(params);
      this.setState({
        load: false,
        productData: (prod.data && prod.data.data) || prod.data.data || {},
      });

      if (
        this.state.productData &&
        this.state.productData.data &&
        this.state.productData.data.length
      ) {
        let lists = [...this.state.dataList, ...this.state.productData.data];
        this.setState({ dataList: lists });
      }
    }
  };

  verticalCall = async (page) => {
    const tempString = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    let verticalIdTemp = null;
    let categoryIdTemp = null;
    let subCategoryIdTemp = null;
    let stateTemp = null;
    let districtTemp = null;
    let sortByTemp = null;
    let sortOrderTemp = null;
    let searchkeyTemp = null;

    if (tempString.indexOf(vertical) !== -1) {
      verticalIdTemp = tempString.slice(
        tempString.indexOf(vertical) + vertical.length,
        tempString.indexOf("&", tempString.indexOf(vertical) + vertical.length)
      );
    }
    if (tempString.indexOf(categoryId) !== -1) {
      categoryIdTemp = tempString.slice(
        tempString.indexOf(categoryId) + categoryId.length,
        tempString.indexOf(
          "&",
          tempString.indexOf(categoryId) + categoryId.length
        )
      );
      const tempSubCategoryList = await getSubCategory(
        parseInt(categoryIdTemp, 10)
      );
      this.setState({ subCategoryList: tempSubCategoryList.data.data });
    }
    if (tempString.indexOf(subCategoryId) !== -1) {
      subCategoryIdTemp = tempString.slice(
        tempString.indexOf(subCategoryId) + subCategoryId.length,
        tempString.indexOf(
          "&",
          tempString.indexOf(subCategoryId) + subCategoryId.length
        )
      );
      const tempVerticalData = await getVerticalCategory(
        parseInt(subCategoryIdTemp, 10)
      );
      this.setState({ verticalCategoryList: tempVerticalData.data.data });
    }
    if (tempString.indexOf(state) !== -1) {
      stateTemp = tempString.slice(
        tempString.indexOf(state) + state.length,
        tempString.indexOf("&", tempString.indexOf(state) + state.length)
      );
      const tempDistrictData = await getDistrict(stateTemp);

      this.setState({ districtList: tempDistrictData });
    }
    if (tempString.indexOf(district) !== -1) {
      districtTemp = tempString.slice(
        tempString.indexOf(district) + district.length,
        tempString.indexOf("&", tempString.indexOf(district) + district.length)
      );
    }
    if (tempString.indexOf(sortBy) !== -1) {
      sortByTemp = tempString.slice(
        tempString.indexOf(sortBy) + sortBy.length,
        tempString.indexOf("&", tempString.indexOf(sortBy) + sortBy.length)
      );
    }
    if (tempString.indexOf(sortOrder) !== -1) {
      sortOrderTemp = tempString.slice(
        tempString.indexOf(sortOrder) + sortOrder.length,
        tempString.indexOf(
          "&",
          tempString.indexOf(sortOrder) + sortOrder.length
        )
      );
    }
    if (tempString.indexOf(search) !== -1) {
      searchkeyTemp = tempString.slice(
        tempString.indexOf(search) + search.length,
        tempString.indexOf("&", tempString.indexOf(search) + search.length)
      );
    }
    const params = {
      search_key: searchkeyTemp,
      category_id: this.state.catId,
      vertical_id: this.state.verticalId,
      subcategory_id: this.state.subCatId,
      state: stateTemp,
      district: districtTemp,
      sortBy: sortByTemp,
      sortOrder: sortOrderTemp,
      page: page + 1,
    };
    const prod = await getProducts(params);
    this.setState({
      load: false,
      productData: (prod.data && prod.data.data) || prod.data.data || {},
    });

    if (
      this.state.productData &&
      this.state.productData.data &&
      this.state.productData.data.length
    ) {
      let lists = [...this.state.dataList, ...this.state.productData.data];
      this.setState({ dataList: lists });
    }
  };

  onClickCategoryHandle = async (id, query) => {
    this.props.history.push(`/${ROUTE_SUBCATEGORIES}/${id}?cat=${query}`);
  };

  onFilterChangeHandle = async (e) => {
    const name = e.target.name;
    this.setState({
      ...this.state,
      [name]: e.target.value,
    });

    if (e.target.name === "category") {
      const tempSubCategoryList = await getSubCategory(e.target.value);
      this.setState({ subCategoryList: tempSubCategoryList.data.data });
    }

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
      category: null,
      load: true,
      sort: null,
      price: null,
      sortOrder: null,
      verticleCategories: null,
      subCategories: null,
      state: null,
      district: null,
      subCategoryList: [],
      verticalCategoryList: [],
      districtList: [],
    });
    const params = {
      page: 1,
    };
    this.setState({ params, load: true });
    const prod = await getProducts(params);
    this.setState({
      load: false,
      productData: prod.data && prod.data.data ? prod.data.data : {},
    });
  };

  onFilterSubmit = async () => {
    this.setState({ drawer: false, load: true, productData: [] });
    const params = {
      category_id: this.state.catId,
      vertical_id: this.state.verticalId,
      subcategory_id: this.state.subCatId,
      sortBy: this.state.sort,
      sortOrder: this.state.sortOrder,
      state: this.state.state,
      district: this.state.district,
      page: 1,
    };
    this.setState({ load: true, params });
    const prod = await getProducts(params);
    this.setState({
      load: false,
      productData: prod.data && prod.data.data ? prod.data.data : {},
    });

    if (
      this.state.productData &&
      this.state.productData.data &&
      this.state.productData.data.length
    ) {
      let lists = [...this.state.dataList, ...this.state.productData.data];
      this.setState({ dataList: lists });
    }
  };

  onDrawerClick = (p) => {
    this.setState({ drawer: p });
  };

  onShareDrawerClick = (p) => {
    this.setState({ shareDrawer: p });
  };

  onClickGenerateShareLink = () => {
    let tempUrl = window.location.hostname + "/all-product/";
    if (this.state.searchKey !== null && this.state.searchKey !== "") {
      tempUrl = `${tempUrl}search=${this.state.searchKey}&`;
    }
    if (this.state.category !== null) {
      tempUrl = `${tempUrl}categoryId=${this.state.category}&`;
    }
    if (this.state.subCategories !== null) {
      tempUrl = `${tempUrl}subCategoryId=${this.state.subCategories}&`;
    }
    if (this.state.verticleCategories !== null) {
      tempUrl = `${tempUrl}vertical=${this.state.verticleCategories}&`;
    }
    if (this.state.state !== null) {
      tempUrl = `${tempUrl}state=${this.state.state}&`;
    }
    if (this.state.district !== null) {
      tempUrl = `${tempUrl}district=${this.state.district}&`;
    }
    if (this.state.sort !== null) {
      tempUrl = `${tempUrl}sortBy=${this.state.sort}&`;
    }
    if (this.state.sortOrder !== null) {
      tempUrl = `${tempUrl}sortOrder=${this.state.sortOrder}&`;
    }
    return tempUrl;
  };

  onClickHandle = (secId) => {
    if (secId === "") {
      this.props.history.push(
        `/${ROUTE_VERTICLE_CATEGORIES}/${this.state.selectedSubCategory}?cat=${this.state.selectedCat}`
      );
      return;
    }
    this.props.history.push(
      `/${ROUTE_ALL_PRODUCT}/${secId}?cat=${this.state.selectedCat}?subCat=${this.state.selectedSubCategory}`
    );
    window.location.reload();
  };

  onClickSubCatHandle = (id) => {
    this.props.history.push(
      `/${ROUTE_VERTICLE_CATEGORIES}/${this.state.selectedSubCategory}?cat=${this.state.selectedCat}`
    );
    window.location.reload();
  };

  render() {
    if (
      (!checkLogin() && !checkSkip()) ||
      (!checkLogin() && !checkBadatExpiration())
    ) {
      //loginPopUp(this.props.history);
    }

    return (
      <LoadingOverlay active={this.state.load} spinner text="Loading...">
        <Helmet>
          <title>
            {this.state.productData && this.state.productData.length > 0
              ? (this.state.productData[0].vertical &&
                  this.state.productData[0].vertical.name) ||
                (this.state.productData[0].subcategory &&
                  this.state.productData[0].subcategory.name) ||
                (this.state.productData[0].category &&
                  this.state.productData[0].category.name) ||
                "Zulk"
              : "Zulk"}
          </title>
          <meta name="keywords" content="badhat,badat,badhat.app" />
          <meta
            name="description"
            content="Zulk is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers.Badhat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
            integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
            crossorigin="anonymous"
          />
          <link
            rel="apple-touch-icon"
            href={
              //   this.state.productData && this.state.productData.length > 0
              //     ? this.state.productData[0].category.bg_image
              //     : "https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
              //
              "https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
            }
          />
        </Helmet>
        <Fab
          variant="extended"
          size="small"
          color="red"
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
        {checkLogin() ? (
          <Snackbar
            className="Snackbar-br"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={true}
            key={"bottom right"}
          >
            <Link to="/products/new" className="linkStyle">
              <Button
                variant="contained"
                className="addprdBTN"
                color="primary"
                startIcon={<AddIcon />}
              >
                Save Product
              </Button>
            </Link>
          </Snackbar>
        ) : (
          ""
        )}

        <div className="AllProductPageContainer">
          <div className="AllProductPageCategoryCardContainer">
            <SliderCategoryNew
              onClickCategoryHandle={this.onClickCategoryHandle}
              categoryId={getCatId(
                decodeURIComponent(this.props.location.search)
                  .split("?")[1]
                  ?.split("=")[1]
              )}
            />
          </div>
          {this.state.subCats && this.state.subCats.length > 0 ? (
            <div className="selectedSubCategory">
              <div className="subCategoryGridContainer h-fix">
                {this.state.subCats && this.state.subCats.length > 0
                  ? swapToTop(
                      this.state.subCats,
                      1,
                      this.state.selectedSubCategory
                    )?.map((res) => (
                      <div
                        className="subCategorySliderCard"
                        key={res.id}
                        onClick={() =>
                          this.onClickSubCatHandle(
                            res.id,
                            res.category_id || this.state.catId
                          )
                        }
                      >
                        <Paper
                          className="subCategoryPaperNew"
                          style={{
                            backgroundColor:
                              this.state.selectedSubCategory == res.id
                                ? "#0d6efd"
                                : "#fff",
                            cursor: "pointer",
                            borderRadius: "2px",
                          }}
                          elevation={2}
                        >
                          <div className="sliderCardSubCategoryName wrap">
                            {res.name}
                          </div>
                        </Paper>
                      </div>
                    ))
                  : "no data found"}
              </div>
            </div>
          ) : null}

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
            {this.state.sections && this.state.sections.length > 0 ? (
              <div className="verticleCategoryGridContainer h-fix">
                {this.state.sections && this.state.sections.length > 0
                  ? swapToTop(
                      this.state.sections,
                      1,
                      this.props.match.params.key
                    )?.map((res) => (
                      <div
                        className="verticleCategorySliderCard"
                        key={res.id}
                        onClick={() =>
                          this.onClickHandle(
                            res.id,
                            this.props.history.location.search
                          )
                        }
                      >
                        <div
                          className="verticleCategoryPaperNew"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <div
                            className="sliderCardVerticleCategoryName"
                            style={{
                              backgroundColor:
                                this.props.match.params.key == res.id
                                  ? "#0d6efd"
                                  : "#fff",
                            }}
                          >
                            {res.name}
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            ) : null}
          </div>
          <div className="AllProductPageProductCardContainer">
            <div className="BreadcrumAndShareButtonContainer">
              <div style={{ width: "50%", textAlign: "left" }}>
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
                {this.state.productData &&
                this.state.productData.length > 0 &&
                this.state.productData[0].vertical &&
                this.state.productData[0].vertical.name ? (
                  <span>{`>${this.state.productData[0].vertical.name}`}</span>
                ) : null}
              </div>
              <div
                className="allProductShareButton"
                onClick={() => this.onShareDrawerClick(true)}
                style={{ textAlign: "right" }}
              >
                <ShareIcon />
              </div>
            </div>
            <>
              <Drawer
                anchor="bottom"
                open={this.state.shareDrawer}
                onClose={() => this.onShareDrawerClick(false)}
              >
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    padding: "5px",
                  }}
                >
                  <div className="ProductDetailShareButton">
                    <WhatsappShareButton url={this.onClickGenerateShareLink()}>
                      <WhatsappIcon />
                    </WhatsappShareButton>
                  </div>
                  <div className="ProductDetailShareButton">
                    <FacebookShareButton url={this.onClickGenerateShareLink()}>
                      <FacebookIcon />
                    </FacebookShareButton>
                  </div>
                  <div className="ProductDetailShareButton">
                    <TelegramShareButton url={this.onClickGenerateShareLink()}>
                      <TelegramIcon />
                    </TelegramShareButton>
                  </div>
                  <div className="ProductDetailShareButton">
                    <TwitterShareButton url={this.onClickGenerateShareLink()}>
                      <TwitterIcon />
                    </TwitterShareButton>
                  </div>
                  <div className="ProductDetailShareButton">
                    <PinterestShareButton url={this.onClickGenerateShareLink()}>
                      <PinterestIcon />
                    </PinterestShareButton>
                  </div>
                  <div className="ProductDetailShareButton">
                    <LinkedinShareButton url={this.onClickGenerateShareLink()}>
                      <LinkedinIcon />
                    </LinkedinShareButton>
                  </div>
                  <div className="ProductDetailShareButton">
                    <EmailShareButton url={this.onClickGenerateShareLink()}>
                      <EmailIcon />
                    </EmailShareButton>
                  </div>
                  <div className="ProductDetailShareButton">
                    <InstapaperShareButton
                      url={this.onClickGenerateShareLink()}
                    >
                      <InstapaperIcon />
                    </InstapaperShareButton>
                  </div>
                </div>
              </Drawer>
            </>
            {this.state.verticleCategories ? (
              <Banners
                endPoint={ENDPOINT_GET_VERTICALS_BANNER}
                id={this.state.verticleCategories}
              />
            ) : null}
            {this.state.load ? (
              ""
            ) : (
              <Product
                showCategoryFilter={true}
                showVerticleCategoriesFilter={true}
                showSubCategoryFilter={true}
                sortValue={this.state.sort}
                categoryValue={this.state.category}
                verticleCategoriesValue={this.state.verticleCategories}
                subCategoriesValue={this.state.subCategories}
                priceValue={this.state.price}
                onFilterChangeHandle={this.onFilterChangeHandle}
                onFilterReset={this.onFilterReset}
                onFilterSubmit={this.onFilterSubmit}
                verticalCategoriesId={
                  this.state.subCategories ? this.state.subCategories : null
                }
                productData={this.state.productData}
                pageChangeCallback={this.pageChangeCallback}
                subCategoryList={this.state.subCategoryList}
                verticalCategoryList={this.state.verticalCategoryList}
                districtList={this.state.districtList}
                stateValue={this.state.state}
                districtValue={this.state.district}
                sortOrderValue={this.state.sortOrder}
                drawer={this.state.drawer}
                onDrawerClick={this.onDrawerClick}
                type={this.state.type}
                verticalCall={this.verticalCall}
                dataList={this.state.dataList}
              />
            )}
          </div>
        </div>
        <Footer />
      </LoadingOverlay>
    );
  }
}

export default withRouter(AllProductPage);
