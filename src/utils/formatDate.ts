export const formatDate = (date: string, type="dash") => {
    const dateStr = new Date(date);
    const day = `${dateStr.getDate()}`.length === 1 ? `0${dateStr.getDate()}` : dateStr.getDate();
    const month = `${dateStr.getMonth()}`.length === 1 ? `0${dateStr.getMonth() + 1}` : dateStr.getMonth() + 1;
    const year = dateStr.getFullYear();

    return type === 'dash' ? `${year}-${month}-${day}` : `${year}/${month}/${day}`
}