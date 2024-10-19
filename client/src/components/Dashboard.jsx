
import React, { useState } from 'react'
import { Bell, Edit, Plus, Video, Home, Book, Users, DollarSign, Settings, LogOut, Trash2, Coins, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"


const menuItems = [
  { icon: Home, label: 'Dashboard' },
  { icon: Book, label: 'My Skills' },
  { icon: Users, label: 'Collaborations' },
  { icon: DollarSign, label: 'Transactions' },
  { icon: Video, label: 'Video Sessions' },
  { icon: Settings, label: 'Settings' },
]

export default function Dashboard({ initialUserData = {} }) {
  const [userData, setUserData] = useState({
    name: "Anurag Singh",
    email: "anurag@example.com",
    credits: 25,
    skills: [
      { id: 1, name: "JavaScript", category: "Programming", progress: 75 },
      { id: 2, name: "Graphic Design", category: "Design", progress: 50 },
    ],
    transactions: [
      { date: "2024-10-15", type: "Earned", amount: 5 },
      { date: "2024-10-10", type: "Spent", amount: 3 },
    ],
    collaborations: [
      { skill: "Python", user: "Jane Smith", status: "Pending" },
      { skill: "Digital Marketing", user: "Mike Johnson", status: "Approved" },
    ],
    ...initialUserData
  })

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', category: '', progress: 0 })
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)

  const handleEditProfile = (updatedData) => {
    setUserData({ ...userData, ...updatedData })
    setIsEditProfileOpen(false)
  }

  const handleAddSkill = () => {
    const newId = Math.max(...userData.skills.map(s => s.id), 0) + 1
    setUserData({ ...userData, skills: [...userData.skills, { ...newSkill, id: newId }] })
    setNewSkill({ name: '', category: '', progress: 0 })
    setIsAddSkillOpen(false)
  }

  const handleDeleteSkill = (skillId) => {
    setUserData({ ...userData, skills: userData.skills.filter(skill => skill.id !== skillId) })
  }

  const handleCollaborationAction = (index, action) => {
    const updatedCollaborations = [...userData.collaborations]
    updatedCollaborations[index].status = action === 'accept' ? 'Approved' : 'Declined'
    setUserData({ ...userData, collaborations: updatedCollaborations })
  }

  const startVideoConference = () => {
    setIsVideoCallOpen(true)
  }


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 flex items-center space-x-2">
          <Avatar className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500">
            <AvatarFallback className="text-white font-bold">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{userData.name}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
        </div>
        <nav className="flex-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start mb-4 bg-yellow-100 hover:bg-yellow-200 text-yellow-800">
            <Coins className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="font-semibold">{userData.credits} Credits</span>
          </Button>
          <a href="#" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </a>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <Button variant="outline"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
          </div>

          {/* User Profile Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userData.name} />
                  <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-gray-500">{userData.email}</p>
                </div>
                <div className="ml-auto">
                  <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                    <DialogTrigger asChild>
                      <Button><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Make changes to your profile here.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" defaultValue={userData.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">Email</Label>
                          <Input id="email" defaultValue={userData.email} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => handleEditProfile({ name: document.getElementById('name').value, email: document.getElementById('email').value })}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Overview */}
          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <CardTitle><Book className="inline-block mr-2 h-5 w-5" /> Skills Overview</CardTitle>
              <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
                <DialogTrigger asChild>
                  <Button><Plus className="mr-2 h-4 w-4" /> Add New Skill</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Skill</DialogTitle>
                    <DialogDescription>Enter details for your new skill.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="skillName" className="text-right">Skill Name</Label>
                      <Input id="skillName" value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">Category</Label>
                      <Input id="category" value={newSkill.category} onChange={(e) => setNewSkill({...newSkill, category: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="progress" className="text-right">Progress</Label>
                      <Input id="progress" type="number" value={newSkill.progress} onChange={(e) => setNewSkill({...newSkill, progress: parseInt(e.target.value)})} className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddSkill}>Add Skill</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userData.skills.map((skill) => (
                  <Card key={skill.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSkill(skill.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{skill.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <Progress value={skill.progress} className="w-full" />
                      <p className="mt-2 text-sm text-gray-600">{skill.progress}% complete</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Credit Transactions and Collaboration Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Credit Transactions */}
            <Card>
              <CardHeader>
                <CardTitle><DollarSign className="inline-block mr-2 h-5 w-5" /> Credit Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData.transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Collaboration Requests */}
            <Card>
              <CardHeader>
                <CardTitle><Users className="inline-block mr-2 h-5 w-5" /> Collaboration Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.collaborations.map((collab, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{collab.skill}</CardTitle>
                        <CardDescription>Requested by: {collab.user}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Status: {collab.status}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2">
                        {collab.status === 'Pending' && (
                          <>
                            <Button onClick={() => handleCollaborationAction(index, 'accept')}>Accept</Button>
                            <Button variant="outline" onClick={() => handleCollaborationAction(index, 'decline')}>Decline</Button>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Conference and Credits Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video Conference Integration */}
            <Card>
              <CardHeader>
                <CardTitle><Video className="inline-block mr-2 h-5 w-5" /> Video Conference</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={startVideoConference} className="w-full"><Video className="mr-2 h-4 w-4" /> Start Video  Session</Button>
              </CardContent>
            </Card>

            {/* Available Credits */}
            <Card>
              <CardHeader>
                <CardTitle><Coins className="inline-block mr-2 h-5 w-5" /> Credits Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Credits Earned</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-semibold text-green-600">
                        {userData.transactions.filter(t => t.type === 'Earned').reduce((sum, t) => sum + t.amount, 0)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Credits Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-semibold text-red-600">
                        {userData.transactions.filter(t => t.type === 'Spent').reduce((sum, t) => sum + t.amount, 0)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>

      {/* Video Call Popup */}
      {isVideoCallOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Video Call</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsVideoCallOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="aspect-video bg-gray-200 mb-4 rounded-lg flex items-center justify-center">
              <Video className="h-12 w-12 text-gray-400" />
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline"><Video className="mr-2 h-4 w-4" /> Turn on camera</Button>
              <Button variant="destructive" onClick={() => setIsVideoCallOpen(false)}>End Call</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}