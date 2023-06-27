export const getDate = (date) => {
  const date_new = new Date(parseInt(date, 10));
  console.log(date_new);
  return (
    date_new.toLocaleTimeString() + " | " + date_new.toLocaleDateString()
  )
}