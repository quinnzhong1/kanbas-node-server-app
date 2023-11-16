import Database from "../Database/index.js";
function AssignmentRoutes(app) {
    app.put("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.assignments.findIndex((a) => a._id === id);
        if (index === -1) {
          res.status(404).send("Assignment not found");
          return;
        }
        Database.assignments[index] = {
          ...Database.assignments[index],
          ...req.body,
        };
        res.json(200);
      });
    app.delete("/api/assignments/:id", (req, res) => {
        const { id } = req.params;
        const index = Database.assignments.findIndex((assignment) => assignment._id === id);
        if (index === -1) {
          res.status(404).send("Assignment not found");
          return;
        }
        Database.assignments.splice(index, 1);
        res.json(204);
      });
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const newAssignment = {
          ...req.body,
          course: req.params.cid,
          _id: new Date().getTime().toString(),
        };
        Database.assignments.unshift(newAssignment);
        res.json(newAssignment);
      });
    app.get("/api/assignments", (req, res) => {
        const assignments = Database.assignments;
        res.json(assignments);
      });
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = Database.assignments
      .filter((a) => a.course === cid);
    res.json(assignments);
  });
}
export default AssignmentRoutes;