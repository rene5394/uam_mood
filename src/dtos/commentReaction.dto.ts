interface CommentReactionCreateDto {
    user_id: number,
    comment_id: number,
    reaction_id: number
}

interface CommentReactionUpdateDto {
    reaction_id: number
}

export { CommentReactionCreateDto, CommentReactionUpdateDto }