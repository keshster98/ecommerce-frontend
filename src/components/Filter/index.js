import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Filter(props) {
  const { categories, category, handler } = props;
  return (
    <FormControl variant="filled" style={{ minWidth: 287 }}>
      <InputLabel id="demo-simple-select-filled-label">
        Filter By Genre
      </InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={category}
        onChange={handler}
      >
        <MenuItem value="All">All</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Filter;
