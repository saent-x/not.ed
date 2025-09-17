export function getInitials(name: string): string {
  const arr = name.toUpperCase().split(" ");
  
  return arr.length > 1 ? arr[0].at(0)! + arr[1].at(0) : arr[0].at(0)!;
}
