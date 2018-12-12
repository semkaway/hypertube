export default function showYear(fullDate) {
  if (fullDate !== undefined)
    return fullDate.split('-')[0]
  return ''
}
