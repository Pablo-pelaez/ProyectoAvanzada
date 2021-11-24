import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignIn() {
  const classes = useStyles();
  const [login, setLogin] = useState({ email: "", password: "", })
  const [post, setPost] = useState({ role: "" });
  // const [state, setstate] = useState()
  const baseUrl = "http://localhost:3001/login"

  const getData = (e) => {
    (e.target.id === "email") ?
      setLogin({
        email: e.target.value,
        password: login.password
      }) :
      setLogin({
        email: login.email,
        password: e.target.value
      })
  }

  const sendDataPost = async () => {
    try {
      const data = await axios.post("http://localhost:3001/login", login);
      setPost(data.data);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    sendDataPost();
  }, [login])

  
  const direction = (post.role == "usuario") ? "/HomeUser" : (post.role == "vendedor") ? "/HomeSeller" : (post.role == "admin") ? "/Admin" : "#";
  return (
    <div className="center">
      <Container className="form" component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              value={login.email}
              onChange={getData}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={login.password}
              label="Contraseña"
              type="password"
              onChange={getData}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar"
            />

            {(login.email.includes("@") && login.password.length > 2) ?
              <Button
                fullWidth
                variant="contained"
                color="primary"
                // href={direction}
                to={direction}
                onClick={()=>{
                  if(direction=="#"){
                    Swal.fire({
                      icon: 'error',
                      title: 'Usuario no existe',
                      position: 'center',
                  })
                  };
                  window.sessionStorage.setItem("data", JSON.stringify(post))
                }}
                component={RouterLink}
                className={classes.submit}
              >
                Iniciar session
              </Button>
              : <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled
              >
                Iniciar session
              </Button>
            }

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Has olvidado tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/RegisterPage"  variant="body2">
                  {"No tiene cuenta? Pues creese una"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    </div>
  );
}