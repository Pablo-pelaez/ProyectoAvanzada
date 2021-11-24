import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { shadows } from '@material-ui/system';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  drawer: {

  }
})
export default function Footer() {
  const classes = useStyles();
  return (
    <footer style={{
      position: "relative",
      width: "90%",
      justifyContent:"center",
      right: "-10%",
      top:"3%",
    }}>   
       <Box
      px={{ xs: 3, sm: 5 }}
      py={{ xs: 5, sm: 5 }}
      color="white"
      borderColor="blue"
    >
      <Container maxWidth="lg">

        <Grid>
          <Grid>
            <Box borderBottom={2}>Social Media</Box>
            <Box>
              <Link href="https://www.facebook.com/" target="_blank" color="inherit">
                Facebook
              </Link>
            </Box>
            <Box>
              <Link href="https://www.instagram.com/?hl=es" target="_blank" color="inherit">

                Instagram
              </Link>
            </Box>
            <Box>
              <Link href="https://twitter.com/?lang=es" target="_blank" color="inherit">
                Twitter
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box borderBottom={2}>Account</Box>
            <Box>
              <Link href="/" color="inherit">
                Login
              </Link>
            </Box>
            <Box>
              <Link href="/RegisterPage" color="inherit">
                Register
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          Pedaliando Palabras pjyd &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
    </footer>

  );
}