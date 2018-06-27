module.exports = class RouterBase{
    constructor(routePath, app, controller) {

    if(!routePath){
        throw new Error("Missing required route path");
    }
    if (!app) {
      throw new Error("Missing required app");
    }
     if (!controller) {
      throw new Error("Missing required controller");
    }

    this.routePath = routePath;
    this.app = app;
    this.controller = controller;

    this.registerRoutes();
  }

  //Abstract method
  get routes() {
    return [];
  }

  // Register all routes with controller methods
   registerRoutes() {    
    this.routes.forEach(route => {
      this.app[route.method.toLowerCase()](this.routePath + route.path, this.controller[route.action].bind(this.controller));
    });
  }
}