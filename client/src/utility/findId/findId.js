const findId = (id, array) => {
  const isTrue = array.some((item) => item === id);
  return isTrue;
};

export default findId;
