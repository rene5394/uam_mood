function UTCDateTimeToLocal(date: Date): Date {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000
    const localDateTime = new Date(date.getTime() + userTimezoneOffset)

    return localDateTime
}

export { UTCDateTimeToLocal }