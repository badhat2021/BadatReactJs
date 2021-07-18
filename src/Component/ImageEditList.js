import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { delProductImg } from "../AppApi";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";


const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: "auto",
    width: "auto",
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  appBar: {
    position: "relative",
    backgroundColor: "#313532"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  image:{
    objectFit: "contain",
    height: "100%",
    minWidth: "240px"

  },
  gridlistitem: {
    margin: "5px 10px"
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

  const [dummy, setDummy] = useState(0)

  useEffect(() => {

  }, [dummy])

  const findIndex = (id) => {
    for (var i = 0; i < props.data.length; i++) {
          if (props.data[i].id===id) {
            return i;
          }    
      }
  }

  const deleteImg = async (prd_id,img_id) => {
      props.data.splice(findIndex(img_id), 1)
      setDummy(img_id)
      const res = await delProductImg(prd_id,img_id);
  }

  return (
    <div className={classes.root}>
      <div className={classes.gridList}>        
        {props.data.map(tile => (
          <GridListTile key={tile.id} className={classes.gridlistitem}>
            <img src={tile.thumbnail} alt={tile.product_id} className={classes.image}/>
            <GridListTileBar              
              subtitle={<span>#{tile.product_id}-{tile.id}</span>}
              actionIcon={
                <>
                  <Button variant="contained" size="small" onClick={() => { deleteImg(tile.product_id,tile.id)}}>DELETE</Button>
                  
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
          <GridListTile key={"12312"} className={classes.gridlistitem}>
            <Button variant="contained" className={classes.image} onClick={() => { uploadImg(tile.product_id,tile.id)}}>
              <AddToPhotosIcon  fontSize="large"/>
            </Button>
          </GridListTile>
      </div>
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
          </Toolbar>
        </AppBar>

        {selectedTile && (
          <img src={selectedTile.image} alt={selectedTile.id} />
        )}
      </Dialog>
    </div>
  );
}
