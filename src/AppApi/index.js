import axios from "axios";
import {
  BASE_URL,
  //NEW_BASE_URL,
  ENDPOINT_CATEGORIES,
  ENDPOINT_GET_SUBCATEGORIES,
  ENDPOINT_GET_VERTICAL_CATEGORIES,
  ENDPOINT_GET_PRODUCTS,
  ENDPOINT_GET_PRODUCT_DETAIL,
  ENDPOINT_SEND_OTP,
  ENDPOINT_LOGIN,
  ENDPOINT_ADD_TO_CART,
  ENDPOINT_GET_CART_DATA,
  ENDPOINT_DELETE_CART_DATA,
  ENDPOINT_REGISTER_USER,
  ENDPOINT_SUB_QUANTITY_FROM_CART,
  ENDPOINT_PLACE_ORDER,
  ENDPOINT_GET_SELLER_DETAIL,
  ENDPOINT_GET_STATES,
  ENDPOINT_GET_DISTRICT,
  //ENDPOINT_GET_TRUECALLER_RESPONSE,
} from "../Constant";
import Swal from "sweetalert2";
import { storeToken, storeId, getId } from "../Util";
const TOKEN = JSON.parse(localStorage.getItem("badhat_token"));


export const getCategory = async () => {
  const res = await axios.get(BASE_URL + ENDPOINT_CATEGORIES);
  return res;
};

export const getSubCategory = async (id) => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_SUBCATEGORIES + "/" + id);
  return res;
};

export const getVerticalCategory = async (id) => {
  const res = await axios.get(
    BASE_URL + ENDPOINT_GET_VERTICAL_CATEGORIES + "/" + id
  );
  return res;
};

export const getProducts = async (params) => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_PRODUCTS, {
    params,
  });
  return res;
};

export const getProductDetail = async (id) => {
  const res = await axios.get(
    BASE_URL + ENDPOINT_GET_PRODUCT_DETAIL + "/" + id
  );
  return res;
};

