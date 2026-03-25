
export interface Project {
  title: string;
  description: string;
  category: 'Data Science' | 'IA & ML' | 'Data Engineering' | 'Data Analysis' | 'Web Dev';
  tags: string[];
  link: string;
  date: string; // YYYY-MM-DD for sorting
  workflow: {
    stage: string;
    tools: string[];
  }[];
  github?: string;
  liveUrl?: string;
  imageUrl?: string;
  softSkills?: string[];
  hardSkills?: string[];
}

export interface Concept {
  name: string;
  description: string;
  category: 'Data Science' | 'ML Engineering' | 'Infrastructure' | 'Core Principles';
}

export interface Tool {
  name: string;
  level: number; // Percentage from 0 to 100
}

export interface CategorizedTool {
  category: string;
  tools: Tool[];
}

export interface ChatMessage {
    id: number;
    sender: 'user' | 'bot';
    text: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
}

export interface Competency {
  category: string;
  description: string;
  tasks: string[];
}
