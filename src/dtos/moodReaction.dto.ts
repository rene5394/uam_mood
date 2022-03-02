interface MoodReactionCreateDto {
    user_id: number,
    mood_id: number,
    reaction_id: number
}

interface MoodReactionUpdateDto {
    reaction_id: number
}

export { MoodReactionCreateDto, MoodReactionUpdateDto }