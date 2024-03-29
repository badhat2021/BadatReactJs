import { addToCartApi, getCartData, getAppState } from "../AppApi";
import Swal from "sweetalert2";
import "../AppAsset/CSS/Util.css";
import { getTruecallerResponse } from "../AppApi";

export const addToCart = async (body) => {
  const token = await getToken();
  addToCartApi(body, token);
};

export const getLocalStorageCartData = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
};

export const getCartItemIndex = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const index =
    cart && cart.length > 0 ? cart.findIndex((res) => res.id === id) : -1;
  return index;
};

// export const deleteCartData = (id) => {
//   const cart = JSON.parse(localStorage.getItem("cart"));
//   const index =
//     cart && cart.length > 0 ? cart.findIndex((res) => res.id === id) : -1;
//   cart.splice(index, 1);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   return true;
// };

export const addQuantity = async (id) => {
  const cartData = await getCartData();
  const tempData = cartData.map((res) => {
    if (res.id === id) {
      return {
        ...res,
        quantity: res.quantity + 1,
      };
    }
    return res;
  });
};

export const subQuantity = (id) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const index =
    cart && cart.length > 0 ? cart.findIndex((res) => res.id === id) : -1;
  const temp = { ...cart[index], quantity: cart[index].quantity - 1 };
  cart.splice(index, 1, temp);
  localStorage.setItem("cart", JSON.stringify(cart));
  return true;
};

export const checkLogin = () => {
  const login = JSON.parse(localStorage.getItem("badhat_token"));
  if (login) {
    return true;
  }
  return false;
};

export const storeToken = (token) => {
  localStorage.setItem("badhat_token", JSON.stringify(token));
};

export const storeId = (id) => {
  localStorage.setItem("badhat_uid", JSON.stringify(id));
};

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("badhat_token"));
  return token;
};

export const getId = () => {
  const id = JSON.parse(localStorage.getItem("badhat_uid"));
  return id;
};

export const getCartCount = async () => {
  if (checkLogin()) {
    const data = await getAppState();
    // console.log(data)
    return data.data.data.cart;
  }
  return 0;
};

export const checkSkip = () => {
  const login = JSON.parse(localStorage.getItem("skip"));
  if (login) {
    return true;
  }
  return false;
};

export const storeSkip = (flag) => {
  localStorage.setItem("skip", JSON.stringify(flag));
  storeBadatExpiration();
};

export const loginPopUp = (history) => {
  Swal.fire({
    showDenyButton: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: "confirmButtonStyle",
      denyButton: "denyButtonStyle",
    },
    confirmButtonText: `Login or Signup`,
    confirmButtonFont: "black",
    denyButtonText: `Skip`,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      history.push("/login");
    } else if (result.isDenied) {
      storeSkip(true);
    }
  });
};

export const installOurApp = (text) => {
  Swal.fire({
    text: text,
    showCloseButton: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: "confirmButtonStyleInstallApp",
    },
    confirmButtonText: "",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(
        "https://play.google.com/store/apps/details?id=com.badhat.app"
      );
    }
  });
};

export const storeBadatExpiration = () => {
  const newDate = new Date();
  const date = newDate.toDateString();
  const hour = newDate.getHours();
  const data = `${date} ${hour}`;
  localStorage.setItem("badatExpiration", JSON.stringify(data));
};

export const checkBadatExpiration = () => {
  const expiry = JSON.parse(localStorage.getItem("badatExpiration"));
  const newDate = new Date();
  const date = newDate.toDateString();
  const hour = newDate.getHours();
  const data = `${date} ${hour}`;
  if (expiry === data) {
    return true;
  }
  return false;
};

export const handleLogout = () => {
  localStorage.removeItem("badhat_token");
};

export const getSelectNameSub = (catId) => {
  if (catId === 1) {
    return "Grocery & Household";
  } else if (catId === 2) {
    return "Clothing";
  } else if (catId === 3) {
    return "Bags & Luggage";
  } else if (catId === 4) {
    return "Stationery, Office & Packaging";
  } else if (catId === 6) {
    return "Mobile & Accessory";
  } else if (catId === 7) {
    return "Kitchen & Appliance";
  } else if (catId === 8) {
    return "Footwear";
  } else if (catId === 11) {
    return "Electronics";
  } else if (catId === 12) {
    return "Computer & Peripherals";
  } else if (catId === 14) {
    return "Sports";
  } else {
    return "Please Select";
  }
};

export const getCatId = (slectName) => {
  if (slectName === "Grocery & Household") {
    return 1;
  } else if (slectName === "Clothing") {
    return 2;
  } else if (slectName === "Bags & Luggage") {
    return 3;
  } else if (slectName === "Stationery, Office & Packaging") {
    return 4;
  } else if (slectName === "Mobile & Accessory") {
    return 6;
  } else if (slectName === "Kitchen & Appliance") {
    return 7;
  } else if (slectName === "Footwear") {
    return 8;
  } else if (slectName === "Electronics") {
    return 11;
  } else if (slectName === "Computer & Peripherals") {
    return 12;
  } else if (slectName === "Sports") {
    return 14;
  } else {
    return 1;
  }
};

export const swapToTop = (arr, firstIndex, id) => {
  const secondIndex = arr.findIndex((c) => c.id == id);
  if (!id) return arr;
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
  return arr;
};
