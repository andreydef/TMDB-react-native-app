export function filterUniqueValues(data) {
  const keys = ['id', 'title'];
  const filteredData = data.filter(
    (value, index, self) =>
      self.findIndex(v => keys.every(k => v[k] === value[k])) === index,
  );
  return filteredData;
}
