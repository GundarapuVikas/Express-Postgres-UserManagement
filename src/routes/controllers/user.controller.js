const User=require("../../models/user.model")
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");

const main=(_req,res)=>{
    return res.status(200).json({
        "message":"Follow any link to perform any action in postman",
        "Add User":"localhost:8080/addUser",
        "Get list of Users":"localhost:8080/users",
        "Search for a user by id":"localhost:8080/fetch_user/:id",
        "Update user details":"localhost:8080/update_user/:id",
        "Delete a specific user":"localhost:8080/delete_user/:id",
        "List of Deleted Users":"localhost:8080/deletedUsers",
        "AutoSuggest users based on substring":"localhost:8080/AutoSuggestUsers/:substring/:limit"
    });
};

const addUser=async(req,res)=>{
    const user_data=req.body;
    try {
        const newUser=await User.create({
            id:uuidv4(),
            login:user_data.login,
            password:user_data.password,
            age:user_data.age,
            isDeleted:false
        });
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(400).json({"message":error.message || "some error occured while creating the user"});
    }
};

const getusers=async(_req,res)=>{
    try {
        const list_of_users=await User.findAll({where: {isDeleted:false}});
        return list_of_users?res.status(200).json(list_of_users):res.status(404).json({"message":"No active Users present in db"});
    } catch (error) {
        return res.status(500).json({"message":err.message || "some error in getting users"});
    }
};

const fetchUserById=async(req,res)=>{
    const userId=req.params.id;
    try {
        const fetchedUser=await User.findAll({where: {userId:userId}});
        return fetchedUser?res.status(200).json(fetchedUser):res.status(404).json({"message":`cannot find user with userId=${userId}`})
    } catch (error) {
        return res.status(500).json({message:err.message || "some error in fetching user details"})
    }
}

const updateUserDetails=async(req,res)=>{
    const userId=req.params.id;
    try {
        const status=await User.update(req.body,{
            where:{userId:userId}
        })
        return (status==1)?res.status(200).json({"message": `User details with id=${userId} were updated successfully.`})
            :res.status(404).json({"message": `Cannot update user with id=${userId}. Maybe user was not found or req.body is empty!`})
    } catch (_error) {
        return res.status(500).json({"message":`Error in updating user details by id=${userId}`});
    }
};

const deleteUser=async(req,res)=>{
    let userId=req.params.id;
    try {
        const status=await User.update(
            {
                isDeleted:true,
            },
            {
                where:{userId:userId}
            }
        )
        return (status==1)?res.status(200).json({"message": `User with id=${userId} is soft deleted successfully.`})
        :res.status(404).json({"message": `Cannot soft delete  user with id=${id}. Maybe user was not found`})
    } catch (error) {
        res.status(500).json({"message":`Error in soft deleting user by id=${userId}`});
    }
};

const listOfDeletedUsers=(_req,res)=>{
    User.findAll({where: {isDeleted:true}})
    .then(data=>{
        data? res.status(200).json(data):res.status(404).json({"message":"No deletd Users present in db"})
    })
    .catch(err=>{
        res.status(500).json({"message":err.message || "some error in getting deleting users"});
    });
};

const suggestUsers=async(req,res)=>{
    let substring=req.params.substring;
    let limit=req.params.limit;
    try {
        const suggestedUsers=await User.findAll(
            {
                where: {
                    [Op.and]:[
                        {isDeleted:false},
                        {login:{
                            [Op.substring]:`${substring}`,
                        }}
                    ]
                },
                limit:limit
            }
        );
        return suggestedUsers? res.status(200).json(suggestedUsers):res.status(404).json({"message":"No active Users that match the substring present in db"})
    } catch (error) {
        return res.status(500).json({"message":err.message || "some error in suggesting users with substring"});
    }
};

module.exports={
    main,
    addUser,
    getusers,
    fetchUserById,
    updateUserDetails,
    deleteUser,
    listOfDeletedUsers,
    suggestUsers
}