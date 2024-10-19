import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Video, FileText, Send, Phone, Briefcase, Share2, Plus, X, MessageCircle, ThumbsUp, Link as LinkIcon, PlusCircle, Users, Trash2, Github } from 'lucide-react'
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: 'Alice Johnson', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 2, name: 'Bob Smith', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 3, name: 'Charlie Brown', avatar: '/placeholder.svg?height=32&width=32' },
]

const mockProjects = [
  { 
    id: 1, 
    name: "AI Research Paper", 
    description: "Collaborative research on AI ethics", 
    image: "/placeholder.svg?height=100&width=200",
    techStack: ["Python", "TensorFlow", "NLP"],
    contributors: ["Alice", "Bob", "Charlie"],
    availableSpots: 2,
    joinRequests: [{ id: 101, name: "David" }, { id: 102, name: "Eve" }],
    author: "Alice",
    githubLink: "https://github.com/example/ai-research-paper"
  },
  { 
    id: 2, 
    name: "Mobile App Development", 
    description: "Building a study planner app", 
    image: "/placeholder.svg?height=100&width=200",
    techStack: ["React Native", "Firebase", "Redux"],
    contributors: ["David", "Eve"],
    availableSpots: 3,
    joinRequests: [{ id: 103, name: "Frank" }],
    author: "David",
    githubLink: "https://github.com/example/study-planner-app"
  },
]

