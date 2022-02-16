import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { clearIsModalOpened } from '../../services/actions/app-actions';
import { getCharactersThunk } from '../../services/actions/characters-actions';
import CharactersListContainer from '../characters-list-container/characters-list-container';
import Modal from '../modal/modal';
import styles from './app.module.css';

const App: FC = () => {
  const { getCharactersRequest } = useSelector(store => store.characters);
  const { isModalOpened } = useSelector(store => store.app);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(clearIsModalOpened());
  }
  
  useEffect(() => {
    const init = async () => {
      dispatch(getCharactersThunk());
    }

    init();
    
  }, [])

  return (
    <div className={`${styles.wrapper}`}>
      
      <CharactersListContainer />
      {isModalOpened && <Modal closeModal={closeModal} /> }
    </div>
  );
}

export default App;
