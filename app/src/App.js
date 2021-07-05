import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Grid, withStyles, Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
import ImageVisualization from './components/ImageVisualization'
import Augmentations from './components/Augmentations'
import AugmentationEditor from './components/AugmentationEditor'

const styles = theme => ({
  root: {
    height: '100vh',
  }
})

const App = ({ classes }) => {
  const [augmentations, setAugmentations] = useState([])
  const [editedAugmentation, setEditedAugmentation] = useState(null)
  const [augmentedImage, setAugmentedImage] = useState(null)
  const isFirstRender = useRef(true)

  const requestFunctions = () => {
    axios.get('http://localhost:5000/'
    ).then(response => {
      setAugmentations(response.data.functions.map((augmentation) => ({ ...augmentation, active: false })))
    }).catch(error => {
      console.log(error)
    })
  }

  const requestAugmentedImage = () => {
    axios.get('http://localhost:5000/augment', {
      responseType: 'arraybuffer',
      params: {
        augmentations: augmentations.filter((augmentation) => augmentation.active)
          .reduce((result, augmentation) => {
            const newargs = augmentation.args.reduce((result, arg) => {
              result[arg.name] = arg.value
              return result
            }, {})

            result[augmentation.name] = newargs
            return result
          }, {})
      },
    }).then(response => {
      console.log('SUCESS', response)
      const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      setAugmentedImage('data:;base64,' + base64)
    }).catch(error => {
      console.log(error)
    })
  }

  const toggleAugmentation = (signature) => {
    setAugmentations(augmentations.map((augmentation) => augmentation.signature === signature ? { ...augmentation, active: !augmentation.active } : augmentation))
  }

  const toggleEditor = (augmentation) => {
    if (editedAugmentation === null) {
      setEditedAugmentation(augmentation)
    } else if (editedAugmentation.signature !== augmentation.signature) {
      setEditedAugmentation(augmentation)
    } else {
      setEditedAugmentation(null)
    }
  }

  const editAugmentationArguments = (augmentation, args) => {
    setAugmentations(augmentations.map((aug) => aug.signature === augmentation.signature ? { ...aug, active: true, args: args } : aug))
  }

  const uploadData = (files) => {
    if (files != null) {
      const data = new FormData()
      data.append('file', files[0])

      axios.post("http://localhost:5000/upload", data, {}
      ).then(res => {
        console.log(res.statusText)
        requestAugmentedImage()
      }).catch(error => {
        console.log(error)
      })

    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      requestFunctions()
    } else {
      requestAugmentedImage()
    }
  }, [augmentations])


  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={false} sm={4} md={7}>
          <ImageVisualization image={augmentedImage} uploadData={uploadData} />
        </Grid>


        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Augmentations augmentations={augmentations} toggleAugmentation={toggleAugmentation} toggleEditor={toggleEditor} />
        </Grid>
        {editedAugmentation != null ? <AugmentationEditor augmentation={editedAugmentation} toggleEditor={toggleEditor} editAugmentationArguments={editAugmentationArguments} /> : <></>}
      </Grid>
    </div >
  )
}

App.propTypes = { classes: PropTypes.object.isRequired }

export default withStyles(styles)(App)