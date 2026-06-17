export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'web-apps' | 'ui-ux' | 'full-stack';
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // percentage (e.g. 95)
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'design' | 'modern' | 'programming';
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string[];
  type: 'education' | 'academic-project' | 'freelance' | 'certification';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon identifier
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  comment: string;
  avatar: string;
  rating: number;
}
