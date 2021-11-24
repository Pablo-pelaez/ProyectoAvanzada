import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { CardComponent } from './User/components/card/CardComponent';

import { Grid, FormControl, Input, InputLabel} from '@material-ui/core';
import axios from 'axios'
import Swal from 'sweetalert2'


const ModelCard = ({open,setOpen, cardName,cardDescription,cardPrice,cardImage,cardStock,cardId,reloadProducts}) => {

    const style = {
        position: 'absolute',
        top: '250px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 544,
        height: 444,
        bgcolor: 'background.paper',
        backDrop: {
            backdropFilter: "blur(3px)",
            backgroundColor: 'rgba(0,0,30,0.4)'
        },
        boxShadow: 24,
        borderRadius: "20px",
        p: 4,
    };
    


    const successUpt = () => {
        Swal.fire({
            icon: 'info',
            title: 'Has editado el producto correctamente',
            position:"center-bottom"
        })
        }
    
        
    const card = {
        position: 'absolute',
        top: '-3%',
        left: '50%',
    }
    
    const [data, setdata] = React.useState({
        name:cardName,
        description:cardDescription,
        value:cardPrice,
        discount:"",
        image:cardImage,
    })
    
 
    const newDataCard = {
        nameProduct:data.name,
        description:data.description,
        price:data.value,
        image:data.image,
        id:cardId,
        stock:cardStock,
    }

    console.log(newDataCard)
    const updateProducts = async () => {
        try {
            const resp = await axios.post("http://localhost:3001/updateProduct", newDataCard);
            console.log(resp.data)
        } catch (e) {
            console.log(e);
        }
    }

    const groupFunctions = () => {
        updateProducts();
        successUpt();
        setOpen(false);
        reloadProducts();
    }


    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box style={{width:"50%"}}>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Nombre del Producto</InputLabel>
                            <Input id="my-input" value={data.name} onChange={(e)=>setdata({...data,name:e.target.value})} aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Descripción</InputLabel>
                            <Input id="my-input" value={data.description} onChange={(e)=>setdata({...data,description:e.target.value})} aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input"> url de la imagen</InputLabel>
                            <Input id="my-input" value={cardImage} onChange={(e)=>setdata({...data,image:e.target.value})} aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input">stock</InputLabel>
                            <Input id="my-input"  value={data.stock} onChange={(e)=>setdata({...data,stock:e.target.value})} aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Precio</InputLabel>
                            <Input id="my-input" value={data.precio} onChange={(e)=>setdata({...data,precio:e.target.value})} aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Descuento</InputLabel>
                            <Input id="my-input" value={data.discount}  onChange={(e)=>setdata({...data,discount:e.target.value})} aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <Button variant='contained' size='large' onClick={groupFunctions} style={{width:"100px",marginTop:"40px",marginLeft:"35%",borderRadius:"5px",height:"50px"}}>Actualizar</Button>
                        </FormControl>
                    </Box>
                    <Box sx={card}>
                        <CardComponent 
                            name={data.name}
                            description={data.description}
                            value={data.value}
                            image={data.image}
                        />
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default ModelCard;