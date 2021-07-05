import { Paper, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

import Augmentation from './Augmentation'

const styles = theme => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
})

const Augmentations = ({ classes, augmentations, toggleAugmentation, toggleEditor }) => {
    return (
        <div className={classes.paper}>
            {augmentations.length > 0 ?
                augmentations.map((augmentation, index) => <Augmentation key={index} augmentation={augmentation} toggleAugmentation={toggleAugmentation} toggleEditor={toggleEditor} />) :
                <h1>Loading</h1>}
        </div>
    )
}

Augmentations.propTypes = { classes: PropTypes.object.isRequired }

export default withStyles(styles)(Augmentations)
