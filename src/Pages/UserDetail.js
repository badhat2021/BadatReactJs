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
  
  const [name, setname] = useState(user.data.name)
  const [about_us, setabout_us] = useState()
  const [address, setaddress] = useState()
  const [business_category, setbusiness_category] = useState()
  const [business_name, setbusiness_name] = useState()
  const [business_type, setbusiness_type] = useState()
  const [city, setcity] = useState()
  const [created_at, setcreated_at] = useState()
  const [delivery_policy, setdelivery_policy] = useState()
  const [discount_upto, setdiscount_upto] = useState()
  const [district, setdistrict] = useState()
  const [email, setemail] = useState()
  const [gstin, setgstin] = useState()
  //const [image, setimage] = useState()
  const [payment_policy, setpayment_policy] = useState()
  const [pincode, setpincode] = useState()
  const [return_policy, setreturn_policy] = useState()
  const [started_since, setstarted_since] = useState()
  const [state, setstate] = useState()

	const classes = useStyles();
	useEffect(() => {
   		async function fetchData() {    
     		const res = await getSellerDetail();    
			  const categoryDatares = await getCategory();
     		setUser({ load: false, data: res });
     		setUpdate({data: res });
        console.log(res)
     		setCategory(categoryDatares.data.data);
   		  setname(res.name)
        setemail(res.email)
        setgstin(res.gstin)
        setbusiness_name(res.business_name)
        setbusiness_category(res.business_category)
        setbusiness_type(res.business_type)
        setaddress(res.address)
        setcity(res.city)
        setdistrict(res.district)
        setstate(res.state)
        setpincode(res.pincode)
      }
   		fetchData();
	 }, []);

	const handleChange = (event) => {
    	updateUser.data.ura = event.target.value
  	};

  const handleSubmit = (e) => {
    e.preventDefault()
    var dataset = {
      "id" : user.data.id,
      "name" : name,
      "email" : email,
      "gstin" : gstin,
      "business_name" : business_name,
      "business_category" : business_category,
      "business_type" : business_type,
      "address" : address,
      "city" : city,
      "district" : district,
      "state" : state,
      "pincode" : pincode,
      "mobile" : user.data.mobile,
    }
    console.log(dataset)
  };

	return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {user.load
        ?
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress />
        </Backdrop>
        :        

      <div className={classes.paper}>
      	
        {user.data.image ? <Avatar className={classes.avatar} src={user.data.image }/> : <Avatar className={classes.avatar}> {user.data.name ? user.data.name : "Z"  } </Avatar>}
        
        <Typography component="h1" variant="h5">
          Profile
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                defaultValue={user.data.name}
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
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                defaultValue={user.data.email}
                onChange={(e) => {setemail(e.target.value)}}
                fullWidth
                id="email"
                label="E-mail"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="gst"
                name="gstin"
                variant="outlined"
                required
                defaultValue={gstin}
                onChange={(e) => {setgstin(e.target.value)}}
                fullWidth
                id="gstin"
                label="GSTIN"
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
            <Grid item xs={12} sm={6}>
              <TextField
                id="ura"
                select
                required
                fullWidth
                label="You are a"
                value={user.data.business_type?user.data.business_type:"None"}
                onChange={handleChange}
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
                variant="outlined"
                required
                fullWidth
                defaultValue={address}
                onChange={(e) => {setaddress(e.target.value)}}                
                name="shopstreet"
                label="Shop/House No. & Street Name"
                id="shopstreet"
                autoComplete="Street"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                defaultValue={city}
                onChange={(e) => {setcity(e.target.value)}}                
                name="cityarea"
                label="City/Town/Village Area"
                id="cityarea"
                autoComplete="City"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                defaultValue={pincode}
                onChange={(e) => {setpincode(e.target.value)}}                
                name="pincode"
                label="Pincode"
                id="pincode"
                autoComplete="Pincode"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                defaultValue={district}
                onChange={(e) => {setdistrict(e.target.value)}}                
                name="state"
                label="State"
                id="state"
                autoComplete="State"
              />
            </Grid>
		        <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                defaultValue={state}
                onChange={(e) => {setstate(e.target.value)}}                
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
    }
    </Container>
	)
}

export default UserDetails