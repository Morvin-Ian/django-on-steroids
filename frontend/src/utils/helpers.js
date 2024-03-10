export function formatDateTime(date) {
    const currentDate = new Date(date);
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let meridiem = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedTime = hours + ':' + minutes + ' ' + meridiem;

    const formattedDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);

    return {
        date: formattedDate,
        time: formattedTime
    };
}