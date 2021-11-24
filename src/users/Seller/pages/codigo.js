import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { CardComponent } from '../../User/components/card/CardComponent';

export const HomeSeller = ({id}) => {


    const [cardData, setCardData] = useState();



    const identificador = {
        id: id
    }

    const products = async () => {
        try {
            const resp = await axios.post("http://localhost:3001/productOwner", identificador);
            setCardData(resp.data)
        } catch (e) {
            console.log(e);
        }

    }

 

    
    useEffect(() => {

    }, [newProduct])

    useEffect(() => {  
        products();
    }, [])
    console.log(cardData)
    return (
        <>
            <TextField
                id="nameProduct"
                label="Producto"
                onChange={registerProduct}
            />
            <TextField
                id="description"
                label="description"
                onChange={registerProduct}
            />
            <TextField
                id="price"
                label="price"
                type="number"
                onChange={registerProduct}
            />
            <TextField
                id="image"
                label="image"
                onChange={registerProduct}
            />
            <TextField
                id="stock"
                label="stock"
                type="number"
                onChange={registerProduct}
            />

            <Button variant="contained" onClick={setProduct}>Mandar Info</Button>
        
            {(cardData)?
                (cardData.length>0)?
                cardData.map((info, index) => {
                    return(
                    <CardComponent
                        key={index}
                        id={info._id}
                        name={info.nameProduct}
                        description={info.description}
                        discount={info.price}
                        image={info.image}
                        value={info.price}
                    />)
                }
                ):<h1 contenteditable="true">No tiene productos, se va a quebrar</h1>
            :<h1>Cargando...</h1>
            }
            
        </>
    )
}
