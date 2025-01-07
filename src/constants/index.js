import project1 from "../assets/projects/project-1.webp";
import project2 from "../assets/projects/project-2.webp";
import project3 from "../assets/projects/project-3.webp";
import project4 from "../assets/projects/project-4.webp";
import kraken from "../assets/projects/kraken.png";
import web3 from "../assets/projects/web3.png";
import IkaProject from "../assets/projects/IkaProject.png";
import brainwave from "../assets/projects/brainwave.png";
import fashion from "../assets/projects/fashion.png";


import { FaAngular, FaBootstrap, FaCss3, FaCss3Alt, FaDatabase, FaFacebook, FaGithub, FaHtml5, FaInstagram, FaJava, FaLinkedin, FaNode, FaPython, FaReact, FaSass, FaTwitter, FaVuejs, FaWordpress } from 'react-icons/fa'
import { BiLogoPostgresql } from 'react-icons/bi'
import { DiFirebase, DiJavascript, DiRedis } from 'react-icons/di'
import {  FaNodeJs } from 'react-icons/fa'
import { RiAliensFill, RiNextjsFill, RiReactjsLine } from 'react-icons/ri'
import { SiExpress, SiJavascript, SiMongodb, SiMysql, SiPhp, SiPostgresql, SiRuby, SiSpringboot, SiSqlite, SiSvelte, SiTailwindcss, SiTypescript, SiVite } from 'react-icons/si'
import { TbBrandNextjs, TbBrandThreejs } from 'react-icons/tb'
import { IoLogoJavascript } from "react-icons/io";
import { BsBootstrap } from "react-icons/bs";
import { CgVercel } from "react-icons/cg";


