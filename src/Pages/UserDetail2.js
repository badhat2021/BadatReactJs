import React,{useEffect, useState} from 'react'
//import LoadingOverlay from "react-loading-overlay";
import { getSellerDetail, getCategory, } from "../AppApi";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 100,
    height: 100,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




const URA = [
  {
    value: 'None',
    label: 'None',
  },
  {
    value: 'Retailer',
    label: 'Retailer',
  },
  {
    value: 'Distributer',
    label: 'Distributer',
  },
  {
    value: 'StockList',
    label: 'StockList',
  },
  {
    value: 'Manufacturer',
    label: 'Manufacturer',
  },
  {
    value: 'Wholeseller',
    label: 'Wholeseller',
  },
  {
    value: 'Agent',
    label: 'Agent',
  },
  {
    value: 'Brand',
    label: 'Brand',
  },
  {
    value: 'Supplier',
    label: 'Supplier',
  },
  {
    value: 'OnlineSeller',
    label: 'OnlineSeller',
  },
  {
    value: 'Reseller',
    label: 'Reseller',
  },
];


const bCaegory = [
  {
    value: 'None',
    label: 'None',
  },
  {
    value: 'Retailer',
    label: 'Retailer',
  },
  {
    value: 'Distributer',
    label: 'Distributer',
  },
  {
    value: 'StockList',
    label: 'StockList',
  },
  {
    value: 'Manufacturer',
    label: 'Manufacturer',
  },
  {
    value: 'Wholeseller',
    label: 'Wholeseller',
  },
  {
    value: 'Agent',
    label: 'Agent',
  },
  {
    value: 'Brand',
    label: 'Brand',
  },
  {
    value: 'Supplier',
    label: 'Supplier',
  },
  {
    value: 'OnlineSeller',
    label: 'OnlineSeller',
  },
  {
    value: 'Reseller',
    label: 'Reseller',
  },
];







const UserDetail2 = () => {
	const [user, setUser] = useState({load:true,data:{}})
	const [updateUser, setUpdate] = useState({data:user.data})
	const [categoryData, setCategory] = useState([]);
	const classes = useStyles();
	useEffect(() => {
   		async function fetchData() {    
     		const res = await getSellerDetail();    
			const categoryDatares = await getCategory();
			console.log(categoryDatares.data.data)
     		setUser({ load: false, data: res });
     		setUpdate({data: res });
     		setCategory(categoryDatares.data.data);

   		}
   		fetchData();
	 }, []);

	const handleChange = (event) => {
    	updateUser.data.ura = event.target.value
  	};

	console.log(updateUser)

	return (
<Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
      	{user.data.image ? <Avatar className={classes.avatar} src={user.data.image }/> : <Avatar className={classes.avatar}> {user.data.name ? user.data.name : "Z"  } </Avatar>}
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                value={user.data.name?user.data.name:"none"}
                fullWidth
                id="name"
                label="Name"
                placeholder="nosand"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={user.data.mobile?user.data.mobile:"0000"}
                disabled
                fullWidth
                id="mobileno"                
                name="mobileno"
                autoComplete="mobile"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={user.data.business_name?user.data.business_name:"none"}
                id="shopname"
                label="Shop/Business Name"
                name="shopname"
                autoComplete="shop"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
          		id="ura"
          		select
          		required
          		fullWidth
          		label="You are a"
          		value={user.data.business_type?user.data.business_type:"None"}
          		//onChange={handleChange}
          		helperText="Please select your business type"
          		variant="outlined"
        	>
          		{URA.map((option) => (
            		<MenuItem key={option.value} value={option.value}>
              			{option.label}
            		</MenuItem>
          		))}
        	</TextField>
        	</Grid>
        	<Grid item xs={12} sm={6}>
            <TextField
          		id="businessd"
          		select
          		required
          		fullWidth
          		label="Business Domain"
          		value={user.data.business_category}
          		//onChange={handleChange}
          		helperText="Please select your business category"
          		variant="outlined"
        	>
          		{categoryData.map((option) => (
            		<MenuItem key={option.name} value={option.name}>
              			{option.name}
            		</MenuItem>
          		))}
        	</TextField>
        	</Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={user.data.image}
                id="imgurl"
                label="Profile Image Url"
                name="imgurl"
                autoComplete="image"
              />
            </Grid>
		    <Grid item xs={12} sm={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="shopstreet"
                label="Shop/House No. & Street Name"
                id="shopstreet"
                autoComplete="Street"
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cityarea"
                label="City/Town/Village Area"
                id="cityarea"
                autoComplete="City"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pincode"
                label="Pincode"
                id="pincode"
                autoComplete="Pincode"
              />
            </Grid>
		     <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="state"
                label="State"
                id="state"
                autoComplete="State"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Profile
          </Button>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
	)
}

export default UserDetail2