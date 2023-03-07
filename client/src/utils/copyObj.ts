export default function copyObj<T>(objToCopy: T): T {
  return JSON.parse(JSON.stringify(objToCopy));
}