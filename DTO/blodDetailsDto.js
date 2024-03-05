class blogDetailsDto {
  constructor(blog) {
    this._id = blog._id;
    this.content = blog.content;
    this.title = blog.title;
    this.createdAT = blog.createdAT;
    this.authorName = blog.author.name;
    // this.autherUserName = blog.auther.username;
    // this.photo = blog.photoPath;
  }
}
export default blogDetailsDto;
