import { Project, Skill, ExperienceItem, ServiceItem, Testimonial } from './types';

export const personalInfo = {
  name: "Berramdane Nawel Meriem",
  shortName: "Meriem",
  title: "Full-Stack Web Developer & UI/UX Designer",
  bio: "I craft modern digital experiences through clean code, thoughtful design, and innovative solutions.",
  aboutDescription: "Passionate Full-Stack web developer and creative art director specializing in creating modern, responsive, and visually engaging digital experiences. I combine strong technical foundations with artistic creative thinking to build full-stack applications that are both structurally robust and visually stunning.",
  email: "meriemberramdane98@gmail.com",
  phone: "+213773355929",
  location: "Algeria",
  github: "https://github.com/meriemberramdane",
  linkedin: "https://www.linkedin.com/in/meriem-b-101030257/?locale=en",
  instagram: "https://instagram.com/meriem.berramdane",
  resumeUrl: "#" // Simulating PDF/cv download
};

export const projectsData: Project[] = [
  {
    id: "le-studio-brocante",
    title: "Le Studio Brocante",
    description:
      "A modern e-commerce platform dedicated to antique, vintage, and collectible items. Designed to provide a seamless browsing experience where users can explore unique products, discover rare treasures, and enjoy an elegant, fully responsive interface.",
    image: "/images/LSB.png",
    category: "full-stack",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Responsive Design"],
    githubUrl: "https://github.com/meriemberramdane/le-studio-brocante",
    liveUrl: "https://le-studio-brocante.vercel.app/",
    featured: true
  }
];

export const skillsData: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "JavaScript", level: 92, category: "frontend" },
  { name: "Tailwind CSS", level: 98, category: "frontend" },
  { name: "HTML5", level: 95, category: "frontend" },
  { name: "CSS3", level: 93, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 88, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "REST APIs", level: 90, category: "backend" },
  
  // Database
  { name: "MySQL", level: 82, category: "database" },
  { name: "PostgreSQL", level: 86, category: "database" },
  
  // Tools
  { name: "Git", level: 90, category: "tools" },
  { name: "GitHub", level: 93, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  
  // Design
  { name: "Figma", level: 92, category: "design" },
  { name: "UI/UX Design", level: 90, category: "design" },
  { name: "Adobe Photoshop", level: 80, category: "design" }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    title: "Freelance Full-Stack Web Developer & UI/UX Designer",
    organization: "Independent Creative Agency",
    period: "2025 - Present",
    description: [
      "Crafting premium performance interfaces and fully interactive full-stack business tools for global and local clients.",
      "Directing design workflows from wireframe logic to detailed motion systems, transitions, and style boards.",
      "Achieving outstanding results in clients' customer conversions by building immersive, accessible and rapid page structures."
    ],
    type: "freelance"
  },
  {
    id: "exp-2",
    title: "Master's Degree in Computer Science & Engineering",
    organization: "Algeria University System",
    period: "2024 - 2026",
    description: [
      "Acquired top-tier foundations in algorithmic complexity, full-stack database architectures, computer network protocols, and object-oriented design.",
      "Specialized in modular systems architectures and beautiful human-computer interaction designs."
    ],
    type: "education"
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Web Development",
    description: "Building modern, scalable, responsive websites and complex applications with flawless architecture.",
    iconName: "Globe",
    details: ["React / Next.js / TypeScript Core", "Express.js robust API layers", "Clean, modular code structures", "Robust error checking"]
  },
  {
    id: "srv-2",
    title: "UI/UX Design",
    description: "Designing intuitive, engaging client journeys and visual narratives that connect brand values with real hearts.",
    iconName: "Palette",
    details: ["Interaction design & prototypes", "Branding & typographical systems", "Interactive design wireframes", "Aesthetic grid hierarchies"]
  },
  {
    id: "srv-3",
    title: "Frontend Development",
    description: "Creating highly interactive client interfaces, detailed smooth transitions, and layout micro-effects.",
    iconName: "Laptop",
    details: ["Advanced motion styling animations", "Mouse-interactive components", "SVG drawing and particle layouts", "Interactive canvas setups"]
  },
  {
    id: "srv-4",
    title: "Website Optimization",
    description: "Calibrating web vitals, speed ratios, accessibility metrics, and search layouts for peak rating.",
    iconName: "Cpu",
    details: ["SEO semantic architectures", "Compressive bundle and image load ratios", "Strict Lighthouse 95+ strategies", "Smooth rendering logic"]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Alex Thorne",
    position: "Founder & Creative Director",
    company: "AlphaPixel Digital",
    comment: "Meriem has elevated our platform's digital image to another dimension. Her attention to typographical details, fluid micro-motions, and robust React architectures is unmatched. Our custom hub looks and feels premium.",
    avatar: "https://picsum.photos/seed/alex/100/100",
    rating: 5
  },
  {
    id: "test-2",
    name: "Sophia Martinez",
    position: "Product Manager",
    company: "Veridian Tech Solutions",
    comment: "An exceptional, elite frontend mastermind. She did not just write the code; she helped design the ultimate user journey using Figma. Working together was extremely seamless, fast, and highly professional.",
    avatar: "https://picsum.photos/seed/sophia/100/100",
    rating: 5
  },
  {
    id: "test-3",
    name: "Tariq Abdul",
    position: "Engineering Director",
    company: "Zeta Global Systems",
    comment: "Meriem completed a critical information suite for our dashboard. Not only is the system beautiful and responsive on mobile, but the database structures are secure and fast. Lighthouse ratings hit 99 immediately.",
    avatar: "https://picsum.photos/seed/tariq/100/100",
    rating: 5
  }
];
