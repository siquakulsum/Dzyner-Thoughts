import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  projects, type Project, type InsertProject,
  contacts, type Contact, type InsertContact
} from "@shared/schema";
import { db } from "./db";
import { eq, like } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // Users
  getAllUsers(): Promise<User[]>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Services
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Projects
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Contacts
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

// Database Storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
  
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }
  
  async updateService(id: number, serviceData: Partial<InsertService>): Promise<Service | undefined> {
    const [updatedService] = await db
      .update(services)
      .set(serviceData)
      .where(eq(services.id, id))
      .returning();
    return updatedService || undefined;
  }
  
  async deleteService(id: number): Promise<boolean> {
    const result = await db
      .delete(services)
      .where(eq(services.id, id))
      .returning({ id: services.id });
    return result.length > 0;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(like(projects.categories, `%${category}%`));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }
  
  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set(projectData)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject || undefined;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const result = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning({ id: projects.id });
    return result.length > 0;
  }

  // Contact methods
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }
  
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contactData = {
      ...insertContact,
      phone: insertContact.phone || null
    };
    
    const [contact] = await db
      .insert(contacts)
      .values(contactData)
      .returning();
    return contact;
  }

  // Initialize default data
  async initializeDefaultData() {
    // Check if we already have services in the database
    const existingServices = await this.getAllServices();
    if (existingServices.length === 0) {
      console.log("Initializing default services...");
      await this.initDefaultServices();
    }

    // Check if we already have projects in the database
    const existingProjects = await this.getAllProjects();
    if (existingProjects.length === 0) {
      console.log("Initializing default projects...");
      await this.initDefaultProjects();
    }
  }

  private async initDefaultServices() {
    const defaultServices: InsertService[] = [
      {
        title: "Space Planning",
        description: "Optimize your living or working environment with thoughtful space planning that maximizes functionality and flow.",
        icon: "bi-layout-text-window"
      },
      {
        title: "Color Consultation",
        description: "Select the perfect palette to create the desired ambiance and psychological effect in your space.",
        icon: "bi-palette"
      },
      {
        title: "Furniture & Decor Selection",
        description: "Source and select furniture and decor pieces that reflect your style while meeting your practical needs.",
        icon: "bi-shop"
      },
      {
        title: "3D Rendering & Visualization",
        description: "Experience your space before it's built with photorealistic 3D rendering and visualization services.",
        icon: "bi-box"
      },
      {
        title: "Lighting Design",
        description: "Transform your space with a comprehensive lighting plan that enhances both functionality and atmosphere.",
        icon: "bi-lamp"
      },
      {
        title: "Project Management",
        description: "From concept to completion, we handle every aspect of your project to ensure seamless execution and stunning results.",
        icon: "bi-tools"
      },
      {
        title: "Material & Finish Selection",
        description: "Choose the perfect materials and finishes for your space to create the desired look and durability.",
        icon: "bi-grid-3x3"
      },
      {
        title: "Modular Kitchen & Wardrobe Design",
        description: "Custom design solutions for kitchens and wardrobes that maximize space and efficiency.",
        icon: "bi-house-door"
      },
      {
        title: "Renovation & Remodeling",
        description: "Transform existing spaces with innovative design solutions that address both aesthetic and functional needs.",
        icon: "bi-hammer"
      }
    ];

    for (const service of defaultServices) {
      await this.createService(service);
    }
  }

  private async initDefaultProjects() {
    const defaultProjects: InsertProject[] = [
      {
        title: "Minimalist Apartment",
        description: "Contemporary design with clean lines and thoughtful details.",
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "residential,modern",
        details: "A complete renovation of a 1,200 sq ft apartment in the heart of the city. The client wanted a minimalist aesthetic with clean lines, neutral colors, and strategic pops of royal purple as an accent.",
        scope: ["Space planning", "Custom furniture design", "Material selection", "Lighting design", "Artwork curation"],
        location: "Downtown Metropolitan",
        size: "1,200 sq ft",
        duration: "3 months",
        style: "Modern Minimalist",
        year: "2023"
      },
      {
        title: "Heritage Residence",
        description: "Classic design elements with modern functionality and comfort.",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "residential,traditional",
        details: "Renovation of a heritage home preserving original architectural details while incorporating modern conveniences and custom furniture pieces.",
        scope: ["Historic preservation", "Custom millwork", "Furniture selection", "Textile selection", "Lighting design"],
        location: "Historic District",
        size: "2,800 sq ft",
        duration: "6 months",
        style: "Traditional with Modern Elements",
        year: "2022"
      },
      {
        title: "Tech Startup Office",
        description: "Dynamic workspace designed for collaboration and creativity.",
        image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "commercial,modern",
        details: "Modern office space for a growing tech company featuring open collaborative areas, private meeting spaces, and a vibrant color scheme reflecting the company's brand.",
        scope: ["Space planning", "Custom workstations", "Meeting rooms", "Breakout areas", "Acoustic solutions"],
        location: "Tech District",
        size: "3,500 sq ft",
        duration: "2 months",
        style: "Contemporary Corporate",
        year: "2023"
      },
      {
        title: "Luxury Penthouse",
        description: "High-end finishes and custom details for elevated living.",
        image: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "residential,modern",
        details: "Complete interior design for a penthouse apartment featuring custom furnishings, high-end materials, and smart home integration.",
        scope: ["Space planning", "Custom furniture", "Material selection", "Lighting design", "Art curation", "Smart home integration"],
        location: "City Center",
        size: "3,200 sq ft",
        duration: "8 months",
        style: "Luxury Modern",
        year: "2022"
      },
      {
        title: "Boutique Restaurant",
        description: "Intimate dining space with attention to ambiance and experience.",
        image: "https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "commercial,traditional",
        details: "Restaurant interior designed to create an intimate, upscale dining experience with custom seating, dramatic lighting, and a carefully curated color palette.",
        scope: ["Space planning", "Custom banquettes", "Bar design", "Lighting design", "Custom millwork"],
        location: "Arts District",
        size: "1,800 sq ft",
        duration: "4 months",
        style: "Elegant Bistro",
        year: "2023"
      },
      {
        title: "Contemporary Kitchen",
        description: "Functional design with premium materials and smart features.",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "residential,modern",
        details: "Kitchen renovation featuring custom cabinetry, high-end appliances, and a functional layout for a family that loves to entertain.",
        scope: ["Space planning", "Custom cabinetry", "Appliance selection", "Material selection", "Lighting design"],
        location: "Suburban Residence",
        size: "400 sq ft",
        duration: "6 weeks",
        style: "Contemporary",
        year: "2023"
      }
    ];

    for (const project of defaultProjects) {
      await this.createProject(project);
    }
  }
}

