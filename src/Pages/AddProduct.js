import React,{useEffect, useState, useRef} from 'react'
//import LoadingOverlay from "react-loading-overlay";
import { getSubCategory, getVerticalCategory, getCategory, addProduct } from "../AppApi";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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




const AddProductForm = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [moq, setMoq] = useState();  
  const [description, setDiscription] = useState();
  const [categoryId, setCategoryId] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);
  const [verticalId, setVerticalId] = useState(0);
  const [images, setImages] = useState([]);

  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [verticalData, setVerticalData] = useState([]);

  const isFirstRun = useRef(true);

  const classes = useStyles();


  useEffect(() => {
      async function fetchData() {  
        //console.log("objectgfdfghjk")
        const cat1 = await getCategory();
        //console.log(cat1.data.data)
        setCategoryData(cat1.data.data);
      }
      fetchData();
   }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

      async function fetchData() {  
        const cat2 = await getSubCategory(categoryId);
        setSubCategoryData(cat2.data.data);
        console.log(cat2)
      }
      fetchData();
   }, [categoryId]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

      async function fetchData() {  
        const cat3 = await getVerticalCategory(subCategoryId);
          setVerticalData(cat3.data.data)
      }
      fetchData();
   }, [subCategoryId]);



  const handleChange = (event) => {
    console.log(event.target.value)
  };

  const onFileChange = event => {
    setImages(event.target.files);
    console.log(event.target.files)
  };

  const handleSubmit = (e) => {
    var dataset = {
      "name" : name,
      "desc" : description,
      "moq" : moq,
      "price" : price,
      "categoryId" : categoryId,
      "subCategoryId" : subCategoryId,
      "verticalId" : verticalId
    }
    addProduct(dataset,images);    
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                onChange={(e) => {
                  console.log(e.target.value);
                  setName(e.target.value);
                }}
                id="name"
                label="Produt Title Name"
              />
            </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              id="description"
              required
              fullWidth
              label="Product Details"
              onChange={(e) => {
                console.log(e.target.value);
                setDiscription(e.target.value)
              }}
              variant="outlined"
          />
          </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                id="moq"
                onChange={(e) => {
                  console.log(e.target.value);
                  setMoq(e.target.value);
                }}                
                label="Minimum Order Quantity"
                name="moq"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="price"  
                label="Price per Quantity"      
                type="number"
                onChange={(e) => {
                  console.log(e.target.value);
                  setPrice(e.target.value);
                }}    
                name="price"
              />
            </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="categoryId"
              select              
              fullWidth
              label="Category"
              onChange={(e) => {console.log(e.target.value);setCategoryId(e.target.value)}}
              variant="outlined"
          >
            { categoryData.length > 0 ?
              categoryData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
              )) : <MenuItem key="error" value={0}>
                      Error loading categories!
                    </MenuItem>
            }
          </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="subCategoryId"
              select              
              fullWidth
              label="Subcategory"
              onChange={(e) => {console.log(e.target.value); setSubCategoryId(e.target.value)}}
              variant="outlined"
          >
            { subCategoryData.length > 0 ?
              subCategoryData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
              )) :  <MenuItem key="error" value={0}>
                        None
                    </MenuItem>
            }
          </TextField>
          </Grid>
                    <Grid item xs={12} sm={6}>
            <TextField
              id="verticalId"
              select              
              fullWidth
              label="Section"
              onChange={(e) => {console.log(e.target.value);setVerticalId(e.target.value)}}
              variant="outlined"
          >
            { verticalData.length > 0 ?
              verticalData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
              )) : 
                    <MenuItem key="error" value={0}>
                      None
                    </MenuItem>
            }
          </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              variant="outlined" 
              fullWidth            
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={onFileChange}
              helperText="Add Images"
            >
            </TextField>
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Product
          </Button>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  )
}

export default AddProductForm