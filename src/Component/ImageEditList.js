import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";


const imagesList = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1606660477754-104c816bb884?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "foo",
    description: "bar",
    author: "Rajini"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551091708-fda32ed3178c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "foo",
    description: "bar",
    author: "Kamal"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1608592077365-c6399182e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
    title: "foo",
    description: "bar",
    author: "Vijay"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1606660477754-104c816bb884?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
    title: "foo",
    description: "bar",
    author: "Ajith"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1516298773066-c48f8e9bd92b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    title: "Sunset",
    description: "bar",
    author: "Sharukh"
  },
  {
    id: 6,
    src: "https://unsplash.com/photos/PNKwdJ8WetM",
    title: "Sunset_Road",
    description: "bar",
    author: "Sudhanshu"
  },
  {
    id: 7,
    src: "https://unsplash.com/photos/1vPblXnxhds",
    title: "Sunset on the Bridge",
    description: "bar",
    author: "Dabang"
  },
  {
    id: 8,
    src: "https://unsplash.com/photos/KzKRGrJ_xyo",
    title: "Fire",
    description: "bar",
    author: "Komali"
  },
  {
    id: 9,
    src: "https://unsplash.com/photos/62t_kKa2YlA",
    title: "Set",
    description: "bar",
    author: "CCV"
  }
];


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TitlebarGridList(props) {
  const classes = useStyles();
  const [selectedTile, setSelectedTile] = React.useState(null);
  const [value, setValue] = React.useState([]);

  const handleClickOpen = tile => {
    setSelectedTile(tile);
    console.log("clicked");
    console.log(tile);
  };

  const handleClose = () => {
    setSelectedTile(null);
  };
  return (
    <div className={classes.root}>
      <GridList cols={3}>
        className={classes.gridList}
        {props.data.map(tile => (
          <GridListTile key={tile.id}>
            <img src={tile.thumbnail} alt={tile.product_id} />
            <GridListTileBar
              title={tile.id}
              subtitle={<span>product: {tile.product_id}</span>}
              actionIcon={
                <>
                  <Button variant="contained">DELETE</Button>
                  <IconButton
                    aria-label={`info about ${tile.id}`}
                    className={classes.icon}
                    value={tile.id}
                    onClick={() => handleClickOpen(tile)}
                  >
                    <InfoIcon />
                  </IconButton>
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Dialog
        fullScreen
        open={selectedTile !== null}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        {selectedTile && (
          <img src={selectedTile.image} alt={selectedTile.id} />
        )}
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
      </Dialog>
    </div>
  );
}
