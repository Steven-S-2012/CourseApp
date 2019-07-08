export function truncateWords(data, maxLen) {
  let newData = String(data);
  newData = newData.length <= maxLen ? newData : `${newData.substring(0, maxLen)}...`;
  return newData;
}

export function statusCodeToError(statusCode) {
  if (statusCode === 200) return '';
  if (statusCode === 404) return 'No such record.';
  return 'Sorry, something is incorrect.';
}
