import { FC } from "react";
import { Select, OutlinedInput, MenuItem, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';

// Styles 
import styles from './filter-selector.module.css';

type TFilterSelectorProps = {
  onChange: (event: SelectChangeEvent<Array<string>>) => void;
  filter: Array<string>;
  filterItems: Array<string>;
  id: string;
}

const FilterSelector: FC<TFilterSelectorProps> = ({ id, filter, filterItems, onChange }) => {
  return (
    <label className={`${styles.label}`} htmlFor={id}>Filter by {id}
      <Select
        className={`${styles.selectRoot}`}
        multiple
        size="small"
        id={id}
        labelId={`${id}-label`}
        value={filter}
        input={<OutlinedInput />}
        renderValue={(selected) => selected.join(', ')}
        onChange={onChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
              width: "maxContent",
            },
          },
        }}
      >
        {Array.from(filterItems).map((el,index) => <MenuItem value={el} key={index} >
          <Checkbox checked={filter.indexOf(el) > -1} />
          <ListItemText primary={el} />
        </MenuItem>)}
      </Select>
    </label>
  )
}

export default FilterSelector;