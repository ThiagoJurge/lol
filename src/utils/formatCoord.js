export const formatCoord = (coord) => {
  const coord_final = JSON.parse(coord)
  return [`${coord_final.coordinates[1]}`, `${coord_final.coordinates[0]}`]
}