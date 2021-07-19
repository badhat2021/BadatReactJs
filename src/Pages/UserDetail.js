import React,{useEffect, useState} from 'react'
//import LoadingOverlay from "react-loading-overlay";
import { getSellerDetail, getCategory, } from "../AppApi";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
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
  backdrop: {
    zIndex: 1,
    color: '#fff',
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




const UserDetails = () => {
	const [user, setUser] = useState({load:true,data:{}})
	const [updateUser, setUpdate] = useState({data:user.data})
	const [categoryData, setCategory] = useState([]);
  const [backdrop, setBackdrop] = useState(user.load)
  console.log(user.data)
  const [about_us, setabout_us] = useState(user.data.about_us)  
  const [address, setaddress] = useState(user.data.address)
  const [business_category, setbusiness_category] = useState(user.data.business_category)
  const [business_name, setbusiness_name] = useState(user.data.business_name)
  const [business_type, setbusiness_type] = useState(user.data.business_type)
  const [city, setcity] = useState(user.data.city)
  const [created_at, setcreated_at] = useState(user.data.created_at)
  const [delivery_policy, setdelivery_policy] = useState(user.data.delivery_policy)
  const [discount_upto, setdiscount_upto] = useState(user.data.discount_upto)
  const [district, setdistrict] = useState(user.data.district)
  const [email, setemail] = useState(user.data.email)
  const [fcm_token, setfcm_token] = useState(user.data.fcm_token)
  const [gstin, setgstin] = useState(user.data.gstin)
  const [id, setid] = useState(user.data.id)
  const [image, setimage] = useState(user.data.image)
  const [latitude, setlatitude] = useState(user.data.latitude)
  const [longitude, setlongitude] = useState(user.data.longitude)
  const [mobile, setmobile] = useState(user.data.mobile)
  const [name, setname] = useState(user.data.name)
  const [payment_policy, setpayment_policy] = useState(user.data.payment_policy)
  const [pincode, setpincode] = useState(user.data.pincode)
  const [products, setproducts] = useState(user.data.products)
  const [return_policy, setreturn_policy] = useState(user.data.return_policy)
  const [room_id, setroom_id] = useState(user.data.room_id)
  const [started_since, setstarted_since] = useState(user.data.started_since)
  const [state, setstate] = useState(user.data.state)

	const classes = useStyles();
	useEffect(() => {
   		async function fetchData() {    
     		const res = await getSellerDetail();    
			  const categoryDatares = await getCategory();
     		setUser({ load: false, data: res });
     		setUpdate({data: res });
     		setCategory(categoryDatares.data.data);

   		}
   		fetchData();
	 }, []);

	const handleChange = (event) => {
    	updateUser.data.ura = event.target.value
  	};

	console.log(name)

	return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {user.load
        ?
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress />
        </Backdrop>
        :
        ""
      }
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
                defaultValue={name}
                onChange={(e) => {setname(e.target.value)}}
                fullWidth
                id="name"
                label="Name"
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
          		value={user.data.business_category?user.data.business_category:"none"}
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

export default UserDetails