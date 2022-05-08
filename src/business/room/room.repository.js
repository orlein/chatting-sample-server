const roomRepository = {
  getAllRooms: async () => {
    const rooms = await useDatabase(`SELECT * FROM rooms`, []);
    return rooms;
  },
  getRoomById: async (roomId) => {
    const room = await useDatabase(`SELECT * FROM rooms WHERE id = ?`, [
      roomId,
    ]);
    return room;
  },
  addRoomByUser: async (userId) => {
    const room = await useDatabase(
      `INSERT into rooms (name, creator_user_id) values ('room1', ?)`,
      [userId]
    );

    return room;
  },
  joinRoom: async (roomId, userId) => {
    const room = await useDatabase(
      `INSERT into roomUsers (room_id, user_id) values (?, ?)`,
      [roomId, userId]
    );
    return room;
  },
  getRoomUsers: async (roomId) => {
    const roomUsers = await useDatabase(
      `SELECT * FROM roomUsers WHERE room_id = ?`,
      [roomId]
    );
    return roomUsers;
  },
  getRoomMessages: async (roomId) => {
    const roomMessages = await useDatabase(
      `SELECT * FROM messages WHERE room_id = ?`,
      [roomId]
    );
    return roomMessages;
  },
  addMessage: async (roomId, userId, message) => {
    const messageResult = await useDatabase(
      `INSERT into messages (room_id, user_id, message) values (?, ?, ?)`,
      [roomId, userId, message]
    );
    return messageResult;
  },
  quitRoom: async (roomId, userId) => {
    const room = await useDatabase(
      `DELETE FROM roomUsers WHERE room_id = ? AND user_id = ?`,
      [roomId, userId]
    );
  },
};

module.exports = roomRepository;
