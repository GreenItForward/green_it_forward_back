export function convertToDate(date: string): Date {
    const [day, month, year] = date.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }