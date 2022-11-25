import React, { useState, useEffect } from "react";
import "../AppAsset/CSS/SliderCategory.css";

import { getCategory } from "../AppApi";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
} from "@mui/material";
import { styled } from "@material-ui/styles";
import { swapToTop } from "../Util";

const SliderCategoryNew = ({ onClickCategoryHandle, categoryId = "" }) => {
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);

  // Effects
  useEffect(() => {
    async function fetchData() {
      const res = await getCategory();
      setCategories(res.data.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Handler Methods
  const handleChange = ({ target }) => {
    setSelectedCategory(target.value);
    onClickCategoryHandle(target.value, target.name);
  };

  // Render Methods
  const renderCategoryIcon = (iconUrl) => (
    <Avatar
      src={iconUrl}
      alt="category-logo"
      sizes="small"
      sx={{
        position: "absolute",
        left: 0,
        width: 32,
        height: 32,
      }}
    />
  );

  // Loader
  if (isLoading) return "Loading...";

  // Return Methods
  return (
    <div
      className="sliderContainer sliderContainerNew"
      style={{ width: "100%" }}
    >
      {categories && categories.length > 0 ? (
        <div className="select-wrapper">
          <FormControl className="select-wrapper">
            <RadioGroup
              onChange={handleChange}
              value={selectedCategory}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ flexWrap: "nowrap", width: "110%" }}
            >
              {swapToTop(categories, 0, selectedCategory).map((el) => (
                <FormControlLabel
                  control={
                    <Radio
                      checkedIcon={renderCategoryIcon(el?.icon || el?.bg_image)}
                      icon={renderCategoryIcon(el?.icon || el?.bg_image)}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 28,
                          display: "none",
                        },
                      }}
                    />
                  }
                  key={el.id}
                  value={el.id}
                  label={el.name}
                  name={el.name}
                  className={
                    el.id == selectedCategory
                      ? `custom-radio-active custom-radio`
                      : "custom-radio-not-active custom-radio"
                  }
                  sx={{ flex: "0 0 auto" }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
};

export default SliderCategoryNew;
