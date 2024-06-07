function getDateTime() {
  const date = new Date();
  const currentDateTime = date.toLocaleTimeString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return currentDateTime;
}

export default getDateTime;
