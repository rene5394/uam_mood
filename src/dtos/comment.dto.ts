interface CommentCreateDto {
    user_id: number,
    mood_id: number,
    comment: string
}

interface CommentUpdateDto {
    comment: string
}

export { CommentCreateDto, CommentUpdateDto }