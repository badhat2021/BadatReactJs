/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { hotjar } from "react-hotjar";
import LoadingOverlay from "react-loading-overlay";
import SliderCategoryNew from "../Component/SliderCategoryNew";
import { getSelectNameSub } from "../Util/index";

import {
  getSubCategory,
  getProducts,
  getDistrict,
  getVerticalCategory,
} from "../AppApi";
import { Helmet } from "react-helmet";
import { Paper, Fab } from "@material-ui/core";
import "../AppAsset/CSS/SubCategory.css";
import {
  ROUTE_VERTICLE_CATEGORIES,
  ENDPOINT_GET_CATEGORIES_BANNER,
  ROUTE_SUBCATEGORIES,
  hjid,
  hjsv,
} from "../Constant";
import Product from "../Component/Product";
import Banners from "../Component/Banners";
import { checkSkip, checkLogin, checkBadatExpiration } from "../Util";
import Footer from "../Component/Footer";

class SubCategory extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      data: [],
      sort: [],
      sortOrder: [],
      categoryId: this?.props?.match?.params?.id,
      selectedSubCategory: "",
      verticleCategories: [],
      subCategories: [],
      state: [],
      district: null,
      price: null,
      productData: [],
      subCategoryList: [],
      verticalCategoryList: [],
      districtList: [],
      drawer: false,
      dataList: [],
      type: "category",
      params: { page: 1, category_id: this?.props?.match?.params?.id },
      verticalDataItem: [],
      openProductList: true,
    };
  }

  componentDidMount = async () => {
    //Code For the hotjar
    hotjar.initialize(hjid, hjsv);
    hotjar.event("Home-page Loaded");
    const id = this.state.categoryId || this?.props?.match?.params?.id;
    const params = {
      category_id: id,
      page: 1,
    };

    this.setState({ params });
    const res = await getSubCategory(id);
    const prod = await getProducts(params);

    if (
      this.state.prod &&
      this.state.prod.data &&
      this.state.prod.data.length
    ) {
      let lists = [...this.state.dataList, ...this.state.prod.data];
      this.setState({ dataList: lists });
    }

    this.setState({
      load: false,
      data:
        res.data.data && res.data.data.length
          ? [
              {
                id: "",
                name: "All",
                category_id: "",
                updated_at: "",
                created_at: "",
                verticals: [],
              },
              ...res.data.data,
            ]
          : res.data.data,
      subCategoryList:
        res.data.data && res.data.data.length
          ? [
              {
                id: "",
                name: "All",
                category_id: "",
                updated_at: "",
                created_at: "",
                verticals: [],
              },
              ...res.data.data,
            ]
          : res.data.data,
      productData: (prod.data && prod.data.data) || prod.data.data || {},
      categoryId: id,
    });
  };

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.location.pathname !== this.props.location.pathname) {
  //     const id = this.state.categoryId || this?.props?.match?.params?.id;

  //     console.log("id did update :>> ", id, this.state);
  //     const params = {
  //       category_id: id,
  //       page: 1,
  //     };
  //     this.setState({ params });
  //     const res = await getSubCategory(id);
  //     const prod = await getProducts(params);

  //     console.log("res in click", params, res);

  //     this.setState({
  //       load: false,
  //       data:
  //         res.data.data && res.data.data.length
  //           ? [
  //               {
  //                 id: "",
  //                 name: "All",
  //                 category_id: "",
  //                 updated_at: "",
  //                 created_at: "",
  //                 verticals: [],
  //               },
  //               ...res.data.data,
  //             ]
  //           : res.data.data,
  //       subCategoryList:
  //         res.data.data && res.data.data.length
  //           ? [
  //               {
  //                 id: "",
  //                 name: "All",
  //                 category_id: "",
  //                 updated_at: "",
  //                 created_at: "",
  //                 verticals: [],
  //               },
  //               ...res.data.data,
  //             ]
  //           : res.data.data,
  //       productData: (prod.data && prod.data.data) || prod.data.data || {},
  //       category_id: id,
  //     });
  //   }
  // };

  onClickHandle = (id, catId) => {
    const query = getSelectNameSub(catId);
    this.setState({
      selectedSubCategory: id,
    });

    if (id === "") {
      this.props.history.push(
        `/${ROUTE_SUBCATEGORIES}/${
          this.state.categoryId
        }?cat=${getSelectNameSub(+this.state.categoryId)}`
      );
      return;
    }

    this.props.history.push(`/${ROUTE_VERTICLE_CATEGORIES}/${id}?cat=${query}`);
  };

  onClickCategoryHandle = async (id, query) => {
    this.props.history.push(`/${ROUTE_SUBCATEGORIES}/${id}?cat=${query}`);
    this.setState({
      load: true,
      data: [],
      params: { ...this.state.params, category_id: id },
    });
    const params = {
      category_id: id,
      page: 1,
    };
    const res = await getSubCategory(id);
    const prod = await getProducts(params);

    this.setState({ params });

    this.setState({
      load: false,
      data:
        res.data.data && res.data.data.length
          ? [
              {
                id: "",
                name: "All",
                category_id: "",
                updated_at: "",
                created_at: "",
                verticals: [],
              },
              ...res.data.data,
            ]
          : res.data.data,
      subCategoryList:
        res.data.data && res.data.data.length
          ? [
              {
                id: "",
                name: "All",
                category_id: "",
                updated_at: "",
                created_at: "",
                verticals: [],
              },
              ...res.data.data,
            ]
          : res.data.data,
      productData: (prod.data && prod.data.data) || prod.data.data || {},
      categoryId: id,
      params,
    });

    if (
      this.state.prod &&
      this.state.prod.data &&
      this.state.prod.data.length
    ) {
      let lists = [...this.state.dataList, ...this.state.prod.data];
      this.setState({ dataList: lists });
    }

    await this.onFilterSubmit();
    window.location.reload();
  };

  onFilterChangeHandle = async (e) => {
    const name = e.target.name;

    this.setState({
      ...this.state,
      [name]: e.target.value,
    });
    console.log(
      "namemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      e.target.name
    );
    typeof value === "string" ? e.target.value.split(",") : e.target.valuevalue;
    if (e.target.name === "category") {
      const tempSubCategoryList = await getSubCategory(e.target.value);
      this.setState({ subCategoryList: tempSubCategoryList.data.data });
    }

    if (e.target.name === "subCategories") {
      console.log("inside the value", e.target.value);
      let data = e.target.value;
      for (let i = 0; i <= data.length; i++) {
        const tempVerticalData = await getVerticalCategory(data[i]);
        console.log("temp vvvvvvvvvvvvvvvvvvvvv", tempVerticalData);
        let second = [];
        second = tempVerticalData.data;
        this.setState({
          verticalDataItem: tempVerticalData.data && tempVerticalData.data,
        });
        console.log(
          "verticalDataItemverticalDataItem",
          this.state.verticalDataItem
        );

        if (second.message === "Verticals") {
          let list = [
            ...this.state.verticalCategoryList,
            ...this.state.verticalDataItem.data,
          ];
          console.log("list", list);
          this.setState({ verticalCategoryList: list });
          console.log(
            "techhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
            this.state.verticalCategoryList
          );
          // console.log('secccccccccccccccccccc', second, this.state.verticalCategoryList)
          // 		second && second.message === 'Verticals'? this.state.verticalCategoryList.push(second.data): ''
          // 			console.log('temp values', 	this.state.verticalCategoryList);
          console.log(
            "techhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
            this.state.verticalCategoryList
          );
        }
        console.log(
          "techhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          this.state.verticalCategoryList
        );
      }
    }

    if (e.target.name === "state") {
      const tempDistrictData = await getDistrict(e.target.value);
      this.setState({ districtList: tempDistrictData });
    }
  };

  pageChangeCallback = async (id) => {
    const params = this.state.params;
    params.page = params.page + 1;
    this.setState({ load: true, params });
    const prod = await getProducts(params);

    this.setState({
      load: false,
      productData: (prod.data && prod.data.data) || prod.data.data || {},
    });

    if (
      this.state.prod &&
      this.state.prod.data &&
      this.state.prod.data.length
    ) {
      let lists = [...this.state.dataList, ...this.state.prod.data];
      this.setState({ dataList: lists });
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
      subCategories: null,
      state: null,
      district: null,
      verticalCategoryList: [],
      districtList: [],
    });

    const params = {
      category_id: this.state.categoryId,
      page: 1,
    };

    this.setState({ params });
    const res = await getProducts(params);
    console.log("filter reset");

    this.setState({
      load: false,
      productData: res.data && res.data.data ? res.data.data : {},
    });
  };

  onFilterSubmit = async (p) => {
    this.setState({ drawer: p });
  };

  onDrawerClick = (p) => {
    this.setState({ drawer: p });
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
              ? this.state.productData[0].category.name
              : "Badhat"}
          </title>
          <meta name="keywords" content="badhat,badat,Badhat.app" />
          <meta
            name="description"
            content="Badhat is a personal app/website for B2B businesses.Retailers easily connect, browse, & ORDER products from wholesalers/Suppliers.Badhat provides seamless connectivity between Suppliers (Manufacturers, Stockists, Dealers, Distributors,Agent, Brands, suppliers) and Buyers (Retailers,kirnana shops, Re-sellers, online sellers etc.)."
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
              this.state.productData && this.state.productData.length > 0
                ? this.state.productData[0].category.bg_image
                : "https://drive.google.com/file/d/1hZFX14ynp6EuS-Sdtkt0fqbA6FsHl7NU/view"
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
        <div className="SubCategoryContainer">
          <div className="categoryCardContainer_subCategory">
            <SliderCategoryNew
              onClickCategoryHandle={this.onClickCategoryHandle}
              categoryId={
                this.state.categoryId || this?.props?.match?.params?.id
              }
            />
          </div>
          <div>
            {this.state.productData &&
            this.state.productData.length > 0 &&
            this.state.productData[0].category &&
            this.state.productData[0].category.name ? (
              <span>{`${this.state.productData[0].category.name}`}</span>
            ) : null}
          </div>
          {this.state.data && this.state.data.length > 0 ? (
            <div className="selectedSubCategory">
              <div className={"subCategoryGridContainer h-fix"}>
                {this.state.data && this.state.data.length > 0
                  ? this.state.data.map((res) => (
                      <div
                        className="subCategorySliderCard"
                        key={res.id}
                        onClick={() =>
                          this.onClickHandle(res.id, res.category_id)
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

          <Banners
            endPoint={ENDPOINT_GET_CATEGORIES_BANNER}
            id={this.state.categoryId}
          />
          {this.state.load ? (
            ""
          ) : (
            <Product
              showCategoryFilter={false}
              showVerticleCategoriesFilter={true}
              showSubCategoryFilter={true}
              sortValue={this.state.sort}
              categoryValue={this.state.categoryId}
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
              type={this.state.type}
              pageChangeCallback={this.pageChangeCallback}
              subCategoryList={this.state.subCategoryList}
              verticalCategoryList={this.state.verticalCategoryList}
              districtList={this.state.districtList}
              stateValue={this.state.state}
              districtValue={this.state.districtValue}
              sortOrderValue={this.state.sortOrder}
              drawer={this.state.drawer}
              openProductList={this.state.openProductList}
              onDrawerClick={this.onDrawerClick}
              dataList={this.state.dataList}
            />
          )}
        </div>
        <Footer />
      </LoadingOverlay>
    );
  }
}

export default withRouter(SubCategory);
