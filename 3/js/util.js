// Formats data to YYYY-MM-DD, HH:MM:SS
const formatDatetime = d =>
  new Date(d)
    .toISOString()
    .substr(0, 19)
    .replace("T", ", ");
