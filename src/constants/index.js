import project1 from "../assets/projects/project-1.webp";
import project2 from "../assets/projects/project-2.webp";
import project3 from "../assets/projects/project-3.webp";
import project4 from "../assets/projects/project-4.webp";
import { FaAngular, FaBootstrap, FaCss3, FaCss3Alt, FaDatabase, FaGithub, FaHtml5, FaInstagram, FaLinkedin, FaNode, FaPython, FaReact, FaSass, FaTwitter, FaVuejs } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import { DiFirebase, DiJavascript, DiRedis } from 'react-icons/di'
import {  FaNodeJs } from 'react-icons/fa'
import { RiAliensFill, RiNextjsFill, RiReactjsLine } from 'react-icons/ri'
import { SiExpress, SiJavascript, SiMongodb, SiMysql, SiPhp, SiPostgresql, SiRuby, SiSqlite, SiSvelte } from 'react-icons/si'
import { TbBrandNextjs, TbBrandThreejs } from 'react-icons/tb'
import { IoLogoJavascript } from "react-icons/io";


export const HERO_CONTENT = `I am a passionate full stack developer with a knack for crafting robust and scalable web applications. With 5 years of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js, MySQL, PostgreSQL, and MongoDB. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "2023 - Present",
    role: "Senior Full Stack Developer",
    company: "Google Inc.",
    description: `Led a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["Javascript", "React.js", "Next.js", "mongoDB"],
  },
  {
    year: "2022 - 2023",
    role: "Frontend Developer",
    company: "Adobe",
    description: `Designed and developed user interfaces for web applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized frontend performance.`,
    technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
  },
  {
    year: "2021 - 2022",
    role: "Full Stack Developer",
    company: "Facebook",
    description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
    technologies: ["Python", "Svelte", "Three.js", "Postgres"],
  },
  {
    year: "2020 - 2021",
    role: "Software Engineer",
    company: "Paypal",
    description: `Contributed to the development of web applications using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements.`,
    technologies: ["Ruby", "Rails", "PHP", "Sqlite"],
  },
];

export const projectTechIcons = [
  { icon: FaHtml5, label: 'HTML', className: 'inline-block text-orange-500' },
  { icon: FaCss3Alt, label: 'CSS', className: 'inline-block text-cyan-500' },
  { icon: FaReact, label: 'React', className: 'inline-block text-cyan-400' },
  { icon: FaNode, label: 'Node.js', className: 'inline-block text-green-500' },
  { icon: SiMongodb, label: 'mongoDB', className: 'inline-block text-green-500' },
  { icon: FaAngular, label: 'Angular', className: 'inline-block text-red-500' },
  { icon: DiFirebase, label: 'Firebase', className: 'inline-block text-yellow-300' },
  { icon: FaVuejs, label: 'Vue.js', className: 'inline-block text-green-500' },
  { icon: SiExpress, label: 'Express', className: 'inline-block' },
  { icon: SiMysql, label: 'mySQL', className: 'inline-block text-cyan-500' },
  { icon: FaBootstrap, label: 'Bootstrap', className: 'inline-block text-violet-300' },
  { icon: IoLogoJavascript, label: 'Javascript', className: 'inline-block text-yellow-500' },
  { icon: RiNextjsFill, label: 'Next.js', className: 'inline-block' },
  { icon: FaPython, label: 'Python', className: 'inline-block text-cyan-500' },
  { icon: SiSvelte, label: 'Svelte', className: 'inline-block text-red-500' },
  { icon: FaSass, label: 'Sass', className: 'inline-block' },
  { icon: SiPostgresql, label: 'Postgres', className: 'inline-block text-cyan-500' },
  { icon: SiRuby, label: 'Ruby', className: 'inline-block text-red-700' },
  { icon: SiPhp, label: 'PHP', className: 'inline-block text-cyan-500' },
  { icon: TbBrandThreejs, label: 'Three.js', className: 'inline-block' },
  { icon: SiSqlite, label: 'Sqlite', className: 'inline-block text-cyan-300' },
  { icon: RiAliensFill, label: 'Rails', className: 'inline-block text-red-500' },



  // Add more icons as needed
];
export const PROJECTS = [
  {
    title: "E-Commerce Website",
    image: project1,
    description:
      "A fully functional e-commerce website with features like product listing, shopping cart, and user authentication.",
    technologies: ["HTML", "CSS", "React", "Node.js", "mongoDB"],
  },
  {
    title: "Task Management App",
    image: project2,
    description:
      "An application for managing tasks and projects, with features such as task creation, assignment, and progress tracking.",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React", "Bootstrap"],
  },
  {
    title: "Blogging Platform",
    image: project4,
    description:
      "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
    technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
  },
];

export const CONTACT = {
  address: "San Jose Del Monte Bulacan",
  phoneNo: "+63999-798-6507",
  email: "marianolark@gmail.com",
};


export const socialLinks = [
  {
      href: 'https://www.linkedin.com',
      label: 'LinkedIn',
      icon: FaLinkedin, // Store the component itself
  },
  {
      href: 'https://github.com',
      label: 'Github',
      icon: FaGithub,
  },
  {
    href: 'https://www.instagram.com',
    label: 'Instagram',
    icon: FaInstagram,
  },
  {
      href: 'https://www.twitter.com',
      label: 'Twitter',
      icon: FaTwitter,
  },
];


const createIconVariants = (duration, offset) => ({
  initial: { y: offset },
  animate: {
      y: [offset, -offset],
      transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
      },
  },
});

// If you're using TypeScript, ensure to type this correctly

export const techIcons = [
  { id: 1, icon: RiReactjsLine, label: 'React', className: 'text-7xl text-cyan-400', variants: createIconVariants(2.5, 10) },
  { id: 2, icon: TbBrandNextjs, label: 'Next.js', className: 'text-7xl', variants: createIconVariants(1.5, 10) },
  { id: 3, icon: SiMongodb, label: 'MongoDB', className: 'text-7xl text-cyan-400', variants: createIconVariants(3, 15) },
  { id: 4, icon: DiRedis, label: 'Redis', className: 'text-7xl text-red-700', variants: createIconVariants(2, 15) },
  { id: 5, icon: FaNodeJs, label: 'Node.js', className: 'text-7xl text-green-500', variants: createIconVariants(2.5, 10) },
  { id: 6, icon: BiLogoPostgresql, label: 'PostgreSQL', className: 'text-7xl text-sky-700', variants: createIconVariants(2, 15) },
];