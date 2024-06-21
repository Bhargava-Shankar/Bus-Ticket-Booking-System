
export const gteDate = (date: string): string => new Date(date).toISOString();

export const ltDate = (date: string): string => new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toISOString();


