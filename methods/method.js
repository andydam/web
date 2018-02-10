module.exports = class Method {
  constructor() {
    this.handlers = [];
  }
  method(handler) {
    this.handlers.push(handler);
  }
  async handler(request, response) {
    for (let i = 0; i < this.handlers.length; i += 1) {
      await this.handlers[i](request, response);
    }
  }
};
