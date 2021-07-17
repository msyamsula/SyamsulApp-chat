const { group } = require("../models/group.js");
const { output } = require("../utility/output.js");
const { userGroup } = require("../models/userGroup.js");
const { connect } = require("../connections/mongo.js");

const createGroupService = async (groupName) => {
  let theGroup;
  try {
    theGroup = {
      name: groupName,
    };
    let db_resp = await group.create(theGroup);
    theGroup = db_resp["dataValues"];
  } catch (error) {
    return output(500, "service error when creating group", error);
  }

  return output(200, "success", theGroup);
};

// memberIds = []
const addGroupMember = async (memberIds, groupId) => {
  let theGroup;
  let whereClause = {
    where: {
      id: groupId,
    },
  };
  try {
    theGroup = await group.findAll(whereClause);
  } catch (error) {
    return output(500, "error when checking groupName", error);
  }

  if (theGroup.length === 0) {
    return output(404, "group not found", []);
  }
  theGroup = theGroup[0]["dataValues"];

  let data = [];
  for (let i = 0; i < memberIds.length; i++) {
    let ug = {
      userId: memberIds[i],
      groupId: groupId,
    };
    data.push(ug);
    try {
      await userGroup.create(ug);
    } catch (error) {
      return output(500, "error when adding user to group", error);
    }
  }

  return output(200, "success", data);
};

const createMongoRoom = async (groupId, groupName) => {
  let roomName = `${groupId}-${groupName}`;
  let collection = mongodb.collection(roomName);

  let initData = {
    init: "init",
  };
  try {
    // create init data
    let resp = await collection.insertOne(initData);
    // delete init data
    resp = await collection.deleteOne({ init: "init" });
    resp = output(200, "success", resp);
    return resp;
  } catch (error) {
    let resp = output(
      500,
      `service error when initialize room ${roomName}`,
      error
    );
    return resp;
  }
};

const getAllMyGroupService = async (userId) => {
  let whereClause = {
    where: {
      userId: userId,
    },
  };
  try {
    let resp = await userGroup.findAll(whereClause);

    let myGroups = [];
    for (let i = 0; i < resp.length; i++) {
      let currentGroupId = resp[i]["dataValues"]["groupId"];
      let currentGroup = await getGroupById(currentGroupId);
      myGroups.push(currentGroup.data);
    }

    return output(200, "success", myGroups);
  } catch (error) {
    return output(
      500,
      "service error when find all my group",
      error.toString()
    );
  }
};

const getGroupById = async (groupId) => {
  let whereClause = {
    where: {
      id: groupId,
    },
  };
  try {
    let resp = await group.findOne(whereClause);
    resp = output(200, "success", resp["dataValues"]);
    return resp;
  } catch (error) {
    let resp = output(
      500,
      `error when find group ${groupId}`,
      error.toString()
    );
    return resp;
  }
};

module.exports = {
  getAllMyGroupService,
  getGroupById,
  createMongoRoom,
  addGroupMember,
};

// console.log(await createGroup("test"))
// console.log(await addGroupMember([1,3,4], 1));
// console.log(await createMongoRoom(1, "test"));
// console.log(await getGroupById(1));
