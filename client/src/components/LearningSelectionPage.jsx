import React, { useState } from 'react';
import { Search, ArrowLeft, Code, Smartphone, Brain, Database, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SkillPage = ({ skill, onBack }) => (
  <div className="p-4">
    <button onClick={onBack} className="mb-4 flex items-center text-blue-500 hover:underline">
      <ArrowLeft size={20} className="mr-2" />
      Back to Skills
    </button>
    <h1 className="text-2xl font-bold mb-4">{skill}</h1>
    <p>This is the page for {skill}. Add more content here as needed.</p>
  </div>
);

const SkillCategory = ({ title, icon: Icon, description, selected, onClick }) => (
  <div 
    className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${
      selected ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center mb-3">
      <Icon className="text-blue-500 mr-3" size={24} />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    {selected && (
      <div className="flex items-center text-blue-500">
        <span className="mr-2">Get Started</span>
        <ChevronRight size={20} />
      </div>
    )}
  </div>
);

const DifficultyLevelButton = ({ level, onClick }) => (
  <button
    onClick={onClick}
    className="w-full py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50"
    style={{
      backgroundColor: level === 'Beginner' ? '#4CAF50' : level === 'Intermediate' ? '#FFA500' : '#FF4500',
      color: 'white',
    }}
  >
    {level}
  </button>
);

const LevelContent = ({ level, skill }) => (
  <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-2xl font-bold mb-4">{level} {skill} Curriculum</h3>
    <p className="text-gray-600 mb-4">
      Welcome to the {level} level of {skill}. Here's what you can expect to learn:
    </p>
    <ul className="list-disc list-inside space-y-2 mb-6">
      <li>Introduction to {skill} concepts</li>
      <li>Fundamental techniques and best practices</li>
      <li>Hands-on projects to apply your knowledge</li>
      <li>Advanced topics for {level === 'Advanced' ? 'mastery' : 'deeper understanding'}</li>
    </ul>
    <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
      Start Learning
    </button>
  </div>
);

const SwapSkillPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState(['Web Development', 'App Development', 'Machine Learning', 'Artificial Intelligence', 'Data Science']);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showLevels, setShowLevels] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const skillCategories = [
    { 
      title: "Web Development", 
      icon: Code, 
      description: "Learn to build responsive and dynamic websites using modern frameworks and technologies." 
    },
    { 
      title: "App Development", 
      icon: Smartphone, 
      description: "Master mobile app development for iOS and Android platforms." 
    },
    { 
      title: "Machine Learning", 
      icon: Brain, 
      description: "Dive into algorithms and techniques that enable computers to learn from data." 
    },
    { 
      title: "Artificial Intelligence", 
      icon: Brain, 
      description: "Explore the cutting-edge field of AI and its applications in various industries." 
    },
    { 
      title: "Data Science", 
      icon: Database, 
      description: "Learn to analyze complex data sets and derive meaningful insights." 
    }
  ];

  const handleGetStarted = () => {
    setShowLevels(true);
  };

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      if (!skills.includes(searchTerm.trim())) {
        setSkills([...skills, searchTerm.trim()]);
      }
      setSearchTerm('');
      setShowSearchResults(false);
      setSelectedSkill(searchTerm.trim());
      setShowLevels(false);
      setSelectedLevel(null);
    }
  };

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SwapSkill</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search skills..."
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onKeyPress={handleKeyPress}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              {showSearchResults && (
                <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
                  {filteredSkills.map((skill, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedSkill(skill);
                          setShowSearchResults(false);
                          setSearchTerm('');
                          setShowLevels(false);
                          setSelectedLevel(null);
                        }}>
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
              <Link to="/community" className="text-gray-600 hover:text-blue-600">Community</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {selectedSkill ? (
          <>
            {!showLevels && !selectedLevel && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Great choice! You've selected {selectedSkill}</h3>
                <p className="text-gray-600 mb-4">
                  We'll help you get started on your learning journey in {selectedSkill}. 
                  Our expert-curated curriculum will guide you through the fundamentals to advanced concepts.
                </p>
                <button 
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </div>
            )}

            {showLevels && !selectedLevel && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Choose your skill level for {selectedSkill}</h3>
                <p className="text-gray-600 mb-6">Select the difficulty level that best matches your current knowledge and experience:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DifficultyLevelButton level="Beginner" onClick={() => handleLevelSelection("Beginner")} />
                  <DifficultyLevelButton level="Intermediate" onClick={() => handleLevelSelection("Intermediate")} />
                  <DifficultyLevelButton level="Advanced" onClick={() => handleLevelSelection("Advanced")} />
                </div>
              </div>
            )}

            {selectedLevel && (
              <LevelContent level={selectedLevel} skill={selectedSkill} />
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-6">What do you want to learn?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => (
                <SkillCategory
                  key={index}
                  {...category}
                  selected={selectedSkill === category.title}
                  onClick={() => {
                    setSelectedSkill(category.title);
                    setShowLevels(false);
                    setSelectedLevel(null);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SwapSkillPage;