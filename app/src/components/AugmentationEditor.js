import { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles } from '@material-ui/core'

const styles = theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
})

const AugmentationEditor = ({ augmentation, toggleEditor, editAugmentationArguments }) => {
    const [args, setArgs] = useState(augmentation.args)

    const handleChange = (argName, argValue) => {
        setArgs(args.map((prevArg) => prevArg.name === argName ? { ...prevArg, value: argValue } : prevArg))
    }

    return (
        <Dialog open={augmentation !== null} onClose={() => toggleEditor(augmentation)} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Edit augmentation arguments</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Parameters:
                    {augmentation.argsDoc}
                </DialogContentText>
                {args.map((arg, index) => (
                    <TextField key={index} label={arg.name} name={arg.name} defaultValue={arg.value} variant="outlined" onChange={e => handleChange(e.target.name, e.target.value)} />
                ))}

            </DialogContent>
            <DialogActions>
                <Button onClick={() => toggleEditor(augmentation)} color='primary'>
                    Cancel
                </Button>
                <Button onClick={() => {
                    toggleEditor(augmentation)
                    editAugmentationArguments(augmentation, args)
                }} color='primary'>
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(AugmentationEditor)
