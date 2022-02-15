import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { getCharactersThunk } from '../../services/actions/characters-actions';
import CharactersListContainer from '../characters-list-container/characters-list-container';
import styles from './app.module.css';

const App: FC = () => {
  const { getCharactersRequest } = useSelector(store => store.characters);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const init = async () => {
      dispatch(getCharactersThunk());
    }

    init();
    
  }, [])

  return (
    <div className={`${styles.wrapper}`}>
      {getCharactersRequest ? "Loading... " : <CharactersListContainer />}
    </div>
  );
}

export default App;
