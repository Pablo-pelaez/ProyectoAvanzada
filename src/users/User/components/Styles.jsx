import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Margin } from '@mui/icons-material';

export const Styless = makeStyles({
  prueba: {
    padding: '250px',
    width:'500px',
    border: '5px',
   
  },
  box:{
    backgroundColor: '#37474f',
    display:'flex',
    justifyContent:'flex-end',
    marginBottom: '52px',
    color:'white',
  },
  avatar:{
    backgroundColor: 'green',
    border:'1',
    borderRadius:'13px',
    width:'190px',
    height:'150px',

  },
  texto:{
    marginLeft:'3px',
    color:'white',
  },
  body:{
    margin:'0',
  },

});
