import { OutlinedInput } from "@mui/material";
import { FC, ChangeEvent, useState } from "react";
import { useSelector } from "../../hooks";
import CharacterCard from "../character-card/character-card";

// Styles 
import styles from './characters-list-container.module.css';

const CharactersListContainer: FC = () => {
  const [rerender, setRerender] = useState(false);
  const [renderFiltered, setRenderFiltered] = useState(false);
  const { list, getCharactersRequest } = useSelector(store => store.characters);
  const [filteredCharacters, setFilteredCharacters] = useState(list);

  const onChangeFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const filterValue = event.target.value;
    if(!filterValue) {
      setRenderFiltered(false);
      return
    }
    setFilteredCharacters(list.filter(el => el.name.toLowerCase().includes(filterValue.toLowerCase())));
    setRenderFiltered(true);
    setRerender(true);
  }

  if(rerender) setRerender(false);
  const renderList = renderFiltered ? filteredCharacters : list;

  return (
    <div className={`${styles.componentWrapper}`}>
      <form className={`${styles.filterForm}`} >
        Filter list of characters
        <label htmlFor="name">Filter by name</label>
        <OutlinedInput classes={{root: `${styles.filterFormInput}`}} type="text" id="name" name="name" size='small' onChange={onChangeFilterHandler}/>
      </form>
      <div className={`${styles.charactersListWrapper}`}>
        {getCharactersRequest ? "Loading... " : renderList.map((el: any, index: number) => <CharacterCard character={el} key={index} />)}
      </div>
    </div>
  );
}

export default CharactersListContainer;