import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  Button,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import NoDataFound from "../Component/NoDataFound";
import "../AppAsset/CSS/Product.css";
import { getCategory, getState } from "../AppApi";
import ProductCard from "./ProductCard";

import InfiniteScroll from "react-infinite-scroll-component";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15,
      load: true,
      categorydata: [],
      subCategoryData: [],
      verticalData: [],
      data: [],
      drawer: false,
      stateData: [],
      offset: 0,
      perPage: 20,
      currentPage: 1,
      loader: "",
      open: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount = async () => {
    const categoryTempData = await getCategory();
    const tempState = await getState();
    this.receivedData();

    this.setState({
      categorydata:
        categoryTempData &&
        categoryTempData.data &&
        categoryTempData.data.data &&
        categoryTempData.data.data &&
        categoryTempData.data.data.length > 0
          ? categoryTempData.data.data
          : [],
      stateData: (tempState && tempState) || [],
    });
  };

  componentDidUpdate = async () => {
    if (
      this.props.productData.current_page &&
      this.state.currentPage &&
      this.props.productData.current_page !== this.state.currentPage
    ) {
      this.receivedData();
    }
  };

  receivedData() {
    const data = this.props.dataList;
    this.setState({
      // pageCount: data.last_page,
      postData: data?.map((pd) => <ProductCard data={pd} />),
    });
  }

  handlePageClick = (e) => {
    let i = this.props.productData.current_page;
    this.setState({ currentPage: i + 1 });
    this.props.pageChangeCallback(i);
  };

  handlePageChange = (pageNumber) => this.setState({ activePage: pageNumber });

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  onDrawerClick = (p) => this.setState({ drawer: p });

  render() {
    console.log("this.state.currentPage", this.state.currentPage);
    return (
      <div className="productContainer">
        <div className="productContainerHeading">Products</div>

        {this.props && !this.props.showFilter ? (
          <div style={{ marginBottom: "5px", marginTop: "5px" }}>
            <Button
              onClick={() => this.props.onDrawerClick(true)}
              style={{ float: "right", color: "orange", fontWeight: "700" }}
            >
              <FilterListIcon />
              Sort & Filter
            </Button>
          </div>
        ) : null}
        <div>
          <Drawer
            anchor="bottom"
            open={this.props.drawer}
            onClose={() => this.props.onDrawerClick(false)}
          >
            <div className="productFliters">
              <div className="filters">
                <FormControl fullWidth>
                  <InputLabel>Sort</InputLabel>
                  <Select
                    name="sort"
                    value={this.props.sortValue}
                    onChange={(e) => this.props.onFilterChangeHandle(e)}
                  >
                    <MenuItem value="created_at">Latest Item</MenuItem>
                    <MenuItem value="price">By Price</MenuItem>
                    <MenuItem value="popularity">By Popularity</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="filters">
                <FormControl fullWidth>
                  <InputLabel>Sort Order</InputLabel>
                  <Select
                    name="sortOrder"
                    value={this.props.sortOrderValue}
                    onChange={(e) => this.props.onFilterChangeHandle(e)}
                  >
                    <MenuItem value="ASC">Ascending</MenuItem>
                    <MenuItem value="DESC">Descending</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="filters">
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={this.props.stateValue}
                    onChange={(e) => this.props.onFilterChangeHandle(e)}
                  >
                    {this.state.stateData && this.state.stateData.length > 0
                      ? this.state.stateData.map((res) => {
                          return (
                            <MenuItem key={res} value={res}>
                              {res}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </div>
              {this.props.stateValue ? (
                <div className="filters">
                  <FormControl fullWidth>
                    <InputLabel>District</InputLabel>
                    <Select
                      name="district"
                      value={this.props.districtValue}
                      onChange={(e) => this.props.onFilterChangeHandle(e)}
                    >
                      {this.props.districtList &&
                      this.props.districtList.length > 0
                        ? this.props.districtList.map((res) => {
                            return (
                              <MenuItem key={res} value={res}>
                                {res}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </FormControl>
                </div>
              ) : null}
              <div className="filterButtonContainer">
                <div className="filterButton">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={this.props.onFilterReset}
                  >
                    Reset Filters
                  </Button>
                </div>
                <div className="filterButton">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={this.props.onFilterSubmit}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </Drawer>
        </div>

        {this.props.productData && this.props.productData.total > 0 ? (
          <div className="productListing">
            {this.props &&
            this.props.productData &&
            this.props.productData.total > 0
              ? this.state.postData
              : "no data found"}

            <InfiniteScroll
              dataLength={this.props.dataList.length}
              hasMore={true}
              pageStart={0}
              next={this.handlePageClick}
              useWindow={false}
            />
          </div>
        ) : (
          <NoDataFound content="No Product Found" />
        )}
      </div>
    );
  }
}

export default Product;
