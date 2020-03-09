export const formatDatetime = d =>
  new Date()
    .toISOString()
    .substr(0, 19)
    .replace("T", ", ");
