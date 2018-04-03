module.exports = class Method {
  constructor() {
    this.handlers = {};
    this.statics = {};
  }
  method(path, ...handler) {
    if (typeof path === 'string') {
      if (handler[0].isStatic) {
        this.statics[path] = handler[0];
      } else {
        if (this.handlers[path]) {
          this.handlers[path].push(...handler);
        } else {
          this.handlers[path] = [...handler];
        }
      }
    } else if (typeof path === 'function') {
      if (path.isStatic) {
        this.statics['/'] = path;
      } else {
        if (this.handlers['/']) {
          this.handlers['/'].push(path, ...handler);
        } else {
          this.handlers['/'] = [path, ...handler];
        }
      }
    }
  }
  async handler(request, response) {
    for (
      let i = 0, statics = Object.keys(this.statics);
      i < statics.length;
      i += 1
    ) {
      if (request.url.lastIndexOf(statics[i], 0) === 0) {
        return this.statics[statics[i]](request, response, statics[i]);
      }
    }

    for (
      let i = 0, handler = Object.keys(this.handlers);
      i < handler.length;
      i += 1
    ) {
      if (handler[i].indexOf(':') > -1) {
        const path = handler[i].replace(/:.+$/, '');
        const paramName = handler[i].replace(/^.+:/, '');

        if (request.url.lastIndexOf(path, 0) === 0) {
          const paramValue = request.url.substr(path.length);
          const requestWithParam = {
            ...request,
            params: { [paramName]: paramValue },
          };

          for (let o = 0; o < this.handlers[handler[i]].length; o += 1) {
            await this.handlers[handler[i]][o](requestWithParam, response);
          }
        }
      } else if (handler[i] === request.url) {
        for (let o = 0; o < this.handlers[handler[i]].length; o += 1) {
          await this.handlers[handler[i]][o](request, response);
        }
      }
    }
  }
};
