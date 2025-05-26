
import React, { useState } from 'react';
import { Search, Plus, Copy, Heart, BookOpen, Terminal, Code, Briefcase, Palette, Shield, Database, Brain, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const platforms = [
  { name: 'GitHub Copilot', color: 'bg-gray-900', active: true },
  { name: 'ChatGPT', color: 'bg-green-600', active: false },
  { name: 'Grok', color: 'bg-black', active: false },
  { name: 'Claude', color: 'bg-orange-500', active: false },
  { name: 'Perplexity', color: 'bg-blue-600', active: false },
  { name: 'Mistral', color: 'bg-purple-600', active: false },
  { name: 'Gemini', color: 'bg-blue-500', active: false },
  { name: 'Meta', color: 'bg-blue-700', active: false }
];

const categories = [
  { name: 'Developer Prompts', count: 49, icon: Code },
  { name: 'Accessibility Auditor', icon: Shield },
  { name: 'Programming Converter', icon: Zap },
  { name: 'Architect Guide', icon: Briefcase },
  { name: 'Code Reviewer', icon: BookOpen },
  { name: 'Cyber Security Specialist', icon: Shield },
  { name: 'Data Scientist', icon: Database },
  { name: 'Terminal Expert', icon: Terminal },
  { name: 'UX/UI Developer', icon: Palette },
  { name: 'Web Design Consultant', icon: Globe },
  { name: 'Tech Reviewer', icon: Brain }
];

const prompts = [
  {
    id: 1,
    title: "Add Your Prompt",
    description: "Share your creative prompts with the community! Submit a pull request to add your prompts to the collection.",
    author: "Community",
    date: "2023",
    isSpecial: true
  },
  {
    id: 2,
    title: "Act as an Ethereum Developer",
    description: "Imagine you are an experienced Ethereum developer tasked with creating a smart contract for a blockchain messenger. The objective is to save messages on the blockchain, making them readable...",
    author: "@ethereum",
    date: "2023"
  },
  {
    id: 3,
    title: "Act as a Linux Terminal",
    description: "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and...",
    author: "@terminal",
    date: "2023"
  },
  {
    id: 4,
    title: "Act as a JavaScript Console",
    description: "I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique...",
    author: "@javascript",
    date: "2023"
  },
  {
    id: 5,
    title: "Act as an Excel Sheet",
    description: "I want you to act as a text based excel. You'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference...",
    author: "@excel",
    date: "2023"
  },
  {
    id: 6,
    title: "Act as a UX/UI Developer",
    description: "I want you to act as a UX/UI developer. I will provide some details about the design of an app, website or other digital product, and it will be your job to come up with creative ways to improve its user...",
    author: "@designer",
    date: "2023"
  },
  {
    id: 7,
    title: "Act as a Cyber Security Specialist",
    description: "I want you to act as a cyber security specialist. I will provide some specific information about how data is stored and shared, and it will be your job to come up with strategies for protecting this data from...",
    author: "@security",
    date: "2023"
  },
  {
    id: 8,
    title: "Act as a Web Design Consultant",
    description: "I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most...",
    author: "@webdesign",
    date: "2023"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Developer Prompts');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['GitHub Copilot']);
  const { toast } = useToast();

  const copyPrompt = (title: string) => {
    navigator.clipboard.writeText(title);
    toast({
      title: "Copied to clipboard",
      description: "Prompt has been copied to your clipboard.",
    });
  };

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-teal-600">prompts.chat</h1>
            <span className="text-sm text-gray-500">World's First & Most Famous Prompts Directory</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              New: Try Vibe Coding Mode!
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">vibe-coded with cursor</span>
            <span className="text-sm text-gray-600">126,815</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Sign in</Button>
              <Button size="sm">Get Pro</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Platform Selector */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 mr-4">Choose your AI platform</span>
            {platforms.map((platform) => (
              <Badge
                key={platform.name}
                variant={selectedPlatforms.includes(platform.name) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedPlatforms.includes(platform.name) 
                    ? platform.color + ' text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  if (selectedPlatforms.includes(platform.name)) {
                    setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.name));
                  } else {
                    setSelectedPlatforms([...selectedPlatforms, platform.name]);
                  }
                }}
              >
                {platform.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <nav className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                        selectedCategory === category.name
                          ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="flex-1">{category.name}</span>
                      {category.count && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCategory}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Reply in English</span>
                <span>using technical tone, for developers</span>
              </div>
            </div>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Prompt
            </Button>
          </div>

          {/* Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrompts.map((prompt) => (
              <Card
                key={prompt.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                  prompt.isSpecial ? 'border-2 border-dashed border-teal-300 bg-teal-50' : 'hover:border-teal-200'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-semibold text-gray-900 leading-tight">
                      {prompt.title}
                    </CardTitle>
                    <div className="flex space-x-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyPrompt(prompt.title);
                        }}
                        className="p-1 h-auto text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto text-gray-400 hover:text-red-500"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto text-gray-400 hover:text-gray-600"
                      >
                        <BookOpen className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-gray-600 line-clamp-4 mb-4">
                    {prompt.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{prompt.author}</span>
                    <span>{prompt.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
