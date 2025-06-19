export class User {
  constructor(id, username, email, password, resetToken = null) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.resetToken = resetToken;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}
