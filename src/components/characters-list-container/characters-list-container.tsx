import { 
  OutlinedInput,
  SelectChangeEvent 
} from "@mui/material";
import { FC, ChangeEvent, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../../hooks";
import { setFilteredCharactersList } from "../../services/actions/characters-actions";
import { TCharacter } from "../../types/character-type";
import CharacterCard from "../character-card/character-card";
import FilterSelector from "../../filter-selector/filter-selector";

// Styles 
import styles from './characters-list-container.module.css';

export type TFilters = {
  name: string;
  status: Array<string>;
  species: Array<string>;
  gender: Array<string>;
  type: Array<string>;
}

const CharactersListContainer: FC = () => {
  const { list, getCharactersRequest, filteredList } = useSelector(store => store.characters);
  const [filters, setFilters] = useState<TFilters>({
    name: '', 
    type: [],
    status: [],
    species: [],
    gender: [],
  });
  const characterTypes = useRef<Array<string>>([]);
  const characterStatuses = useRef<Array<string>>([]);
  const characterSpecies = useRef<Array<string>>([]);
  const characterGenders = useRef<Array<string>>([]);
  const dispatch = useDispatch();

  
  

  const onChangeNameFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const nameFilterValue = event.target.value;
    setFilters({...filters, name: nameFilterValue});
  }

  const handleFilterChange = (event: SelectChangeEvent<Array<string>>, prop: keyof TFilters) => {
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

  if(!characterTypes.current.length) characterTypes.current = getListOfPropValues(filteredList, 'type');
  if(!characterStatuses.current.length) characterStatuses.current = getListOfPropValues(filteredList, 'status');
  if(!characterSpecies.current.length) characterSpecies.current = getListOfPropValues(filteredList, 'species');
  if(!characterGenders.current.length) characterGenders.current = getListOfPropValues(filteredList, 'gender');

  const filterList = (filter: keyof typeof filters, filteringList: Array<TCharacter>) => {
    let filteredList: Array<TCharacter> = [];
    const temp = filters[filter] as string[];
    if(temp.length) {
      temp.forEach(filterEl => {
        const foundItems = filteringList.filter(el => el[filter] === filterEl);
        filteredList = filteredList.concat(foundItems);
      })
    } else {
      filteredList = filteringList;
    }
    return filteredList;
  }

  useEffect(() => {
    let filteredCharactersList = [...list];
    let key: keyof typeof filters;
    for (key in filters) {
      if( key === 'name' ) {
        const temp = filters[key];
        filteredCharactersList = filteredCharactersList.filter(el => el.name.toLowerCase().includes(temp.toLowerCase()));
      } else {
         filteredCharactersList = filterList(key, filteredCharactersList);
      }
        
    }
    
    dispatch(setFilteredCharactersList(filteredCharactersList));
  },[filters, list, dispatch]);

  return (
    <div className={`${styles.componentWrapper}`}>
      <form className={`${styles.filterForm}`} >
        Filter list of characters

        <label htmlFor="name">Filter by name</label>
        <OutlinedInput 
          classes={{root: `${styles.filterFormInput}`}} 
          sx={{"marginBottom": "10px"}}
          type="text" 
          id="name" 
          name="name" 
          size='small' 
          onChange={onChangeNameFilterHandler}
        />
        <div className={`${styles.filtersWrapper}`} >
          <FilterSelector 
            id='type'
            filter={filters.type}
            filterItems={characterTypes.current}
            onChange={(event: SelectChangeEvent<Array<string>>) => {handleFilterChange(event, 'type')}}
          />

          <FilterSelector 
            id='status'
            filter={filters.status}
            filterItems={characterStatuses.current}
            onChange={(event: SelectChangeEvent<Array<string>>) => {handleFilterChange(event, 'status')}}
          />

          <FilterSelector 
            id='species'
            filter={filters.species}
            filterItems={characterSpecies.current}
            onChange={(event: SelectChangeEvent<Array<string>>) => {handleFilterChange(event, 'species')}}
          />

          <FilterSelector 
            id='gender'
            filter={filters.gender}
            filterItems={characterGenders.current}
            onChange={(event: SelectChangeEvent<Array<string>>) => {handleFilterChange(event, 'gender')}}
          />
        </div>
      </form>
      <div className={`${styles.charactersListWrapper}`}>
        {getCharactersRequest ? "Loading... " : filteredList.map((el: any, index: number) => <CharacterCard character={el} key={index} />)}
      </div>
    </div>
  );
}

export default CharactersListContainer;