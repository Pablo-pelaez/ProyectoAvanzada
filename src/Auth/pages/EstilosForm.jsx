import { makeStyles } from '@material-ui/core/styles';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(5, 0, 2),

    },
    select: {
        "&:after": {

            borderBottomColor: "blue",

        },
        "& .MuiSvgIcon-root": {

            color: "blue",
        },
    },

    
    

}));

export {useStyles};