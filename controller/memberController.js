const Member = require('../models/Member');

// Retrieve All members
module.exports.getAllMembers = () => {
    return Member.find({}, 'role name children.name').then((result) => {
        return result;
    })
}

// Create a member
module.exports.createMember = async (reqBody) => {

    const isExist = await Member.findOne({ name: reqBody.name}).then((result) => {
        if(result){
            return true
        } else {
            return false
        }
    })

    if(isExist){
        return false
    } else {

        let newMember = new Member({
            role: reqBody.role,
            name: reqBody.name,
            spouse: reqBody.spouse,
            father: reqBody.father,
            mother: reqBody.mother,
        })
        
        let isMemberSaved = await newMember.save().then((member, error) => {
            if(error){
                return false
            } else {
                return true
            }
        })

        let isFatherSaved = await Member.findOne({ name: reqBody.father }).then((father) => {
            if(father === null){
                return true
            } else {
                father.children.push({
                    _id: newMember._id,
                    name: newMember.name
                })
    
                return father.save().then((saved, error) => {
                    if(error){
                        return false
                    } else {
                        return true
                    }
                })
            }
        })

        let isMotherSaved = await Member.findOne({ name: reqBody.mother }).then((mother) => {
            if(mother === null){
                return true
            } else {
                mother.children.push({
                    _id: newMember._id,
                    name: newMember.name
                })
    
                return mother.save().then((saved, error) => {
                    if(error){
                        return false
                    } else {
                        return true
                    }
                })
            }
            
        })


        if(isMemberSaved && isMotherSaved && isFatherSaved){
            return true;
        } else{
            return false;
        }
    }

}

// Retrieve specific Member
module.exports.getMember = (reqParams) => {
    return Member.findById(reqParams).then((result) => {
        if(result){
            return result
        } else {
            return false
        }
    })
    .catch((error) => {
        return false
    })
}

// Update a member
module.exports.updateMember = async (reqParams, updatedData) => {
    return Member.findById(reqParams).then((result) => {
        if(result){
            (result.role = updatedData.role ? updatedData.role : result.role),
            (result.name = updatedData.name ? updatedData.name : result.name),
            (result.father = updatedData.father ? updatedData.father : result.father),
            (result.mother = updatedData.mother ? updatedData.mother : result.mother)

            return result.save().then((updated, err) => {
                if(err){
                    return false;
                } else {
                    return true
                }
            })
        } else {
            return false
        }
    })
    .catch((error) => {
        return false
    })
}

// Delete Member
module.exports.deleteMember = (reqParams) => {
    return Member.deleteOne({_id: reqParams}).then((deleted, err) => {
        if(err){
            return false;
        } else {
            return true
        }
    })
    .catch((error) => {
        return false
    })
}


