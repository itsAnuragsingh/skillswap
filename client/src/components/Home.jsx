import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sun, Moon, LogIn, Book, Users, Video } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';


export default function HomePage() {
  const [theme, setTheme] = useState('light')
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // Add this useEffect to sync theme with localStorage and body class
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Add this function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme}`}>
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold">SkillSwap</span>
            </div>
            <div className="flex items-center space-x-4">
              {isSignedIn && (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link to="/community">
                    <Button variant="ghost">Community</Button>
                  </Link>
                </>
              )}
              <Button variant="outline" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal" afterSignInUrl="/">
                  <Button>
                    <LogIn className="mr-2 h-4 w-4" /> Get Started
                    
                  </Button>
                </SignInButton>

              )}
            </div>
          </div>
        </div>
      </nav>
      

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Welcome  {isSignedIn ? user.fullName : 'to SkillSwap'}
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-muted-foreground sm:text-2xl md:mt-5 md:max-w-3xl">
              Share your skills, learn from others, and grow together in our collaborative community.
            </p>
            <div className="mt-10 flex justify-center">
            { isSignedIn ? <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>:
             <SignInButton mode='modal'>
              <Button size="lg" className="mr-4">Get Started</Button>
              </SignInButton>  }
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12">Why Choose SkillSwap?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-5 w-5" /> Diverse Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access a wide range of skills from programming to graphic design, and everything in between.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" /> Community-Driven
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect with like-minded individuals, collaborate on projects, and grow your network.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5" /> Interactive Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Engage in real-time video sessions, chat discussions, and shared note-taking for enhanced learning.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {!isSignedIn ?<Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to start your skill-swapping journey?</CardTitle>
              <CardDescription className="text-primary-foreground/80">Join our community today and unlock your potential!</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <Label htmlFor="email" className="sr-only">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" className="bg-primary-foreground text-primary" />
                </div>
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Sign Up
                </Button>
              </form>
            </CardContent>
          </Card> : <Link to="/community"><Button>Community</Button></Link>}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">SkillSwap</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            © 2024 SkillSwap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}