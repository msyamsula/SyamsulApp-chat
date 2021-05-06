import { group } from "../models/group.js";
import { output } from "../utility/output.js";
import { userGroup } from "../models/userGroup.js";

export const createGroup = async (groupName) => {
  let whereClause = {
    where: {
      name: groupName,
    },
  };
  try {
    let result = await group.findAll(whereClause);
    if (result.length == 0) {
      let theGroup = {
        name: groupName,
      };
      try {
        await group.create(theGroup);
      } catch (error) {
        return output(500, "error when creating group", error);
      }
    } else {
      return output(400, "group name is already used");
    }
  } catch (error) {
    return output(500, "error when checking group", error);
  }

  return output(200, "success", groupName);
};

// memberIds = []
export const addGroupMember = async (memberIds, groupName, creatorId) => {
  let theGroup;
  let whereClause = {
    where : {
      name: groupName
    }
  }
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
      groupId: theGroup.id,
      isApprove: parseInt(memberIds[i]) == parseInt(creatorId) ? true : false,
    };
    data.push(ug);
    try {
      await userGroup.create(ug);
    } catch (error) {
      return output(500, "error when creating user_group", error);
    }
  }

  return output(200, "success", data);
};

// console.log(await createGroup("test"))
// console.log(await addRoomMember([1,2,3], "test"));
