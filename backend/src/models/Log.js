class LogModel {
  constructor({ ip, userAgent, time, visitedCount }) {
    this.ip = ip;
    this.userAgent = userAgent;
    this.time = time || new Date().toISOString();
    this.visitedCount = visitedCount || 1;
    this.id = crypto.randomUUID();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}
export default LogModel;