export const sendMobileNumber = async (mobile) => {
  let body = {
    mobile: mobile,
  };
  const res = await axios.post(BASE_URL + ENDPOINT_SEND_OTP, body);
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const sendOtp = async (mobile, otp) => {
  let body = {
    mobile: mobile,
    otp: otp,
  };
  const res = await axios.post(BASE_URL + ENDPOINT_LOGIN, body);
  if (res.status === 200) {
    storeToken(res.data.data.access_token);
    storeId(res.data.data.user.id)
    return res;
  } else {
    return false;
  }
};

export const login = async () => {
  await Swal.fire({
    text: "Enter your mobile number to continue",
    input: "number",
    inputAttributes: {
      autocapitalize: "off",
    },
    confirmButtonText: "Request OTP",
    showLoaderOnConfirm: true,
    preConfirm: (number) => {
      return sendMobileNumber(number);
    },
  });
};

export const addToCartApi = async (body) => {
  const res = await axios.post(BASE_URL + ENDPOINT_ADD_TO_CART, body, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res;
};

export const getCartData = async () => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_CART_DATA, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data.data;
};

export const deleteCartData = async (id) => {
  await axios.delete(`${BASE_URL + ENDPOINT_DELETE_CART_DATA}/${id}`, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
};


export const registerUser = async (body) => {
  const res = await axios.post(BASE_URL + ENDPOINT_REGISTER_USER, body);
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const placeOrder = async (body) => {
  const res = await axios.get(BASE_URL + ENDPOINT_PLACE_ORDER, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const getSellerDetail = async () => {
  const id = await getId();
  const  res = await axios.get(BASE_URL + ENDPOINT_GET_SELLER_DETAIL + id);
  return res.data.data;
};

export const removeFromCart = async (id) => {
  let body = {
    cart_id: id,
  };
  const res = await axios.post(
    BASE_URL + ENDPOINT_SUB_QUANTITY_FROM_CART,
    body,
    {
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    }
  );
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const getState = async () => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_STATES);
  return res.data.data;
};

export const getDistrict = async (state) => {
  const res = await axios.get(BASE_URL + ENDPOINT_GET_DISTRICT + state);
  return res.data.data;
};

export const getBanner = async (endpoint, id) => {
  let res;
  if (!id) {
    res = await axios.get(BASE_URL + endpoint);
  } else {
    res = await axios.get(BASE_URL + endpoint + id);
  }
  return res.data.data;
};

export const getTruecallerResponse = async (id) => {
  const res = await axios.get(
    "https://badhat.app/api/truecaller-response/" + id
  );
  return res.data;
};

export const getOrderRecieved = async (body) => {
  const res = await axios.get(BASE_URL + "receivedOrders", {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data.data;
};

export const getOrderPlaced = async (body) => {
  const res = await axios.get(BASE_URL + "placedOrders", {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data.data;
};

export const acceptOrder = async (id) => {

  const res = await axios.get(BASE_URL + "acceptOrder/"+id, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data;
};

export const declineOrder = async (id) => {
  const res = await axios.get(BASE_URL + "cancelOrder/"+id, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data;
};

export const getOrderById = async (id) => {

  const res = await axios.get(BASE_URL + "order/"+id, {
    headers: {
      Authorization: "Bearer " + TOKEN,
    },
  });
  return res.data.data;
};

export const updateProfile = async (dataset) => {

  var data = new FormData();
  data.append('id', '431');
  data.append('business_category', 'Clothing');
  //data.append('image', fs.createReadStream('/C:/Users/HP/Pictures/wallpapers/daniel-leone-g30P1zcOzXo-unsplash.jpg'));
  data.append('name', 'testupdate12');
  data.append('business_name', '123');
  data.append('email', 'test@test.com');
  data.append('mobile', '1234567890');
  data.append('state', 'Gujarat');
  data.append('district', 'rajkot');
  data.append('pincode', '360002');
  data.append('latitude', '1.3');
  data.append('longitude', '1.2');
  data.append('address', 'rajkot');
  data.append('city', 'rajkot');
  data.append('gstin', '113166565');
  data.append('business_type', 'Retail');

  var config = {   
      method: 'post',   
      url: 'https://badhat.app/api/updateProfile',   
      headers: {      
        "Authorization": "Bearer " + TOKEN,
        "content-type": 'multipart/form-data'
      },   
      data : data 
    };  

    await axios(config)
    .then(function (response) {   
      console.log(response); 
    })
    .catch(function (error) {   
      console.log(error); 
    });
}

//updateProfile(416)

export const addProduct = async (dataset, files) => {
  
    console.log(dataset)
    console.log(files.[0])
    if(dataset.name === null || dataset.verticalId === null || dataset.subCategoryId === null || dataset.categoryId === null || dataset.description === null || dataset.moq === null || dataset.price === null || files.length===0)
              window.location.href="/products/new";
    var data = new FormData();
    data.append('name', dataset.name);
    data.append('description', dataset.desc);
    data.append('moq', dataset.moq);
    data.append('price', dataset.price);
    data.append('category_id', dataset.categoryId);
    data.append('sub_category_id', dataset.subCategoryId);
    data.append('vertical_id', dataset.verticalId);
    console.log(files)
    for (var i = 0; i < files.length; i++) {
      data.append(`images[${i}]`, files.[i]);
    }
    
    var config = {
      method: 'post',
      url: 'https://badhat.app/api/addProduct',
      headers: { 
        "Authorization": "Bearer " + TOKEN,
        "content-type": 'multipart/form-data'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
      if(response.data.message==="Product added"){
        window.location.href="/products";
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}

//addProduct("lol")


export const editProduct = async (dataset, files) => {
    console.log(dataset)
    console.log(files.[0])
    var data = new FormData();
    data.append('id', dataset.id);
    data.append('name', dataset.name);
    data.append('description', dataset.desc);
    data.append('moq', dataset.moq);
    data.append('price', dataset.price);
    data.append('category_id', dataset.categoryId);
    data.append('sub_category_id', dataset.subCategoryId);
    data.append('vertical_id', dataset.verticalId);
    console.log(files)
    for (var i = 0; i < files.length; i++) {
      data.append(`images[${i}]`, files.[i]);
    }
    
    var config = {
      method: 'post',
      url: 'https://badhat.app/api/editProduct',
      headers: { 
        "Authorization": "Bearer " + TOKEN,
        "content-type": 'multipart/form-data'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
      if(response.data.message==="Product Updated"){
        window.location.href="/products";
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}


export const getNotifications = async () => {
  const res = await axios.get(
    "https://badhat.app/api/notifications",{
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    });
  return res.data;
};


export const getNotificationCount = async () => {
  const res = await axios.get(
    "https://badhat.app/api/appState",{
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    });
  return res.data.data.notification;
};


export const markAsRead = async () => {

  const res = await axios.get(
    "https://badhat.app/api/markAllRead",{
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    });
};


export const getMyProducts = async () => {
  const res = await axios.get(
    "https://badhat.app/api/products",{
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    });
  return res;
};

export const delProduct = async (id) => {
  const res = await axios.delete(
    `https://badhat.app/api/product/${id}`,{
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    });
  return res;
};

export const delProductImg = async (prd_id,img_id) => {
  const res = await axios.delete(
    `https://badhat.app/api/products/${prd_id}/images/${img_id}`,{
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    });
  return res;
};