import { group } from "../models/group.js"
import {createGroupService, addGroupMember, createMongoRoom} from "../services/group.js"
import {get_payload} from "../utility/jwt.js"
import {output} from "../utility/output.js"

export const createGroup = async (req, res) => {
    // preparation
    // get token, get payload
    // create appropriate variable
    const token = req.body.token
    let payload
    try {
        payload = await get_payload(token)
    } catch (error) {
        let resp = output(500, "controller error when getting jwt payload", error)
        res.status(500).send(resp)
    }

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