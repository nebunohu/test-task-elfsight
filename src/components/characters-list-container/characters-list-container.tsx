import { FC } from "react";
import { useSelector } from "../../hooks";
import CharacterCard from "../character-card/character-card";

// Styles 
import styles from './characters-list-container.module.css';

const CharactersListContainer: FC = () => {
  const { list } = useSelector(store => store.characters);
  return (
    <div className={`${styles.wrapper}`}>
      {list.map((el: any, index: number) => <CharacterCard character={el} key={index} />)}
    </div>
  );
}

export default CharactersListContainer;