const Project = require('../models/Project');

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// POST new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, githubUrl, imageUrl } = req.body;
    const newProject = new Project({ title, description, githubUrl, imageUrl });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Data' });
  }
};

// PUT update project
exports.updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update Failed' });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete Failed' });
  }
};
