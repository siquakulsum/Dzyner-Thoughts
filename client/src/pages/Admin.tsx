import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  type InsertService,
  type Service,
  type InsertProject,
  type Project,
  type Contact,
  type User,
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [, navigate] = useLocation();
  const { logout, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State for new service
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
  });

  // State for service being edited
  const [editService, setEditService] = useState<Service | null>(null);

  // State for new project
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    categories: "",
    details: "",
    scope: "",
    location: "",
    size: "",
    duration: "",
    style: "",
    year: "",
  });

  // State for project being edited
  const [editProject, setEditProject] = useState<Project | null>(null);

  // Fetch contacts
  const contactsQuery = useQuery({
    queryKey: ["/api/admin/contacts"],
  });

  // Fetch services
  const servicesQuery = useQuery({
    queryKey: ["/api/admin/services"],
  });

  // Fetch projects
  const projectsQuery = useQuery({
    queryKey: ["/api/admin/projects"],
  });

  // Fetch users
  const usersQuery = useQuery({
    queryKey: ["/api/admin/users"],
  });

  // Create service mutation
  const createServiceMutation = useMutation({
    mutationFn: async (data: Omit<InsertService, "id">) => {
      return await apiRequest("/api/admin/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({
        title: "Success",
        description: "Service created successfully",
      });
      setNewService({ title: "", description: "", icon: "" });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create service",
      });
    },
  });

  // Update service mutation
  const updateServiceMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<InsertService>;
    }) => {
      return await apiRequest(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      setEditService(null);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update service",
      });
    },
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete service",
      });
    },
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (data: Omit<InsertProject, "id"> & { scope: string[] }) => {
      return await apiRequest("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setNewProject({
        title: "",
        description: "",
        image: "",
        categories: "",
        details: "",
        scope: "",
        location: "",
        size: "",
        duration: "",
        style: "",
        year: "",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create project",
      });
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Omit<InsertProject, "id">> & { scope: string[] } }) => {
      return await apiRequest(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      setEditProject(null);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project",
      });
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project",
      });
    },
  });

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const contacts = (contactsQuery.data as Contact[]) || [];
  const services = (servicesQuery.data as Service[]) || [];
  const projects = (projectsQuery.data as Project[]) || [];
  const users = (usersQuery.data as User[]) || [];

  return (
    <div className="container mx-auto pt-24 pb-10">
      <Helmet>
        <title>Admin Dashboard | Elegant Interiors</title>
        <meta
          name="description"
          content="Admin dashboard for Elegant Interiors"
        />
      </Helmet>


      <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-2 sm:gap-4 px-2">
        <span className="text-sm text-center">
          Logged in as: <strong>{user?.username}</strong>
        </span>
        <Button variant="outline" onClick={handleLogout} className="mt-1 sm:mt-0">
          Logout
        </Button>
      </div>
      <Separator className="mb-6" />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Contacts Tab */}
        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              {contactsQuery.isLoading ? (
                <div className="text-center py-4">Loading contacts...</div>
              ) : contactsQuery.isError ? (
                <div className="text-center py-4 text-red-500">
                  Error loading contacts
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-4">No contacts found</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.id}</TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone || "N/A"}</TableCell>
                        <TableCell>{contact.service}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {contact.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Services</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" /> Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="new-service-title">Title</Label>
                      <Input
                        id="new-service-title"
                        placeholder="Enter service title"
                        value={newService.title}
                        onChange={(e) => {
                          setNewService({
                            ...newService,
                            title: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-service-description">
                        Description
                      </Label>
                      <Textarea
                        id="new-service-description"
                        placeholder="Enter service description"
                        value={newService.description}
                        onChange={(e) => {
                          setNewService({
                            ...newService,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-service-icon">Icon</Label>
                      <Input
                        id="new-service-icon"
                        placeholder="Enter icon class (e.g., bi-house-door)"
                        value={newService.icon}
                        onChange={(e) => {
                          setNewService({
                            ...newService,
                            icon: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      type="button"
                      onClick={() => {
                        if (
                          !newService.title ||
                          !newService.description ||
                          !newService.icon
                        ) {
                          toast({
                            variant: "destructive",
                            title: "Validation Error",
                            description: "All fields are required",
                          });
                          return;
                        }
                        createServiceMutation.mutate(newService);
                      }}
                      disabled={createServiceMutation.isPending}
                    >
                      {createServiceMutation.isPending
                        ? "Saving..."
                        : "Save Service"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {servicesQuery.isLoading ? (
                <div className="text-center py-4">Loading services...</div>
              ) : servicesQuery.isError ? (
                <div className="text-center py-4 text-red-500">
                  Error loading services
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-4">No services found</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.id}</TableCell>
                        <TableCell>{service.title}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {service.description}
                        </TableCell>
                        <TableCell>{service.icon}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Service</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor={`edit-title-${service.id}`}>
                                      Title
                                    </Label>
                                    <Input
                                      id={`edit-title-${service.id}`}
                                      value={
                                        editService?.id === service.id
                                          ? editService.title
                                          : service.title
                                      }
                                      onChange={(e) => {
                                        if (editService?.id === service.id) {
                                          setEditService({
                                            ...editService,
                                            title: e.target.value,
                                          });
                                        } else {
                                          setEditService({
                                            ...service,
                                            title: e.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label
                                      htmlFor={`edit-description-${service.id}`}
                                    >
                                      Description
                                    </Label>
                                    <Textarea
                                      id={`edit-description-${service.id}`}
                                      value={
                                        editService?.id === service.id
                                          ? editService.description
                                          : service.description
                                      }
                                      onChange={(e) => {
                                        if (editService?.id === service.id) {
                                          setEditService({
                                            ...editService,
                                            description: e.target.value,
                                          });
                                        } else {
                                          setEditService({
                                            ...service,
                                            description: e.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`edit-icon-${service.id}`}>
                                      Icon
                                    </Label>
                                    <Input
                                      id={`edit-icon-${service.id}`}
                                      value={
                                        editService?.id === service.id
                                          ? editService.icon
                                          : service.icon
                                      }
                                      onChange={(e) => {
                                        if (editService?.id === service.id) {
                                          setEditService({
                                            ...editService,
                                            icon: e.target.value,
                                          });
                                        } else {
                                          setEditService({
                                            ...service,
                                            icon: e.target.value,
                                          });
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      if (!editService) return;

                                      if (
                                        !editService.title ||
                                        !editService.description ||
                                        !editService.icon
                                      ) {
                                        toast({
                                          variant: "destructive",
                                          title: "Validation Error",
                                          description:
                                            "All fields are required",
                                        });
                                        return;
                                      }

                                      updateServiceMutation.mutate({
                                        id: service.id,
                                        data: {
                                          title: editService.title,
                                          description: editService.description,
                                          icon: editService.icon,
                                        },
                                      });
                                    }}
                                    disabled={updateServiceMutation.isPending}
                                  >
                                    {updateServiceMutation.isPending
                                      ? "Saving..."
                                      : "Save Changes"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Service</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>
                                    Are you sure you want to delete this
                                    service? This action cannot be undone.
                                  </p>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    variant="destructive"
                                    onClick={() => {
                                      deleteServiceMutation.mutate(service.id);
                                    }}
                                    disabled={deleteServiceMutation.isPending}
                                  >
                                    {deleteServiceMutation.isPending
                                      ? "Deleting..."
                                      : "Delete"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" /> Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-title">Title</Label>
                        <Input
                          id="new-project-title"
                          placeholder="Enter project title"
                          value={newProject.title}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-image">Image URL</Label>
                        <Input
                          id="new-project-image"
                          placeholder="Enter image URL"
                          value={newProject.image}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              image: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-project-description">
                        Description
                      </Label>
                      <Textarea
                        id="new-project-description"
                        placeholder="Enter project description"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-categories">
                          Categories (comma separated)
                        </Label>
                        <Input
                          id="new-project-categories"
                          placeholder="e.g., residential,modern"
                          value={newProject.categories}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              categories: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-location">Location</Label>
                        <Input
                          id="new-project-location"
                          placeholder="Enter project location"
                          value={newProject.location}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-size">Size</Label>
                        <Input
                          id="new-project-size"
                          placeholder="e.g., 1,200 sq ft"
                          value={newProject.size}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              size: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-duration">Duration</Label>
                        <Input
                          id="new-project-duration"
                          placeholder="e.g., 3 months"
                          value={newProject.duration}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              duration: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-year">Year</Label>
                        <Input
                          id="new-project-year"
                          placeholder="e.g., 2023"
                          value={newProject.year}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              year: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-style">Style</Label>
                        <Input
                          id="new-project-style"
                          placeholder="e.g., Modern Minimalist"
                          value={newProject.style}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              style: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-project-details">Details</Label>
                        <Textarea
                          id="new-project-details"
                          placeholder="Enter project details"
                          value={newProject.details}
                          onChange={(e) => setNewProject({ ...newProject, details: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-project-scope">
                        Scope (comma separated)
                      </Label>
                      <Input
                        id="new-project-scope"
                        placeholder="e.g., Space planning, Custom furniture design"
                        value={newProject.scope}
                        onChange={(e) => setNewProject({ ...newProject, scope: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      type="button"
                      onClick={() => {
                        // Validate required fields
                        if (!newProject.title || !newProject.description || !newProject.image) {
                          toast({
                            variant: "destructive",
                            title: "Validation Error",
                            description: "Title, description and image are required"
                          });
                          return;
                        }

                        // Prepare the data with proper scope formatting
                        const projectData = {
                          ...newProject,
                          scope: newProject.scope ? newProject.scope.split(',').map(item => item.trim()) : [],
                        };

                        createProjectMutation.mutate(projectData);
                      }}
                      disabled={createProjectMutation.isPending}
                    >
                      {createProjectMutation.isPending ? "Saving..." : "Save Project"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {projectsQuery.isLoading ? (
                <div className="text-center py-4">Loading projects...</div>
              ) : projectsQuery.isError ? (
                <div className="text-center py-4 text-red-500">
                  Error loading projects
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-4">No projects found</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.id}</TableCell>
                        <TableCell>{project.title}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {project.description}
                        </TableCell>
                        <TableCell>{project.categories}</TableCell>
                        <TableCell>{project.location}</TableCell>
                        <TableCell>{project.year}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Project</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-title-${project.id}`}
                                      >
                                        Title
                                      </Label>
                                      <Input
                                        id={`edit-title-${project.id}`}
                                        defaultValue={project.title}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-image-${project.id}`}
                                      >
                                        Image URL
                                      </Label>
                                      <Input
                                        id={`edit-image-${project.id}`}
                                        defaultValue={project.image}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label
                                      htmlFor={`edit-description-${project.id}`}
                                    >
                                      Description
                                    </Label>
                                    <Textarea
                                      id={`edit-description-${project.id}`}
                                      defaultValue={project.description}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-categories-${project.id}`}
                                      >
                                        Categories
                                      </Label>
                                      <Input
                                        id={`edit-categories-${project.id}`}
                                        defaultValue={project.categories}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-location-${project.id}`}
                                      >
                                        Location
                                      </Label>
                                      <Input
                                        id={`edit-location-${project.id}`}
                                        defaultValue={project.location}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-size-${project.id}`}
                                      >
                                        Size
                                      </Label>
                                      <Input
                                        id={`edit-size-${project.id}`}
                                        defaultValue={project.size}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-duration-${project.id}`}
                                      >
                                        Duration
                                      </Label>
                                      <Input
                                        id={`edit-duration-${project.id}`}
                                        defaultValue={project.duration}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-year-${project.id}`}
                                      >
                                        Year
                                      </Label>
                                      <Input
                                        id={`edit-year-${project.id}`}
                                        defaultValue={project.year}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-style-${project.id}`}
                                      >
                                        Style
                                      </Label>
                                      <Input
                                        id={`edit-style-${project.id}`}
                                        defaultValue={project.style}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label
                                        htmlFor={`edit-details-${project.id}`}
                                      >
                                        Details
                                      </Label>
                                      <Textarea
                                        id={`edit-details-${project.id}`}
                                        defaultValue={project.details}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor={`edit-scope-${project.id}`}>
                                      Scope
                                    </Label>
                                    <Input
                                      id={`edit-scope-${project.id}`}
                                      defaultValue={project.scope.join(", ")}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      if (!editProject) return;

                                      // Validate required fields
                                      if (
                                        !editProject.title ||
                                        !editProject.description ||
                                        !editProject.image
                                      ) {
                                        toast({
                                          variant: "destructive",
                                          title: "Validation Error",
                                          description:
                                            "Title, description and image are required",
                                        });
                                        return;
                                      }

                                      updateProjectMutation.mutate({
                                        id: project.id,
                                        data: {
                                          title: editProject.title,
                                          description: editProject.description,
                                          image: editProject.image,
                                          categories: editProject.categories,
                                          details: editProject.details,
                                          scope:
                                            typeof editProject.scope ===
                                              "string"
                                              ? editProject.scope
                                                .split(",")
                                                .map((item) => item.trim())
                                              : editProject.scope,
                                          location: editProject.location,
                                          size: editProject.size,
                                          duration: editProject.duration,
                                          style: editProject.style,
                                          year: editProject.year,
                                        },
                                      });
                                    }}
                                    disabled={updateProjectMutation.isPending}
                                  >
                                    {updateProjectMutation.isPending
                                      ? "Saving..."
                                      : "Save Changes"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Project</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                  <p>
                                    Are you sure you want to delete this
                                    project? This action cannot be undone.
                                  </p>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                  <Button
                                    variant="destructive"
                                    onClick={() => {
                                      deleteProjectMutation.mutate(project.id);
                                    }}
                                    disabled={deleteProjectMutation.isPending}
                                  >
                                    {deleteProjectMutation.isPending
                                      ? "Deleting..."
                                      : "Delete"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              {usersQuery.isLoading ? (
                <div className="text-center py-4">Loading users...</div>
              ) : usersQuery.isError ? (
                <div className="text-center py-4 text-red-500">
                  Error loading users
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-4">No users found</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Username</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
