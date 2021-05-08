export default function capitalize (str) {
  let res = ''
  try {
    res = str.substr(0, 1).toUpperCase() + str.substr(1)
  } catch (e) {}
  return res
}
