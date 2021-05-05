export const createChatItem = (text, room) => {
  return {
    room: room,
    text: text,
    createdAt: Date.now(),
  };
};
