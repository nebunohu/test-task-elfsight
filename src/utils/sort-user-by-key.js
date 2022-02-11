export const sortUsersByKey = (users, key) => {
  function compareUsers(item1, item2) {
    if (item1[key] > item2[key]) {
      return 1;
    }
    if (item1[key] < item2[key]) {
      return -1;
    }
    return 0;
  }
  return users.sort(compareUsers);
}