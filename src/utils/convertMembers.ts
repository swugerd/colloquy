const convertMembers = (count: number) => {
  if (count > 999999) {
    count = Math.floor(count / 1000000);
    return `${count} млн.`;
  } else if (count > 999) {
    count = Math.floor(count / 1000);
    return `${count} тыс.`;
  }
  return count;
};

export default convertMembers;
