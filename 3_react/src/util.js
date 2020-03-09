export const formatDatetime = d =>
  new Date()
    .toISOString()
    .substr(0, 19)
    .replace("T", ", ");

export const wasEnterKey = e => e.which === 13 || e.keyCode === 13;
