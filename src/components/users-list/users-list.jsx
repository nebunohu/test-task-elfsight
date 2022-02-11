import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

// Utils
import { sortUsersByKey } from "../../utils/sort-user-by-key";

// Styles
import styles from './users-list.module.css';

const UsersList = () => {
  const [sortedUsers, setSortedUsers] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [rerender, setRerender] = useState(false);
  const inputRef = useRef(null);
  const { users } = useSelector(store => store.users);

  const onChangeFilterHandler = (event) => {
    event.preventDefault();
    const filterValue = event.target.value;
    setSortedUsers(sortUsersByKey(users, 'id').filter(el => el.username.toLowerCase().startsWith(filterValue.toLowerCase())));
    setRerender(true);
  }

  const onCancelClicHandler = (event) => {
    event.preventDefault();
    if(inputRef.current) inputRef.current.value = '';
    setSortedUsers(sortUsersByKey(users, 'id'));
    setRerender(true);
  }

  if(users.length && !isSorted) {
    setSortedUsers(sortUsersByKey(users, 'id'));
    setIsSorted(true);
  } 
  if(rerender) setRerender(false);

  return (
    <>
      {/*<form className={`${styles.form}`} onChange={onChangeFilterHandler}>
        <label className={`${styles.label}`} htmlFor='filter_value'>Filter by username</label>
        <div className={`${styles.filterWrapper}`}>
          <input type='text' id='filter_value' name='filter_value' ref={inputRef} />
          <button className={`${styles.button}`} onClick={onCancelClicHandler}>Cancel</button>
        </div>
      </form>
      {!!users.length ? 
      <table className={`${styles.table}`}>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
          </tr>
          {sortedUsers.map((el,index) => (<tr key={index}>
            <td>{el.id}</td>
            <td>{el.username}</td>
            <td>{el.first_name}</td>
            <td>{el.last_name}</td>
          </tr>))}
          
        </tbody>
      </table> 
    : 
          null}*/}
    </>
  )
    

};

export default UsersList;