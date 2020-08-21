import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: "10px",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
}));

const ChooseQuestion = ({availableQuestions,chosen, setter}) => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  console.log("here")
  console.log(availableQuestions);

  const handleChange = (event) => {
    setter(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Question</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={chosen}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {availableQuestions.map(id=>{
                  return(<MenuItem value={id}>{id}</MenuItem>)
          })}
        </Select>
      </FormControl>
    </div>
  );
}
export default ChooseQuestion