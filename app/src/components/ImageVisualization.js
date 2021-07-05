import { IconButton, Button, withStyles } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: {
        overflow: 'hidden',
        height: '1000px',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    input: {
        display: 'none',
    },
})

const ImageVisualization = ({ classes, image, uploadData }) => {
    return (
        image !== null ?
            <div className={classes.root}>
                <img src={image} className={classes.image} />
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={(e) => uploadData(e.target.files)} />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PublishIcon />
                    </IconButton>
                </label>
            </div>
            :
            <h3>Loading image ...</h3>
    )
}

ImageVisualization.propTypes = { classes: PropTypes.object.isRequired }

export default withStyles(styles)(ImageVisualization)
