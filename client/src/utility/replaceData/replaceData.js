const replaceData = (data, newData) => {
  const index = data.findIndex((item) => item._id === newData._id);
  data[index] = newData;
  return data;
};

export default replaceData;
