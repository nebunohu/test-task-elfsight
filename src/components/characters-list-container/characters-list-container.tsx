import { 
  OutlinedInput, 
  InputLabel,
  Select, 
  MenuItem, 
  Checkbox, 
  ListItemText, 
  SelectChangeEvent 
} from "@mui/material";
import { FC, ChangeEvent, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../../hooks";
import { setFilteredCharactersList } from "../../services/actions/characters-actions";
import { TCharacter } from "../../types/character-type";
import CharacterCard from "../character-card/character-card";

// Styles 
import styles from './characters-list-container.module.css';

type TFilterNames = 'name';

type TFilters = {
  name: string;
  types: Array<string>;
}

const CharactersListContainer: FC = () => {
  const [rerender, setRerender] = useState(false);
  const [renderFiltered, setRenderFiltered] = useState(false);
  const { list, getCharactersRequest } = useSelector(store => store.characters);
  const [filteredCharacters, setFilteredCharacters] = useState(list);
  const [selectedCharactersTypes, setSelectedCharactersTypes] = useState<Array<string>>([]);
  const [filters, setFilters] = useState<TFilters>({name: '', types: []});
  const { filteredList } = useSelector(store => store.characters);
  const dispatch = useDispatch();
  

  const onChangeNameFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const nameFilterValue = event.target.value;
    setFilters({...filters, name: nameFilterValue});
  }

  const handleTypesFilterChange = (event: SelectChangeEvent<typeof selectedCharactersTypes>) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      types: typeof value === 'string' ? value.split(',') : value,
    });
  }

  const getListOfTypes = (list: Array<TCharacter>): Set<string> => {
    let listOfTypes: Set<string> = new Set();
    if(list.length) {
      list.forEach(el => listOfTypes.add(el.type));
    }

    return listOfTypes; 
  }
  const characterTypes = useRef(getListOfTypes(filteredList));
  

  useEffect(() => {
    let nameFilteredCharactersList = [...list];
    let typesFilteredList: Array<TCharacter> = [];
    let key: keyof typeof filters;
    for (key in filters) {
      if( key === 'name' ) {
        const temp = filters[key];
        nameFilteredCharactersList = nameFilteredCharactersList.filter(el => el.name.toLowerCase().includes(temp.toLowerCase()));
        characterTypes.current = getListOfTypes(nameFilteredCharactersList);
      }
      if( key === 'types' ) {
        const temp = filters[key];
        temp.forEach(filterEl => {
          typesFilteredList = typesFilteredList.concat(nameFilteredCharactersList.filter(el => el.type === filterEl));
        })
        
      }
    }
    dispatch(setFilteredCharactersList(filters.types.length ? typesFilteredList : nameFilteredCharactersList));
  },[filters, list]);


  if(rerender) setRerender(false);
  //const renderList = renderFiltered ? filteredCharacters : list;

  return (
    <div className={`${styles.componentWrapper}`}>
      <form className={`${styles.filterForm}`} >
        Filter list of characters
        <label htmlFor="name">Filter by name</label>
        
        <OutlinedInput 
          classes={{root: `${styles.filterFormInput}`}} 
          type="text" 
          id="name" 
          name="name" 
          size='small' 
          onChange={onChangeNameFilterHandler}
        />
        <label htmlFor="type">Filter by type</label>
        <Select
          className={`${styles.selectRoot}`}
          multiple
          id='type'
          labelId='type'
          size='small'
          value={filters.types}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => selected.join(', ')}
          onChange={handleTypesFilterChange}
        >
          {Array.from(characterTypes.current).map((el,index) => <MenuItem value={el} key={index}>
            <Checkbox checked={filters.types.indexOf(el) > -1} />
            <ListItemText primary={el} />
          </MenuItem>)}
        </Select>
      </form>
      <div className={`${styles.charactersListWrapper}`}>
        {getCharactersRequest ? "Loading... " : filteredList.map((el: any, index: number) => <CharacterCard character={el} key={index} />)}
      </div>
    </div>
  );
}

export default CharactersListContainer;