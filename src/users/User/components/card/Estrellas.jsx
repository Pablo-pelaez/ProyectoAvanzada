import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(({
    star:{
        display:"flex",
        justifyContent:"center",
    }
}))


export const Estrellas = () => {
    const classes = useStyles();
    
    const [value, setValue] = React.useState(2);
    const star = () => {
        return(
        <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="read-only" value={value} readOnly />
        </Box>)
    }
    return (
      <div className={classes.star}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
      </div>
    ); 
}
