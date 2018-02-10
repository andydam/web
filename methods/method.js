module.exports = class Method {
  constructor() {
    this.handlers = {};
  }
  method(path, ...handler) {
    if (typeof path === 'string') {
      if (this.handlers[path]) {
        this.handlers[path].push(...handler);
      } else {
        this.handlers[path] = [...handler];
      }
    } else if (typeof path === 'function') {
      if (this.handlers['/']) {
        this.handlers['/'].push(path, ...handler);
      } else {
        this.handlers['/'] = [path, ...handler];
      }
    }
  }
  async handler(request, response) {
    if (this.handlers[request.url]) {
      for (let i = 0; i < this.handlers[request.url].length; i += 1) {
        await this.handlers[request.url][i](request, response);
      }
    }
  }
};
