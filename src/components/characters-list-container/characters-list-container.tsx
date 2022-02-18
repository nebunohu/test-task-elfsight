import { 
  OutlinedInput,
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

type TFilters = {
  name: string;
  statuses: Array<string>;
  specieses: Array<string>;
  genders: Array<string>;
  types: Array<string>;
}

const CharactersListContainer: FC = () => {
  const [rerender, setRerender] = useState(false);
  const { list, getCharactersRequest } = useSelector(store => store.characters);
  const [filters, setFilters] = useState<TFilters>({
    name: '', 
    types: [],
    statuses: [],
    specieses: [],
    genders: [],
  });
  const { filteredList } = useSelector(store => store.characters);
  const dispatch = useDispatch();
  

  const onChangeNameFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const nameFilterValue = event.target.value;
    setFilters({...filters, name: nameFilterValue});
  }

  const handleTypesFilterChange = (event: SelectChangeEvent<Array<string>>, prop: keyof TFilters) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      [prop]: typeof value === 'string' ? value.split(',') : value,
    });
  }

  const getListOfPropValues = (list: Array<TCharacter>, prop: keyof TCharacter): Array<string> => {
    let listOfPropValues: Set<string> = new Set();
    if(list.length) {
      list.forEach(el => listOfPropValues.add(el[prop] as string));
    }

    return Array.from(listOfPropValues); 
  }

  const filterList = (key: keyof typeof filters, filteringList: Array<TCharacter>) => {
    //const filteredListAtStart = filteredCharactersList;
    let filteredList: Array<TCharacter> = [];
    const temp = filters[key] as string[];
    if(temp.length) {
      temp.forEach(filterEl => {
        filteredList = filteredList.concat(filteringList.filter(el => el.type === filterEl));
      })
      //filteredCharactersList = filteredListByType;
    }
    return filteredList;
  }


  const characterTypes = useRef(getListOfPropValues(filteredList, 'type'));
  if (!characterTypes.current.length) {
    characterTypes.current = getListOfPropValues(filteredList, 'type'); // ?
  }
  const characterStatuses = useRef(getListOfPropValues(filteredList, 'status'));
  if (!characterStatuses.current.length) {
    characterStatuses.current = getListOfPropValues(filteredList, 'status'); // ?
  }

  useEffect(() => {
    let nameFilteredCharactersList = [...list];
    let filteredCharactersList = [...list];
    let typesFilteredList: Array<TCharacter> = [];
    let key: keyof typeof filters;
    for (key in filters) {
      if( key === 'name' ) {
        const temp = filters[key];
        filteredCharactersList = filteredCharactersList.filter(el => el.name.toLowerCase().includes(temp.toLowerCase()));
      } 
      if( key === 'types' ) {
        filteredCharactersList = filterList(key, filteredCharactersList);}
        /*const filteredListAtStart = filteredCharactersList;
        let filteredListByType: Array<TCharacter> = [];
        const temp = filters[key];
        if(temp.length) {
          temp.forEach(filterEl => {
            filteredListByType = filteredListByType.concat(filteredListAtStart.filter(el => el.type === filterEl));
          })
          filteredCharactersList = filteredListByType;
        }*/
      //}
      if( key === 'statuses' ) {
        
        const filteredListAtStart = filteredCharactersList;
        let filteredListByStatus: Array<TCharacter> = [];
        const temp = filters[key];
        if(temp.length) {
          temp.forEach(filterEl => {
            filteredListByStatus = filteredListByStatus.concat(filteredListAtStart.filter(el => el.status === filterEl));
          })
          filteredCharactersList = filteredListByStatus;
        }
      }
      //if( key === 'specieses' ) {

      //}
      //if( key === 'genders' ) {

      //}
    }
    //characterTypes.current = getListOfPropValues(filteredCharactersList, 'type');
    //characterStatuses.current = getListOfPropValues(filteredCharactersList, 'status');
    dispatch(setFilteredCharactersList(filteredCharactersList));
  },[filters, list, dispatch]);


  if(rerender) setRerender(false);

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
          onChange={(event) => handleTypesFilterChange(event, 'types')}
        >
          {Array.from(characterTypes.current).map((el,index) => <MenuItem value={el} key={index}>
            <Checkbox checked={filters.types.indexOf(el) > -1} />
            <ListItemText primary={el} />
          </MenuItem>)}
        </Select>
        <label htmlFor="type">Filter by status</label>
        <Select
          className={`${styles.selectRoot}`}
          multiple
          id='status'
          labelId='status'
          size='small'
          value={filters.statuses}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => selected.join(', ')}
          onChange={(event) => handleTypesFilterChange(event, 'statuses')}
        >
          {Array.from(characterStatuses.current).map((el,index) => <MenuItem value={el} key={index}>
            <Checkbox checked={filters.statuses.indexOf(el) > -1} />
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