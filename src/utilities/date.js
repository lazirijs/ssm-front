exports.toDate = (e, type = 'date') => {
    const newDate = e ? new Date(e) : new Date();
    let date = {
        year: newDate.getFullYear(),
        month: String(newDate.getMonth()+1).padStart(2,'0'),
        day: String(newDate.getDate()).padStart(2,'0'),
        hours: String(newDate.getHours()).padStart(2,'0'),
        minutes: String(newDate.getMinutes()).padStart(2,'0'),
    };
    const types = {
        minutes: date.minutes,
        hours: date.hours,
        day: date.day,
        month: date.month,
        year: date.year,
        time: `${date.hours}:${date.minutes}`,
        date: `${date.year}-${date.month}-${date.day}`,
        timestamp: `${date.year}-${date.month}-${date.day} ${date.hours}:${date.minutes}`
    }
    return types[type];
};