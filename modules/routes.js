import Database from "../Database/index.js";
function ModuleRoutes(app) {
    app.put("/api/modules/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.modules.findIndex((module) => module._id === id);
        if (index === -1) {
          res.status(404).send("Module not found");
          return;
        }
        Database.modules[index] = {
          ...Database.modules[index],
          ...req.body,
        };
        res.json(200);
      });
    app.delete("/api/modules/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.modules.findIndex((module) => module._id === id);
        if (index === -1) {
          res.status(404).send("Module not found");
          return;
        }
        Database.modules.splice(index, 1);
        res.json(204);
      });
    app.post("/api/courses/:cid/modules", (req, res) => {
        const newModule = {
          ...req.body,
          course: req.params.cid,
          _id: new Date().getTime().toString(),
        };
        Database.modules.unshift(newModule);
        res.json(newModule);
      });
    app.get("/api/modules", (req, res) => {
        const modules = Database.modules;
        res.json(modules);
      });
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = Database.modules
      .filter((m) => m.course === cid);
    res.json(modules);
  });
}
export default ModuleRoutes;