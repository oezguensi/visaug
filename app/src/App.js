// import axios from 'axios'
// import { useEffect, useState, useRef } from 'react'
// import { Grid, withStyles, Paper } from '@material-ui/core'
// import PropTypes from 'prop-types'
// import ImageVisualization from './components/ImageVisualization'
// import Augmentations from './components/Augmentations'
// import AugmentationEditor from './components/AugmentationEditor'

// const styles = theme => ({
//     root: {
//         height: '100vh',
//     }
// })

// const App = ({ classes }) => {
//     const [augmentations, setAugmentations] = useState([])
//     const [editedAugmentation, setEditedAugmentation] = useState(null)
//     const [augmentedImage, setAugmentedImage] = useState(null)
//     const isFirstRender = useRef(true)

//     const requestFunctions = () => {
//         axios.get('http://localhost:5000/'
//         ).then(response => {
//             setAugmentations(response.data.functions.map((augmentation) => ({ ...augmentation, active: false })))
//         }).catch(error => {
//             console.log(error)
//         })
//     }

//     const requestAugmentedImage = () => {
//         axios.get('http://localhost:5000/augment', {
//             responseType: 'arraybuffer',
//             params: {
//                 augmentations: augmentations.filter((augmentation) => augmentation.active)
//                     .reduce((result, augmentation) => {
//                         const newargs = augmentation.args.reduce((result, arg) => {
//                             result[arg.name] = arg.value
//                             return result
//                         }, {})

//                         result[augmentation.name] = newargs
//                         return result
//                     }, {})
//             },
//         }).then(response => {
//             console.log('SUCESS', response)
//             const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
//             setAugmentedImage('data:;base64,' + base64)
//         }).catch(error => {
//             console.log(error)
//         })
//     }

//     const toggleAugmentation = (signature) => {
//         setAugmentations(augmentations.map((augmentation) => augmentation.signature === signature ? { ...augmentation, active: !augmentation.active } : augmentation))
//     }

//     const toggleEditor = (augmentation) => {
//         if (editedAugmentation === null) {
//             setEditedAugmentation(augmentation)
//         } else if (editedAugmentation.signature !== augmentation.signature) {
//             setEditedAugmentation(augmentation)
//         } else {
//             setEditedAugmentation(null)
//         }
//     }

//     const editAugmentationArguments = (augmentation, args) => {
//         setAugmentations(augmentations.map((aug) => aug.signature === augmentation.signature ? { ...aug, active: true, args: args } : aug))
//     }

//     const uploadData = (files) => {
//         if (files != null) {
//             const data = new FormData()
//             data.append('file', files[0])

//             axios.post("http://localhost:5000/upload", data, {}
//             ).then(res => {
//                 console.log(res.statusText)
//                 requestAugmentedImage()
//             }).catch(error => {
//                 console.log(error)
//             })

//         }
//     }

//     useEffect(() => {
//         if (isFirstRender.current) {
//             isFirstRender.current = false
//             requestFunctions()
//         } else {
//             requestAugmentedImage()
//         }
//     }, [augmentations])


//     return (
//         <div>
//             <Grid container className={classes.root}>
//                 <Grid item xs={false} sm={4} md={7}>
//                     <ImageVisualization image={augmentedImage} uploadData={uploadData} />
//                 </Grid>


//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                     <Augmentations augmentations={augmentations} toggleAugmentation={toggleAugmentation} toggleEditor={toggleEditor} />
//                 </Grid>
//                 {editedAugmentation != null ? <AugmentationEditor augmentation={editedAugmentation} toggleEditor={toggleEditor} editAugmentationArguments={editAugmentationArguments} /> : <></>}
//             </Grid>
//         </div >
//     )
// }

// App.propTypes = { classes: PropTypes.object.isRequired }

// export default withStyles(styles)(App)

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}