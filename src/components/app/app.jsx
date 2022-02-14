import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCharactersThunk } from '../../services/actions/characters-actions';
import AppHeader from '../app-header/app-header';
import CharacterCard from '../character-card/character-card';
import UsersList from '../users-list/users-list';
import styles from './app.module.css';

function App() {
  const { getCharactersRequest, list } = useSelector(store => store.characters);
  const { isAuth } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const init = async () => {
      dispatch(getCharactersThunk());
    }

    init();
    
  }, [])

  return (
    <div className={`${styles.wrapper}`}>
      {list.map((el, index) => <CharacterCard character={el} key={index} />)}
    </div>
  );
}

export default App;
