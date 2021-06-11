import React from 'react';
import Box from '@material-ui/core/Box';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
  	marginBottom: 35
  }
}));

export default function SimpleList() {
 const classes = useStyles();
  return (
    <div className="help-page">
    	<Box display="flex" flexDirection="column"  justifyContent="center" alignItems="center" width="75%" p={1}>
    		<Typography
                component="span"
                variant="h3"
                className={classes.title}
                color="textPrimary"
              >
                 <b>Help</b>
            </Typography>
    		    <div className={classes.root}>
      <List component="nav" aria-label="primary">
        <ListItem button>
          <ListItemText 
          	secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
              		<b>Orders:</b> After placement of order by buyer, the seller will contact the buyer and confirm details of the order
              </Typography>
            </React.Fragment>
          }
          />
        </ListItem>
        <ListItem button>
          <ListItemText 
          	secondary={
            <React.Fragment>
            <br/>	
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                <b>Payments: </b>All payment terms are discussed between buyers & sellers. Badat is not responsible for any payment loss or fraud. Still, Badat recommends cash on delivery
              </Typography>
            </React.Fragment>
          }
          />
        </ListItem>
        <ListItem button>
          <ListItemText 
          	secondary={
            <React.Fragment>
            <br/>	
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                <b>Logistics:</b> All logistics terms will be discussed between the buyer and seller. In future, we will provide logistics services at a cheaper rate from verified partners
              </Typography>
            </React.Fragment>
          }
          />
        </ListItem>
        <ListItem button>
          <ListItemText  
          	secondary={
            <React.Fragment>
            <br/>	
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                <b>Quality: </b>Promised quality should be delivered by the seller else he should offer either  to replace the bad quality items or refund the money
              </Typography>
            </React.Fragment>
          }
          />
        </ListItem>
        <ListItem button>
          <ListItemText  
          	secondary={
            <React.Fragment>
            <br/>	
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                 <b>Defective</b> All defective items should be replaced or offer refund the money of same value by the seller
              </Typography>
            </React.Fragment>
          }
          />
        </ListItem>
                <ListItem button>
          <ListItemText  
          	secondary={
            <React.Fragment>
            <br/>	
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                 <b>Return</b> All the return terms should be discussed between both parties in case required
              </Typography>
            </React.Fragment>
          }
          />
        </ListItem>
                <ListItem button>
          <ListItemText  
          	secondary={
            <React.Fragment>
            <br/>	
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                 <b>Frauds:</b> Report fraud to us on 8750317898 
              </Typography>
            </React.Fragment>
          }
          />
        </ListItem>
                <ListItem button>
          <ListItemText  
          	secondary={
            <React.Fragment>
            <br/>	
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                 <b>So why use Badat:</b> To get free of Commission & free of Charge Orders. For any other things message Badat or call 8750317898.
              </Typography>
            </React.Fragment>
          }
          />
        </ListItem>

      </List>
      <Divider />
      <List component="nav" aria-label="secondary">
        <ListItem button>
          <ListItemText primary="For any other things message Badat or call 8750317898" />
        </ListItem>
	  </List>
    </div>
    <div>

    </div>
      	</Box>
    </div>
  );
}
