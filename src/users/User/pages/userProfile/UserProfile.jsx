import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/sideBar/SideBar';
import { Grid, TextField, Container, FormControl } from '@material-ui/core';
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    AccordionSummary, AccordionDetails,
    Button, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    marginFields: {
        marginLeft: '20px',
    },
    marginButton: {
        marginTop: '10px',
    },
    theme: {
        background: '#bdc3c7',
    },
    texto: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

let email="", id="", lastName="", name="", role=""
const baseUrl = "http://localhost:3001/updateUser"

// const isDataPost = () => {
//     if(typeof(dataPost) !== typeof({})){
//         const tempDataPost = {
//             email: "",
//             id: "",
//             lastName: "",
//             name: "",
//             role: ""
//         }
//         return tempDataPost
//     }else{
//         return dataPost
//     }
// }


export const UserProfile = () => {

    let dataPost = JSON.parse(window.sessionStorage.getItem('data'));

    const isDataPost = () => {
        if(typeof(dataPost) !== typeof({})){
            const tempDataPost = {
                email: "",
                id: "",
                lastName: "",
                name: "",
                role: ""
            }
            return tempDataPost
        }else{
            return dataPost
        }
    }

    useEffect(() => {
        isDataPost()
    }, [])
    let dataResponse = isDataPost()
    
    const [editData, setEditData] = useState({ ...dataResponse })
    const [response, setResponse] = useState()
    const [trigger, setTrigger] = useState(false)
    const classes = useStyles()


    const sendInfo = async () => {
        updateInfo()
        setTrigger(true)
        dataPost = window.sessionStorage.setItem('data', JSON.stringify(editData))
        const res = userValidation()

        switch(res){
            case 0:
                Swal.fire({
                    icon: 'error',
                    title: 'Error al editar',
                    text: 'No puedes dejar campos vacíos',
                    position: 'top',
                })
                break
            case 1:
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'El correo actual no fue cambiado',
                    position: 'top',
                })
                break
            case 2:
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario editado correctamente',
                    position: 'top',
                })
        }
    }

    const userInfo = {
        id: editData.id,
        name: editData.name,
        lastName: editData.lastName,
        email: editData.email,
        role: editData.role,
    }

    //? Cambio de lógica para asignar valores
    const checkEdit = (e) => {
        (e.target.id == 'name') ? setEditData({ ...editData, name: e.target.value }) :
            (e.target.id == 'lastName') ? setEditData({ ...editData, lastName: e.target.value }) :
                (e.target.id == 'email') ? setEditData({ ...editData, email: e.target.value }) :
                    (e.target.id == 'role') ? setEditData({ ...editData, role: e.target.value }) : console.log('I dunna')
    }

    console.log(userInfo)
    const updateInfo = async () => {
        const response = await axios.post(baseUrl, userInfo)
        console.log(response.data)
        setResponse(response.data)
    }

    const userValidation = () => {
        if(editData.name === '' || editData.lastName === '' || editData.email === '' || editData.role === ''){
            return 0
        }else{      
            console.log(dataResponse.email)      
            if(dataResponse.email === editData.email){
                return 1
            }else{
                return 2
            }
        }
    }
    console.log(editData.email)
    console.log(dataResponse.email)
    useEffect(() => {
        // updateInfo()
        setTrigger(false)
    }, [trigger])

    
    console.log(dataPost)

    return (
        <>
                <Grid container style={{ height: "100vh", position: "relative" }}>
                    <Grid item>
                        <Sidebar info={editData} />
                    </Grid>
                    <Grid container spacing={1} style={{
                        display: "flex",
                        position: "relative",
                        flexWrap: "wrap",
                        width: "75%",
                        right: "-20%",
                        marginBottom: "40px",
                        marginLeft: "30px",
                        marginRight: "220px",
                        marginTop: '40px',
                        left: '20%'
                    }}>
                        {/* <h1 className={classes.texto}>EDICIÓN DE USUARIO</h1> */}
                        <div className={classes.root}>
                            <Accordion className={classes.theme}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>{editData.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Edita tu Nombre
                                    </Typography>

                                    <FormControl onSubmit={(e) => e.preventDefault()}>
                                        <TextField
                                            id='name'
                                            value={editData.name}
                                            className={classes.marginFields}
                                            onChange={checkEdit}
                                        />
                                    </FormControl>

                                </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.theme}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading}>{editData.lastName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Edita tu Apellido
                                    </Typography>
                                    <FormControl onSubmit={(e) => e.preventDefault()}>
                                        <TextField
                                            id='lastName'
                                            value={editData.lastName}
                                            className={classes.marginFields}
                                            onChange={checkEdit}
                                        />
                                    </FormControl>

                                </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.theme}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading}>{editData.email}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Edita tu Email
                                    </Typography>
                                    <FormControl onSubmit={(e) => e.preventDefault()}>
                                        <TextField
                                            id='email'
                                            value={editData.email}
                                            className={classes.marginFields}
                                            onChange={checkEdit}
                                        />
                                    </FormControl>

                                </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.theme}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className={classes.heading}>{editData.role}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Edita tu Rol
                                    </Typography>
                                    <FormControl onSubmit={(e) => e.preventDefault()}>
                                        <TextField
                                            id='role'
                                            value={editData.role}
                                            className={classes.marginFields}
                                            onChange={checkEdit}
                                        />
                                    </FormControl>

                                </AccordionDetails>
                            </Accordion>

                            <FormControl>
                                <Button
                                    className={classes.marginButton}
                                    color='primary'
                                    variant='contained'
                                    type='submit'
                                    onClick={() => {
                                        sendInfo()
                                    }}
                                >
                                    Guardar Cambios
                                </Button>
                            </FormControl>

                        </div>
                    </Grid>
                </Grid>
        </>
    )
}
