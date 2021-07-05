import { Button, Card, CardActions, Typography, CardContent, CardHeader, Checkbox, withStyles } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const styles = theme => ({
    text: {
        fontSize: 16,
        height: '20vh',
        whiteSpace: 'pre-wrap',
        overflowY: 'scroll'
    }
})

const Augmentation = ({ classes, augmentation, toggleAugmentation, toggleEditor }) => {
    return (
        <Card className={classes.card}>
            <CardHeader action={
                <Checkbox
                    checked={augmentation.active}
                    onChange={() => toggleAugmentation(augmentation.signature)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            } title={augmentation.name} subheader={augmentation.signature}
            />

            <CardContent className={classes.text}>
                <Typography color='textSecondary'>{augmentation.doc}</Typography>
            </CardContent>

            <CardActions>
                <Button size='small' onClick={() => toggleEditor(augmentation)}>Edit</Button>
            </CardActions>
        </Card>
    )
}

Augmentation.propTypes = { classes: PropTypes.object.isRequired }

export default withStyles(styles)(Augmentation)