export default function Community() {
  const [activeTab, setActiveTab] = useState('video')
  const [notes, setNotes] = useState([
    { id: 1, title: 'Project Brainstorming', content: 'Lets gather ideas for our new app...', author: 'Alice Johnson', timestamp: '2023-10-17T14:30:00Z' },
    { id: 2, title: 'Meeting Notes', content: 'Discussed timeline and resource allocation...', author: 'Bob Smith', timestamp: '2023-10-18T09:00:00Z' },
  ])
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [isInCall, setIsInCall] = useState(false)
  const [projects, setProjects] = useState(mockProjects)
  const [newProject, setNewProject] = useState({ name: '', description: '', techStack: '', image: '', githubLink: '' })
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [resources, setResources] = useState([
    { id: 1, title: 'UI Design Guidelines', type: 'PDF', url: '#', sharedBy: 'Alice Johnson', timestamp: '2023-10-16T11:00:00Z' },
    { id: 2, title: 'Project Management Tool', type: 'Link', url: 'https://example.com', sharedBy: 'Bob Smith', timestamp: '2023-10-17T13:30:00Z' },
  ])
  const [newResource, setNewResource] = useState({ title: '', type: '', url: '' })
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "How to optimize React performance?",
      author: "Alice Johnson",
      timestamp: '2023-10-18T08:00:00Z',
      content: "I'm working on a large React application and noticed some performance issues. Any tips on how to optimize it?",
      replies: [
        { id: 1, userId: 2, content: "Consider using React.memo for components that don't need frequent updates.", timestamp: '2023-10-18T08:30:00Z' },
        { id: 2, userId: 3, content: "Implementing virtualization for long lists can also help a lot!", timestamp: '2023-10-18T09:15:00Z' },
      ],
      likes: 5,
      likedBy: ["User1", "User2", "User3", "User4", "User5"],
      tags: ["React", "Performance"]
    },
    {
      id: 2,
      title: "Best practices for state management in React",
      author: "Bob Smith",
      timestamp: '2023-10-17T14:00:00Z',
      content: "I'm starting a new React project and wondering about the best approach for state management. Should I use Redux, Context API, or something else?",
      replies: [
        { id: 3, userId: 1, content: "It depends on the size of your project. For smaller apps, Context API might be sufficient.", timestamp: '2023-10-17T14:30:00Z' },
      ],
      likes: 3,
      likedBy: ["User1", "User2", "User3"],
      tags: ["React", "State Management"]
    }
  ])
  const [newThread, setNewThread] = useState({ title: '', content: '', tags: [] })
  const [newReply, setNewReply] = useState({})
  const [currentUser] = useState("Alice") // Simulating a logged-in user

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      const note = {
        id: notes.length + 1,
        title: newNote.title,
        content: newNote.content,
        author: 'Alice Johnson', // Assuming current user is Alice
        timestamp: new Date().toISOString(),
      }
      setNotes([...notes, note])
      setNewNote({ title: '', content: '' })
    }
  }

  const handleStartCall = () => {
    setIsInCall(true)
  }

  const handleEndCall = () => {
    setIsInCall(false)
  }

  const handleCreateProject = () => {
    const techStackArray = newProject.techStack.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
    const createdProject = { 
      ...newProject, 
      id: projects.length + 1, 
      contributors: [currentUser],
      availableSpots: 5,
      joinRequests: [],
      techStack: techStackArray,
      author: currentUser
    }
    setProjects([...projects, createdProject])
    setNewProject({ name: '', description: '', techStack: '', image: '', githubLink: '' })
    setShowNewProjectDialog(false)
  }

  const handleJoinRequest = (projectId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, joinRequests: [...p.joinRequests, { id: Date.now(), name: currentUser }] } : p
    ))
  }

  const handleWithdrawRequest = (projectId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, joinRequests: p.joinRequests.filter(req => req.name !== currentUser) } : p
    ))
  }

  const handleAcceptRequest = (projectId, userId) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const acceptedUser = p.joinRequests.find(req => req.id === userId)
        return {
          ...p,
          contributors: [...p.contributors, acceptedUser?.name],
          joinRequests: p.joinRequests.filter(req => req.id !== userId),
          availableSpots: p.availableSpots - 1
        }
      }
      return p
    }))
  }

  const handleRemoveRequest = (projectId, userId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, joinRequests: p.joinRequests.filter(req => req.id !== userId) } : p
    ))
  }

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId))
  }

  const handleAddResource = () => {
    if (newResource.title && newResource.type && newResource.url) {
      const resource = {
        id: resources.length + 1,
        title: newResource.title,
        type: newResource.type,
        url: newResource.url,
        sharedBy: 'Alice Johnson', // Assuming current user is Alice
        timestamp: new Date().toISOString(),
      }
      setResources([...resources, resource])
      setNewResource({ title: '', type: '', url: '' })
    }
  }

  const handleCreateThread = () => {
    const createdThread = { 
      ...newThread, 
      id: threads.length + 1, 
      author: currentUser, 
      timestamp: new Date().toISOString(),
      replies: [], 
      likes: 0, 
      likedBy: [] 
    }
    setThreads([createdThread, ...threads])
    setNewThread({ title: '', content: '', tags: [] })
  }

  const handleCreateReply = (threadId) => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          replies: [...thread.replies, { id: thread.replies.length + 1, userId: 1, content: newReply[threadId], timestamp: new Date().toISOString() }]
        }
      }
      return thread
    })
    setThreads(updatedThreads)
    setNewReply({ ...newReply, [threadId]: '' })
  }

  const handleLike = (threadId) => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        if (thread.likedBy.includes(currentUser)) {
          return { ...thread, likes: thread.likes - 1, likedBy: thread.likedBy.filter(user => user !== currentUser) }
        } else {
          return { ...thread, likes: thread.likes + 1, likedBy: [...thread.likedBy, currentUser] }
        }
      }
      return thread
    })
    setThreads(updatedThreads)
  }

  const addLink = (threadId) => {
    const link = prompt("Enter the URL:")
    if (link) {
      setNewReply({ ...newReply, [threadId]: `${newReply[threadId] || ''} [Link](${link}) ` })
    }
  }

  const userProjects = projects.filter(p => p.author === currentUser)
  const otherProjects = projects.filter(p => p.author !== currentUser)

  return (
    <>
    <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold">Community</span>
            </div>
            <div className="flex items-center space-x-4">
                  <Link to="/">
                    <Button>Home</Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
            </div>
          </div>
        </div>
      </nav>

    <div className="container mx-auto p-4">
            
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="projects"><Briefcase className="mr-2 h-4 w-4" /> Projects</TabsTrigger>
          <TabsTrigger value="resources"><Share2 className="mr-2 h-4 w-4" /> Resources</TabsTrigger>
          <TabsTrigger value="forum"><MessageCircle className="mr-2 h-4 w-4" /> Forum</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <div className="flex">
            <Tabs defaultValue="your-projects" className="flex-1">
              <TabsList className="flex flex-col space-y-2 w-48 h-auto">
                <TabsTrigger value="your-projects" className="w-full justify-start">Your Projects</TabsTrigger>
                <TabsTrigger value="join-projects" className="w-full justify-start">Join Other Projects</TabsTrigger>
              </TabsList>
              
              <div className="ml-8 flex-1">
                <TabsContent value="your-projects">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Your Projects</h2>
                    <Button onClick={() => setShowNewProjectDialog(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Create New Project
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userProjects.map((project) => (
                      <Card key={project.id} className="flex flex-col">
                        <CardHeader>
                          <img src={project.image} alt={project.name} className="w-full h-32 object-cover rounded-t-lg mb-4" />
                          <CardTitle>{project.name}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech, index) => (
                              <Badge key={index} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="h-4 w-4" />
                            <span>{project.contributors.join(', ')}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Available spots: {project.availableSpots}
                          </div>
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2">Join Requests:</h4>
                            {project.joinRequests.map((request) => (
                              <div key={request.id} className="flex items-center justify-between mb-2">
                                <span>{request.name}</span>
                                <div>
                                  <Button onClick={() => handleAcceptRequest(project.id, request.id)} variant="outline" size="sm" className="mr-2">
                                    Accept
                                  </Button>
                                  <Button onClick={() => handleRemoveRequest(project.id, request.id)} variant="outline" size="sm">
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="mt-auto flex justify-between">
                          <Button onClick={() => handleDeleteProject(project.id)} variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                          </Button>
                          <Button variant="outline" onClick={() => window.open(project.githubLink, '_blank')}>
                            <Github className="mr-2 h-4 w-4" /> View on GitHub
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="join-projects">
                  <h2 className="text-xl font-semibold mb-6">Join Other Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherProjects.map((project) => (
                      <Card key={project.id} className="flex flex-col">
                        <CardHeader>
                          <img src={project.image} alt={project.name} className="w-full h-32 object-cover rounded-t-lg mb-4" />
                          <CardTitle>{project.name}</CardTitle>
                          <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech, index) => (
                              <Badge key={index} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="h-4 w-4" />
                            <span>{project.contributors.join(', ')}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Available spots: {project.availableSpots}
                          </div>
                        </CardContent>
                        <CardFooter className="mt-auto flex justify-between">
                          {project.joinRequests.some(req => req.name === currentUser) ? (
                            <Button onClick={() => handleWithdrawRequest(project.id)} variant="secondary" className="w-full">
                              Withdraw Request
                            </Button>
                          ) : (
                            <Button onClick={() => handleJoinRequest(project.id)} className="w-full">
                              Join Project ({project.joinRequests.length} requests)
                            </Button>
                          )}
                          <Button variant="outline" onClick={() => window.open(project.githubLink, '_blank')}>
                            <Github className="mr-2 h-4 w-4" /> View on GitHub
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Fill in the details to create a new project.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="techStack" className="text-right">Tech Stack</Label>
                  <Input
                    id="techStack"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                    className="col-span-3"
                    placeholder="Enter technologies separated by commas"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">Image URL</Label>
                  <Input
                    id="image"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="col-span-3"
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="githubLink" className="text-right">GitHub Link</Label>
                  <Input
                    id="githubLink"
                    value={newProject.githubLink}
                    onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                    className="col-span-3"
                    placeholder="Enter GitHub repository URL"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateProject}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Shared Resources</CardTitle>
              <CardDescription>Share and access community resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Resource Title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="mb-2"
                />
                <Input
                  placeholder="Resource Type (e.g., PDF, Link)"
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  className="mb-2"
                />
                <Input
                  placeholder="Resource URL"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  className="mb-2"
                />
                <Button onClick={handleAddResource}>Add Resource</Button>
              </div>
              <ScrollArea className="h-[300px]">
                {resources.map((resource) => (
                  <Card key={resource.id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>
                        Shared by {resource.sharedBy} on {new Date(resource.timestamp).toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge>{resource.type}</Badge>
                        <Button variant="link" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">Open Resource</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forum">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Forum</CardTitle>
              <CardDescription>Discuss problems and share ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Start a New Discussion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="thread-title">Title</Label>
                      <Input
                        id="thread-title"
                        value={newThread.title}
                        onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                        placeholder="Enter the topic of discussion"
                      />
                    </div>
                    <div>
                      <Label htmlFor="thread-body">Body</Label>
                      <Textarea
                        id="thread-body"
                        value={newThread.content}
                        onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                        placeholder="Provide more details about your topic"
                      />
                    </div>
                    <div>
                      <Label htmlFor="thread-tags">Tags</Label>
                      <Input
                        id="thread-tags"
                        value={newThread.tags.join(', ')}
                        onChange={(e) => setNewThread({ ...newThread, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                        placeholder="Enter tags separated by commas"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCreateThread}>Post Thread</Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                {threads.map((thread) => (
                  <Card key={thread.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{thread.title}</CardTitle>
                          <CardDescription>Posted by {thread.author}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          {thread.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{thread.content}</p>
                      <div className="mt-4 space-y-4">
                        {thread.replies.map((reply) => (
                          <div key={reply.id} className="bg-muted p-3 rounded">
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: reply.content.replace(/\[Link\]$$(.*?)$$/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Link</a>') }}></p>
                            <p className="text-xs text-muted-foreground mt-1">Reply by {mockUsers.find(u => u.id === reply.userId)?.name}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start space-y-4">
                      <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm" onClick={() => handleLike(thread.id)}>
                          <ThumbsUp className={`mr-2 h-4 w-4 ${thread.likedBy.includes(currentUser) ? 'text-blue-500' : ''}`} /> 
                          {thread.likes} Likes
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" /> {thread.replies.length} Replies
                        </Button>
                      </div>
                      <div className="w-full">
                        <Textarea
                          value={newReply[thread.id] || ''}
                          onChange={(e) => setNewReply({ ...newReply, [thread.id]: e.target.value })}
                          placeholder="Write a reply..."
                          className="mb-2"
                        />
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => addLink(thread.id)}>
                            <LinkIcon className="mr-2 h-4 w-4" /> Add Link
                          </Button>
                          <Button onClick={() => handleCreateReply(thread.id)}>Post Reply</Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </>
  )
}