export const createChatItem = (owner, text, room) => {
  return {
    room: room,
    owner: owner,
    text: text,
    createdAt: Date.now(),
  };
};
