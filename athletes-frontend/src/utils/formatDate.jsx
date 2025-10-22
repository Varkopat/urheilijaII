export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Palautetaan muodossa "dd.mm.yyyy"
  const day = date.getDate().toString().padStart(1, "0");
  const month = (date.getMonth() + 1).toString().padStart(1, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
