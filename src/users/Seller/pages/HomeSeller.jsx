import React, { useState } from 'react'
import { CardAddComponent } from '../components/Card/CardAdd'
import SideBar from '../../components/sideBar/SideBar'
import { Grid } from '@material-ui/core'
import NavBar from '../../User/components/navBar/NavBar'
import axios from 'axios'
import { CardComponent } from '../../User/components/card/CardComponent'

export const HomeSeller = () => {

    const dataSeller = JSON.parse(window.sessionStorage.getItem("data"));
    const [cardData, setCardData] = useState();

    const products = async () => {
        try {
            const resp = await axios.post("http://localhost:3001/productOwner", { id: dataSeller.id });
            window.sessionStorage.setItem("products", JSON.stringify(resp.data))
            setCardData(JSON.parse(window.sessionStorage.getItem("products")));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Grid container style={{ height: "100vh", position: "relative" }} >
            <SideBar
                info={dataSeller}
            />
            <Grid item style={{
                overflow: "auto",
                position: "relative",
                float: "right",
                maxHeight: "100%",
                width: "100%",
                overflowScrolling: "touch",
                display: "flex",
                flexDirection: "column",
                overflowX: "hidden",
            }}>
                <NavBar />
                <Grid container spacing={1} style={{
                    display: "flex",
                    position: "relative",
                    flexWrap: "wrap",
                    width: "80%",
                    right: "-20%",
                    marginBottom: "20px",
                }}>
                    <Grid item>
                        <CardAddComponent
                            cardData={cardData}
                            products={products}
                            id={dataSeller.id}
                        /></Grid>
                    {(cardData != undefined)?
                        cardData.map((dataCard) => {
                            return (
                                <Grid item>
                                    <CardComponent
                                        name={dataCard.nameProduct}
                                        description={dataCard.description}
                                        price={dataCard.price}
                                        image={dataCard.image}
                                        stock={dataCard.stock}
                                        id={dataCard._id}
                                        edit={true}
                                        reloadProducts={products}
                                    />
                                </Grid>
                            )
                        })
                        :<h1>Cargando...</h1>
                    }
                </Grid>

            </Grid>
        </Grid>
    )
}
