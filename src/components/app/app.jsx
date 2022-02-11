import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCharactersThunk } from '../../services/actions/characters-actions';
import AppHeader from '../app-header/app-header';
import UsersList from '../users-list/users-list';
import styles from './app.module.css';

function App() {
  const { getCharactersRequest } = useSelector(store => store.characters);
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
      
    </div>
  );
}

export default App;
