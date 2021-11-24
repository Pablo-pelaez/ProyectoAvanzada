import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import { Estrellas } from "./Estrellas"
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios'
import ModelCard from '../../../ModelCard';
import { ShoppingCart } from '../../pages/shoppingCart/ShoppingCart';


const useStyles = makeStyles(({
  root: {
    marginTop: "50px",
    width: "250px",
    padding: "0px",
    margin: "0px",
    background: '#37474f8f',
    maxHeight: "380px",
    height: "400px"
  },
  media: {
    height: "200px",
    width: "auto",
    maxHeight: "200px",
    maxWidth: "300px",
    padding: "0px",
  },
  align: {
    padding: "0px",
    display: "flex",
    justifyContent: "center",
  },
  price: {
    padding: "0px",
    color: "red",
  },
  content: {
    padding: "0px",
    display: "grid",
  },
  price2: {
    padding: "0px",
    color: "red",
    textDecoration: "line-through",
  },
  cardBottom: {
    padding: "0px",
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    padding: "0px",
    fontSize: "35px",
    color: "red",
  },
  header: {
    padding: "0px",
  },
}))



const CardComponent = ({ name, description, price, discount, image, edit, id, reloadProducts, dataCard }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  
  
  const productDelete = async () => {
    try {
      const resp = await axios.post("http://localhost:3001/deleteProduct", { id: id });
      console.log(resp.data);
    } catch (e) {
      console.log(e);
    }
  }

  const groupFunctions = () => {
    productDelete();
    reloadProducts();
  }

  
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root} >

        {(edit == true)
          ? <CardHeader
            className={classes.header}
            action={
              <IconButton onClick={() => groupFunctions()}>
                <DeleteIcon />
              </IconButton>
            }
          /> :
          <CardHeader
            className={classes.header}
            action={
              <IconButton aria-label="">
                <VisibilityIcon className={classes.icon} />
              </IconButton>
            }
          />
        }

        <Box className={classes.align}>
          <CardMedia
            className={classes.media}
            component="img"
            title={name}
            image={image}
          />
        </Box>
        <CardContent className={classes.content}>
          <Typography variant="h6" component="h4" align="center">
            {name}
          </Typography>

          <Estrellas className={classes.star} />

        </CardContent>
        <CardActions className={classes.cardBottom}>
          <Typography variant="body2" component="p" className={classes.price}>
            {price}
          </Typography>
          <Typography variant="body2" component="p" className={classes.price2}>
            {discount}
          </Typography>
          {(edit == true) ?
            <IconButton aria-label="add to favorites" size="small">
              <CreateIcon onClick={handleOpen}  />
            </IconButton>
            :
            <IconButton aria-label="add to favorites" size="small">
              <AddCircleIcon className={classes.btn} onClick={()=>{
                const data = [];
                JSON.parse(window.sessionStorage.getItem("selectedProducts"))?.forEach((elem)=>{
                  elem.cant=0;
                 data.push(elem) 
                })
                data.push(dataCard);
                window.sessionStorage.setItem("selectedProducts", JSON.stringify(data))
              }}/>

            </IconButton>
          }
          
            <ModelCard
            
              open={open}
              setOpen={setOpen}
              cardName={name}
              cardDescription={description}
              cardPrice={price}
              cardImage={image}
              cardId={id}
              reloadProducts={reloadProducts}
            />

        </CardActions>
      </Card>

    </>
  )
 
}

export { CardComponent };


