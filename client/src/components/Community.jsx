import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Video, FileText, Send, Phone } from 'lucide-react'

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: 'Alice Johnson', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 2, name: 'Bob Smith', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 3, name: 'Charlie Brown', avatar: '/placeholder.svg?height=32&width=32' },
]

const mockMessages = [
  { id: 1, userId: 1, content: 'Hey everyone! Hows it going?', timestamp: '2023-10-18T10:00:00Z' },
  { id: 2, userId: 2, content: 'Hi Alice! Im doing great, how about you?', timestamp: '2023-10-18T10:05:00Z' },
  { id: 3, userId: 3, content: 'Hello! Im excited about our upcoming project!', timestamp: '2023-10-18T10:10:00Z' },
]

const mockNotes = [
  { id: 1, title: 'Project Brainstorming', content: 'Lets gather ideas for our new app...', author: 'Alice Johnson', timestamp: '2023-10-17T14:30:00Z' },
  { id: 2, title: 'Meeting Notes', content: 'Discussed timeline and resource allocation...', author: 'Bob Smith', timestamp: '2023-10-18T09:00:00Z' },
]

export default function Community() {
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [notes, setNotes] = useState(mockNotes)
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [isInCall, setIsInCall] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        userId: 1, // Assuming current user is Alice
        content: newMessage,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Community</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4" /> Chat</TabsTrigger>
          <TabsTrigger value="video"><Video className="mr-2 h-4 w-4" /> Video Call</TabsTrigger>
          <TabsTrigger value="notes"><FileText className="mr-2 h-4 w-4" /> Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Chat Room</CardTitle>
              <CardDescription>Connect with other community members</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] mb-4">
                {messages.map((message) => {
                  const user = mockUsers.find(u => u.id === message.userId)
                  return (
                    <div key={message.id} className="flex items-start mb-4">
                      <Avatar className="mr-2">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p>{message.content}</p>
                        <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  )
                })}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}><Send className="h-4 w-4" /></Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video Call</CardTitle>
              <CardDescription>Start a video call with community members</CardDescription>
            </CardHeader>
            <CardContent>
              {isInCall ? (
                <div className="aspect-video bg-gray-200 mb-4 rounded-lg flex items-center justify-center">
                  <Video className="h-12 w-12 text-gray-400" />
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="mb-4">Click the button below to start a video call</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              {isInCall ? (
                <Button variant="destructive" onClick={handleEndCall}>End Call</Button>
              ) : (
                <Button onClick={handleStartCall}><Phone className="mr-2 h-4 w-4" /> Start Call</Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Shared Notes</CardTitle>
              <CardDescription>Collaborate on ideas and projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Note Title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Note Content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="mb-2"
                />
                <Button onClick={handleAddNote}>Add Note</Button>
              </div>
              <ScrollArea className="h-[300px]">
                {notes.map((note) => (
                  <Card key={note.id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{note.title}</CardTitle>
                      <CardDescription>By {note.author} on {new Date(note.timestamp).toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}