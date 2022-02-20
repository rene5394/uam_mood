interface MoodCreateDto {
    user_id: number,
    feeling_id: number,
    comment: string | null
}

interface MoodUpdateDto {
    feeling_id: number,
    comment: string | null
}

export { MoodCreateDto, MoodUpdateDto }