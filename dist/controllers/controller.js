const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const Joi = require("joi");
const schema = Joi.object({
  id: Joi.string(),
  login: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net']
    }
  }).required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean()
});
const main = (req, res) => {
  res.status(200).json({
    "message": "Follow any link to perform any action in postman",
    "Add User": "localhost:8080/addUser",
    "Get list of Users": "localhost:8080/users",
    "Search for a user by id": "localhost:8080/fetch_user/:id",
    "Update user details": "localhost:8080/update_user/:id",
    "Delete a specific user": "localhost:8080/delete_user/:id",
    "List of Deleted Users": "localhost:8080/deletedUsers",
    "AutoSuggest users based on substring": "localhost:8080/AutoSuggestUsers/:substring/:limit"
  });
};
const addUser = async (req, res) => {
  const user_data = {
    userId: new Date().getTime().toString(36) + Math.random().toString(36).slice(2),
    login: req.body.login,
    password: req.body.password,
    age: req.body.age,
    isDeleted: false
  };
  const {
    error,
    value
  } = schema.validate({
    login: user_data.login,
    password: user_data.password,
    age: user_data.age
  });
  if (error) {
    res.status(400).send(error);
  } else {
    //save user_data in database
    User.create(user_data).then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "some error occured while creating the user"
      });
    });
  }
};
const getusers = (req, res) => {
  User.findAll({
    where: {
      isDeleted: false
    }
  }).then(data => {
    data ? res.send(data) : res.status(404).send({
      message: "No active Users present in db"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "some error in getting users"
    });
  });
};
const fetchUserById = (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  User.findAll({
    where: {
      userId: userId
    }
  }).then(data => {
    data ? res.send(data) : res.status(404).send({
      message: `cannot find user with userId=${userId}`
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "some error in fetching user details"
    });
  });
};
const updateUserDetails = (req, res) => {
  let userId = req.params.id;
  User.update(req.body, {
    where: {
      userId: userId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: `User details with id=${userId} were updated successfully.`
      });
    } else {
      res.send({
        message: `Cannot update user with id=${userId}. Maybe user was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: `Error in updating user details by id=${userId}`
    });
  });
};
const deleteUser = (req, res) => {
  let userId = req.params.id;
  User.update({
    isDeleted: true
  }, {
    where: {
      userId: userId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User soft deleted successfully."
      });
    } else {
      res.send({
        message: `Cannot soft delete  user with id=${id}. Maybe user was not found`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: `Error in soft deleting user by id=${userId}`
    });
  });
};
const listOfDeletedUsers = (req, res) => {
  User.findAll({
    where: {
      isDeleted: true
    }
  }).then(data => {
    data ? res.send(data) : res.status(404).send({
      message: "No deletd Users present in db"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "some error in getting deleting users"
    });
  });
};
const suggestUsers = (req, res) => {
  let substring = req.params.substring;
  let limit = req.params.limit;
  User.findAll({
    where: {
      [Op.and]: [{
        isDeleted: false
      }, {
        login: {
          [Op.substring]: `${substring}`
        }
      }]
    },
    limit: limit
  }).then(data => {
    data ? res.send(data) : res.status(404).send({
      message: "No active Users that match the substring present in db"
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "some error in suggesting users with substring"
    });
  });
};
module.exports = {
  main,
  addUser,
  getusers,
  fetchUserById,
  updateUserDetails,
  deleteUser,
  listOfDeletedUsers,
  suggestUsers
};