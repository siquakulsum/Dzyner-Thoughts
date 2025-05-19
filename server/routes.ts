import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route('/api');
  
  // Admin login route (using environment variables)
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Debugging
      console.log("Login attempt with:", username);
      console.log("Environment vars available:", !!process.env.ADMIN_USERNAME, !!process.env.ADMIN_PASSWORD);
      console.log("Expected username:", process.env.ADMIN_USERNAME);
      console.log("Expected password:", process.env.ADMIN_PASSWORD);
      
      // Check against environment variables
      if (username === process.env.ADMIN_USERNAME && 
          password === process.env.ADMIN_PASSWORD) {
        console.log("Login successful");
        return res.status(200).json({ success: true });
      }
      
      console.log("Login failed - credentials do not match");
      return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: 'Error processing login' });
    }
  });

  // GET all services
  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services' });
    }
  });
  
  // POST create new service
  app.post('/api/admin/services', async (req, res) => {
    try {
      const serviceData = req.body;
      const newService = await storage.createService(serviceData);
      res.status(201).json(newService);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: 'Error creating service' });
    }
  });
  
  // PUT update service
  app.put('/api/admin/services/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }
      
      const serviceData = req.body;
      const updatedService = await storage.updateService(id, serviceData);
      
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      res.json(updatedService);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: 'Error updating service' });
    }
  });
  
  // DELETE service
  app.delete('/api/admin/services/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }
      
      const success = await storage.deleteService(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: 'Error deleting service' });
    }
  });

  // GET service by ID
  app.get('/api/services/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid service ID' });
      }
      
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching service' });
    }
  });

  // GET all projects
  app.get('/api/projects', async (req, res) => {
    try {
      const category = req.query.category as string;
      let projects;
      
      if (category) {
        projects = await storage.getProjectsByCategory(category);
      } else {
        projects = await storage.getAllProjects();
      }
      
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching projects' });
    }
  });
  
  // POST create new project
  app.post('/api/admin/projects', async (req, res) => {
    try {
      const projectData = req.body;
      
      // Handle scope array if it comes as a comma-separated string
      if (typeof projectData.scope === 'string') {
        projectData.scope = projectData.scope.split(',').map(item => item.trim());
      }
      
      const newProject = await storage.createProject(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: 'Error creating project' });
    }
  });
  
  // PUT update project
  app.put('/api/admin/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const projectData = req.body;
      
      // Handle scope array if it comes as a comma-separated string
      if (typeof projectData.scope === 'string') {
        projectData.scope = projectData.scope.split(',').map(item => item.trim());
      }
      
      const updatedProject = await storage.updateProject(id, projectData);
      
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: 'Error updating project' });
    }
  });
  
  // DELETE project
  app.delete('/api/admin/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const success = await storage.deleteProject(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: 'Error deleting project' });
    }
  });

  // GET project by ID
  app.get('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching project' });
    }
  });

  // POST new contact message
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const newContact = await storage.createContact(contactData);
      res.status(201).json({
        message: 'Thank you for your message! We will contact you soon.',
        contact: newContact
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: 'Validation error', 
          errors: validationError.details 
        });
      }
      res.status(500).json({ message: 'Error submitting contact form' });
    }
  });
  
  // ADMIN routes
  
  // GET all contacts
  app.get('/api/admin/contacts', async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contacts' });
    }
  });
  
  // GET all services (admin)
  app.get('/api/admin/services', async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services' });
    }
  });
  
  // GET all projects (admin)
  app.get('/api/admin/projects', async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching projects' });
    }
  });
  
  // GET all users
  app.get('/api/admin/users', async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
