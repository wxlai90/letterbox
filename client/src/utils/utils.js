export const timestampToDate = (timestamp) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const date = new Date(timestamp);

    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()

    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const newDates = [day, month, year, hour, minutes, seconds].map(i => _padZero(i))
    return (_formatDate(newDates))
}

const _formatDate = (newDates) => {
    // current format will be:
    // HH:MM:SS on dd MMM yyyy 
    return 'at ' + newDates.slice(3).join(':') + ' on ' + newDates.slice(0, 3).join(' ')
}

const _padZero = (d) => {
    return (d + '').padStart(2, '0')
}

export const lessThanNMinutesAgo = (timestamp) => {
    const now = new Date();
    const lastTime = new Date(timestamp);
    const diffMs = (now - lastTime);
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffMins
}