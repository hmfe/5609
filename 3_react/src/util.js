// Formats data to YYYY-MM-DD, HH:MM:SS
export const formatDatetime = d =>
  new Date()
    .toISOString()
    .substr(0, 19)
    .replace("T", ", ");

// To combat legacy, use both methods to identify key pressed
export const wasEnterKey = e => e.which === 13 || e.keyCode === 13;
