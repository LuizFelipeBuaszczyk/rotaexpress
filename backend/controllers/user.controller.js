const userService = require("../services/user.service");
const memberService = require("../services/member.service");

async function getUserById(req, res) {
  try {
    const users = await userService.getUserById(req.user.id_user);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUsers(req, res, next) {
  try {
    const updateData = req.body;
    const { id_user } = req.user;
    const newData = await userService.updateUser(updateData, id_user);
    res.json(newData);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id_user } = req.user;
    await userService.deleteUser(id_user);
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Usuário deletado com sucesso" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function changePassword(req, res, next){
  try {
    const { id_user } = req.user;
    const responseData = await userService.changePassword(id_user, req.body.password);
    res.json(responseData);
  } catch (error){
    next(error);
  }
}

async function getFirmsWhenUserIsMember(req, res, next) {
  try{
    const { id_user } = req.user;
    const firms = await memberService.getMemberByUser(id_user);
    res.json(firms);
  }catch(error){
    next(error);
  }
}

module.exports = { 
  getUserById, 
  updateUsers, 
  deleteUser, 
  changePassword, 
  getFirmsWhenUserIsMember 
};
