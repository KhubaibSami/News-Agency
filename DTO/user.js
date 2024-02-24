class UserDTO {
  constructor(user) {
    this._id = user._id;
  this.username= user.userName;
  this.email=user.email;
}
}
export default UserDTO;