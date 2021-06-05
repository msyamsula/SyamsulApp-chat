import {createGroupService, addGroupMember, createMongoRoom, getAllMyGroupService} from "../services/group.js"
import {output} from "../utility/output.js"

export const createGroup = async (req, res) => {
    // preparation
    const groupName = req.body.group_name
    const memberIds = req.body.member_ids

    let groupId
    try {
        // create group
        let resp = await createGroupService(groupName)
        console.log(resp);
        if (resp.status != 200){
            res.status(resp.status).send(resp)
            return
        }
        groupId = resp.data.id

        // add member to group
        resp = await addGroupMember(memberIds, groupId)
        if (resp.status != 200){
            res.status(resp.status).send(resp)
            return
        }

        // create mongo room
        resp = await createMongoRoom(groupId, groupName)
        if (resp.status != 200){
            res.status(resp.status).send(resp)
            return
        }
        
        // success
        resp = output(200, `${groupName} created`, null)
        res.send(resp)
    } catch (error) {
        console.log(error);
        let resp = output(500, "controller error when creating group", error)
        res.status(500).send(resp)
    }
}

export const getAllMyGroup = async (req, res) => {
    const userId = req.body.id

    try {
        let resp = await getAllMyGroupService(userId)
        if (resp.status != 200){
            res.status(resp.status).send(resp)
        }
        res.send(resp)
    } catch (error) {
        let resp = output(500, "controller error when get all my group", error)
        res.status(500).send(resp)
    }
}