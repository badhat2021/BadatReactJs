import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MyProductCard from '../Component/MyProductCard'
import {getMyProducts} from "../AppApi";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import NoDataFound from '../Component/NoDataFound'
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: "30px",
    display: "flex",
    height: "100%"
  },
  centerAlign: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  linkStyle: {
    textDecoration: 'none'
  }
}));

export default function ProductsPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
	const [myProductsList, setMyProductsList] = useState()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


	useEffect(() => {
		async function fetchData(){
      const res1 = await getMyProducts()
      setMyProductsList(res1.data.data);
      console.log(res1.data.data)
    }
    fetchData()
	},[]);

  return (
    <div className={classes.root}>
      {myProductsList ? myProductsList.length>0 ? myProductsList.map((product) => (<MyProductCard product={product}/>)) : <NoDataFound content={"No Products Added"} /> : <CircularProgress />}
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        open={true}
        message="I love snacks"
        key={"bottom right"}
      >
        <Link to="/products/new" className={classes.linkStyle}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Add Product
          </Button>
        </Link>
      </Snackbar>
    </div>
  );
}