export const HERO_CONTENT = `I am an expert Full-Stack Developer with 3+ years of experience crafting scalable web applications and mobile solutions. My expertise spans a wide range of technologies, including React, Next.js, and Angular for dynamic front-end development, as well as React Native for building seamless mobile apps. On the back-end, I excel in Node.js and Spring Boot, and I am highly proficient in databases such as MySQL, PostgreSQL, and MongoDB. With a passion for creating innovative, high-performance solutions, I deliver exceptional user experiences and drive business growth through cutting-edge technologies.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "2022 - Present",
    role: "Full Stack Developer",
    company: "Bureau of Fisheries and Aquatic Resources",
    description: `Led a team in developing and maintaining web applications using Typescript, Angular.js, Bootstrap and Springboot. Implemented RESTful APIs and integrated with MySql databases. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["Typescript", "Angular", "Java", "mySQL", "Springboot"],
  },
  {
    year: "2020 - 2022",
    role: "I.T Specialist/Network Administrator",
    company: "Land Transportation Office",
    description: "As an IT Specialist and Network Administrator at the Land Transportation Office in the Philippines, I was responsible for overseeing network infrastructure, ensuring system security, and providing technical support to enhance operational efficiency and service delivery.",
    technologies: ["Python", "Svelte", "Three.js", "Postgres"],
  },
  {
    year: "2019-2020",
    role: "I.T Specialist",
    company: "Commonwealth Hospital & Medical Center",
    description: "As an IT Specialist at a hospital, I played a crucial role in managing and maintaining healthcare technology systems, ensuring optimal performance and reliability to support patient care and streamline operations.",
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
  { icon: FaJava, label: 'Java', className: 'inline-block text-white-500' },
  { icon: SiTypescript, label: 'Typescript', className: 'inline-block text-cyan-500' },
  { icon: SiSpringboot, label: 'Springboot', className: 'inline-block text-green-500' },
  { icon: FaWordpress, label: 'Wordpress', className: 'inline-block text-cyan-500' },


  // Add more icons as needed
];
export const PROJECTS = [
  {
    title: "Kraken Portfolio",
    image: kraken,
    url: "https://krakengfx.xyz/", // Replace with actual URL
    description:
      "A comprehensive digital marketing service that includes stunning web designs, unique graphic arts, custom stickers, engaging memes, and NFT creation to enhance your online presence and brand identity.",
    technologies: ["HTML", "CSS", "React", "Node.js", "mongoDB"],
  },
  {
    title: "Fashion Sense",
    image: fashion,
    url: "https://theofficialfashionsense.com/", // Replace with actual URL
    description:
      "A stylish online clothing store built on WordPress, showcasing my fashion sense through a curated collection of apparel that combines trend-driven designs with an intuitive shopping experience.",
    technologies: ["HTML", "CSS", "Wordpress", "mySQL"],
  },
  {
    title: "My Web-3 Portfolio",
    image: web3,
    url: "https://portfoliov2-sandy.vercel.app/", // Replace with actual URL
    description:
      "A dynamic portfolio showcasing my Web3 applications, featuring innovative blockchain solutions, decentralized applications, and NFT projects designed to redefine user experiences in the digital landscape.",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
  },
  {
    title: "MemeCoin Website - $IKA",
    image: IkaProject,
    url: "https://ika-mu.vercel.app/", // Replace with actual URL
    description:
      "Developed a sleek, responsive website that highlights my proficiency in modern web development technologies. Leveraging React for building dynamic, component-based UI elements. Utilizing Tailwind CSS, enabling rapid styling with a utility-first approach, allowing for highly customizable layouts and a clean aesthetic.",
    technologies: ["HTML", "CSS", "React", "Tailwind"],
  },
  {
    title: "BrainWave Project",
    image: brainwave,
    url: "https://brainwave-three-khaki.vercel.app/", // Replace with actual URL
    description:
    "A practice project showcasing my Brainwave AI platform, designed to demonstrate my skills in building intelligent applications with innovative features and an intuitive user interface.",
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
      href: 'https://www.linkedin.com/in/lark-mariano-077a21263/',
      label: 'LinkedIn',
      icon: FaLinkedin, // Store the component itself
  },
  {
      href: 'https://github.com/LarkMaytrixMariano',
      label: 'Github',
      icon: FaGithub,
  },
  {
    href: 'https://www.facebook.com/marianolark',
    label: 'Facebook',
    icon: FaFacebook,
  },
  {
      href: 'https://x.com/LarkM29927',
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
  { id: 1, icon: RiReactjsLine, label: 'React', className: 'text-7xl text-cyan-400', variants: createIconVariants(3, 10) },
  { id: 2, icon: FaAngular, label: 'Angular', className: 'text-7xl text-red-600', variants: createIconVariants(1.5, 10) },
  { id: 3, icon: SiVite, label: 'Vite', className: 'text-7xl text-violet-500', variants: createIconVariants(2, 10) },
  { id: 4, icon: SiTailwindcss, label: 'Tailwind', className: 'text-7xl text-cyan-500', variants: createIconVariants(1.5, 10) },
  { id: 5, icon: BsBootstrap, label: 'Bootstrap', className: 'text-7xl text-violet-600', variants: createIconVariants(3, 10) },
  { id: 6, icon: TbBrandNextjs, label: 'Next.js', className: 'text-7xl', variants: createIconVariants(2.5, 10) },
  { id: 7, icon: SiMongodb, label: 'MongoDB', className: 'text-7xl text-green-600', variants: createIconVariants(3, 15) },
  { id: 8, icon: DiRedis, label: 'Redis', className: 'text-7xl text-red-700', variants: createIconVariants(2, 15) },
  { id: 9, icon: FaNodeJs, label: 'Node.js', className: 'text-7xl text-yellow-500', variants: createIconVariants(2.5, 10) },
  { id: 11, icon: BiLogoPostgresql, label: 'PostgreSQL', className: 'text-7xl text-sky-700', variants: createIconVariants(1.5, 15) },
  { id: 12, icon: SiMysql, label: 'Mysql', className: 'text-7xl text-sky-700', variants: createIconVariants(3, 15) },
  { id: 13, icon: FaWordpress, label: 'WordPress', className: 'text-7xl text-sky-700', variants: createIconVariants(1, 15) },
  { id: 14, icon: CgVercel, label: 'Vercel', className: 'text-7xl text-black-500', variants: createIconVariants(1.5, 15) },
  { id: 15, icon: FaGithub, label: 'Github', className: 'text-7xl text-black-500', variants: createIconVariants(2, 15) },
  { id: 16, icon: FaPython, label: 'Python', className: 'text-7xl text-cyan-500', variants: createIconVariants(3, 15) },
];