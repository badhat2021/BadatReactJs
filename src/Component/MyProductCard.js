import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { delProduct } from "../AppApi";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
  	minWidth: 270,
    maxWidth: 345,
    margin: 20
  },
  media: {
    height: 140,
  },
  subitem: {
  	display: "flex",
  	flexDirection: "column"
  },
  CardAction:{
  	display: "flex",
  	justifyContent: "space-evenly"
  },
  linkStyle: {
  	textDecoration: 'none'
  },
  catColor: {
  	color: "#43a047"
  },
  delBtn: {
  	color: "#dd2c00",
  	float: "right"
  },
  shareBtnAlign: {
  	display: "flex",
  	justifyContent: "space-between"
  },
  shareBtnCover: {
  	backgroundColor: "#ffffff",
  	alignSelf: "flex-end",
  	marginLeft: "20px"
  	//padding: "2px 8px",
  	//height: "min-content",
  },
  shareBtn: {
  	marginRight: "5px"
  }
});

export default function MyProductCard(props) {
  const classes = useStyles();
  
  const onDeleteClick = async () => {
  	const res = await delProduct(props.product.id);
  	window.location.reload();
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.product.images.[0].image}
          title={props.product.name}
        />
        <CardContent>
    	    	<Typography gutterBottom variant="h5" component="h2">
	        	    {props.product.name}
          		</Typography>        		
        	<div className={classes.shareBtnAlign}>			
          <div className={classes.subitem}>
	        	<Typography variant="body2" className={classes.catColor} component="div">
            		<b>Category: {props.product.category.name}</b>
          		</Typography>
          		<Typography variant="body2" component="div">
            		Rs. {props.product.price}
          		</Typography>
          		<Typography variant="body2" component="div">
            		MOQ: {props.product.moq}
          		</Typography>
          </div>
          	<Fab variant="extended" className={classes.shareBtnCover}>          		
          		<ShareIcon fontSize="small" className={classes.shareBtn}/>			  	
				Share
			</Fab>
			</div>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.CardAction}>
      	<Link to={`/products/edit/${props.product.id}`} className={classes.linkStyle}>
        	<Button size="small" color="primary">
        	  	Edit
        	</Button>
        </Link>
        <Link to={`/product/${props.product.id}`} className={classes.linkStyle}>
        	<Button size="small" color="primary">
        		View
        	</Button>
        </Link>
        	<Button size="small" className={classes.delBtn} onClick={onDeleteClick}>
        		Delete
        	</Button>
      </CardActions>
    </Card>
  );
}