// Memory Storage implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private services: Service[] = [];
  private projects: Project[] = [];
  private contacts: Contact[] = [];
  private userId = 1;
  private serviceId = 1;
  private projectId = 1;
  private contactId = 1;

  // User methods
  async getAllUsers(): Promise<User[]> {
    return [...this.users];
  }
  
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser: User = {
      ...insertUser,
      id: this.userId++
    };
    this.users.push(newUser);
    return newUser;
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return [...this.services];
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.find(service => service.id === id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const newService: Service = {
      ...insertService,
      id: this.serviceId++
    };
    this.services.push(newService);
    return newService;
  }
  
  async updateService(id: number, serviceData: Partial<InsertService>): Promise<Service | undefined> {
    const index = this.services.findIndex(service => service.id === id);
    if (index === -1) return undefined;
    
    this.services[index] = {
      ...this.services[index],
      ...serviceData
    };
    
    return this.services[index];
  }
  
  async deleteService(id: number): Promise<boolean> {
    const initialLength = this.services.length;
    this.services = this.services.filter(service => service.id !== id);
    return initialLength > this.services.length;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return [...this.projects];
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.find(project => project.id === id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return this.projects.filter(project => 
      project.categories.includes(category)
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const newProject: Project = {
      ...insertProject,
      id: this.projectId++
    };
    this.projects.push(newProject);
    return newProject;
  }
  
  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const index = this.projects.findIndex(project => project.id === id);
    if (index === -1) return undefined;
    
    this.projects[index] = {
      ...this.projects[index],
      ...projectData
    };
    
    return this.projects[index];
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const initialLength = this.projects.length;
    this.projects = this.projects.filter(project => project.id !== id);
    return initialLength > this.projects.length;
  }

  // Contact methods
  async getAllContacts(): Promise<Contact[]> {
    return [...this.contacts];
  }
  
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const newContact: Contact = {
      ...insertContact,
      id: this.contactId++,
      phone: insertContact.phone || null
    };
    this.contacts.push(newContact);
    return newContact;
  }

  // Initialize default data
  async initializeDefaultData() {
    // Check if we already have services in the database
    const existingServices = await this.getAllServices();
    if (existingServices.length === 0) {
      console.log("Initializing default services in memory storage...");
      await this.initDefaultServices();
    }

    // Check if we already have projects in the database
    const existingProjects = await this.getAllProjects();
    if (existingProjects.length === 0) {
      console.log("Initializing default projects in memory storage...");
      await this.initDefaultProjects();
    }
  }

  private async initDefaultServices() {
    const defaultServices: InsertService[] = [
      {
        title: "Space Planning",
        description: "Optimize your living or working environment with thoughtful space planning that maximizes functionality and flow.",
        icon: "bi-layout-text-window"
      },
      {
        title: "Color Consultation",
        description: "Select the perfect palette to create the desired ambiance and psychological effect in your space.",
        icon: "bi-palette"
      },
      {
        title: "Furniture & Decor Selection",
        description: "Source and select furniture and decor pieces that reflect your style while meeting your practical needs.",
        icon: "bi-shop"
      },
      {
        title: "3D Rendering & Visualization",
        description: "Experience your space before it's built with photorealistic 3D rendering and visualization services.",
        icon: "bi-box"
      },
      {
        title: "Lighting Design",
        description: "Transform your space with a comprehensive lighting plan that enhances both functionality and atmosphere.",
        icon: "bi-lamp"
      },
      {
        title: "Project Management",
        description: "From concept to completion, we handle every aspect of your project to ensure seamless execution and stunning results.",
        icon: "bi-tools"
      },
      {
        title: "Material & Finish Selection",
        description: "Choose the perfect materials and finishes for your space to create the desired look and durability.",
        icon: "bi-grid-3x3"
      }
    ];

    for (const service of defaultServices) {
      await this.createService(service);
    }
  }

  private async initDefaultProjects() {
    const defaultProjects: InsertProject[] = [
      {
        title: "Minimalist Apartment",
        description: "Contemporary design with clean lines and thoughtful details.",
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "residential,modern",
        details: "A complete renovation of a 1,200 sq ft apartment in the heart of the city. The client wanted a minimalist aesthetic with clean lines, neutral colors, and strategic pops of royal purple as an accent.",
        scope: ["Space planning", "Custom furniture design", "Material selection", "Lighting design", "Artwork curation"],
        location: "Downtown Metropolitan",
        size: "1,200 sq ft",
        duration: "3 months",
        style: "Modern Minimalist",
        year: "2023"
      },
      {
        title: "Heritage Residence",
        description: "Classic design elements with modern functionality and comfort.",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "residential,traditional",
        details: "Renovation of a heritage home preserving original architectural details while incorporating modern conveniences and custom furniture pieces.",
        scope: ["Historic preservation", "Custom millwork", "Furniture selection", "Textile selection", "Lighting design"],
        location: "Historic District",
        size: "2,800 sq ft",
        duration: "6 months",
        style: "Traditional with Modern Elements",
        year: "2022"
      },
      {
        title: "Tech Startup Office",
        description: "Dynamic workspace designed for collaboration and creativity.",
        image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "commercial,modern",
        details: "Modern office space for a growing tech company featuring open collaborative areas, private meeting spaces, and a vibrant color scheme reflecting the company's brand.",
        scope: ["Space planning", "Custom workstations", "Meeting rooms", "Breakout areas", "Acoustic solutions"],
        location: "Tech District",
        size: "3,500 sq ft",
        duration: "2 months",
        style: "Contemporary Corporate",
        year: "2023"
      },
      {
        title: "Luxury Penthouse",
        description: "High-end finishes and custom details for elevated living.",
        image: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        categories: "residential,modern",
        details: "Complete interior design for a penthouse apartment featuring custom furnishings, high-end materials, and smart home integration.",
        scope: ["Space planning", "Custom furniture", "Material selection", "Lighting design", "Art curation", "Smart home integration"],
        location: "City Center",
        size: "3,200 sq ft",
        duration: "8 months",
        style: "Luxury Modern",
        year: "2022"
      }
    ];

    for (const project of defaultProjects) {
      await this.createProject(project);
    }
  }
}

// Choose the right storage implementation based on database availability
export const storage = new DatabaseStorage();
