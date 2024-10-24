type ChattingRoom = {
    chatList: Chat[],
    id: string,
    keyword: string,
    unReadMessagesCount: number;
    opponent: User,
    anonymous: boolean,
    createdAt: Date,
}