// skills.ts
interface SkillItem {
  name: string;
  icon: string;
  alt: string;
  url: string;
}

interface SkillCategory {
  title: string;
  items: SkillItem[];
}

const skills: SkillCategory[] = [
  {
    title: "1. AI & Integration",
    items: [
      { name: "OpenAI API", icon: "openai", alt: "OpenAI", url: "https://openai.com/" },
      { name: "Gemini API", icon: "google", alt: "Google AI", url: "https://ai.google/" },
    ],
  },
  {
    title: "2. Programming Languages",
    items: [
      { name: "TypeScript", icon: "typescript", alt: "TypeScript", url: "https://www.typescriptlang.org/" },
      { name: "JavaScript", icon: "javascript", alt: "JavaScript", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
      { name: "CSS", icon: "css", alt: "CSS", url: "https://developer.mozilla.org/docs/Web/CSS" },
      { name: "YAML", icon: "yaml", alt: "YAML", url: "https://yaml.org/" }, // Used in Docker & GitHub Actions
      { name: "PHP", icon: "php", alt: "PHP", url: "https://www.php.net/" },
    ],
  },
  {
    title: "3. Frontend",
    items: [
      { name: "React.js", icon: "react", alt: "React", url: "https://react.dev/" },
      { name: "Next.js", icon: "nextdotjs", alt: "Next.js", url: "https://nextjs.org/" },
      { name: "React Native", icon: "react", alt: "React Native", url: "https://reactnative.dev/" },
      { name: "Redux", icon: "redux", alt: "Redux", url: "https://redux.js.org/" },
      { name: "Tailwind CSS", icon: "tailwindcss", alt: "Tailwind CSS", url: "https://tailwindcss.com/" },
      { name: "Bootstrap", icon: "bootstrap", alt: "Bootstrap", url: "https://getbootstrap.com/" },
    ],
  },
  {
    title: "4. Backend",
    items: [
      { name: "Node.js", icon: "nodedotjs", alt: "Node.js", url: "https://nodejs.org/" },
      { name: "Express.js", icon: "express", alt: "Express.js", url: "https://expressjs.com/" },
      { name: "Prisma", icon: "prisma", alt: "Prisma", url: "https://www.prisma.io/" },
      { name: "NestJS", icon: "nestjs", alt: "NestJS", url: "https://nestjs.com/" },
      { name: "CodeIgniter", icon: "codeigniter", alt: "CodeIgniter", url: "https://codeigniter.com/" },
      { name: "Laravel", icon: "laravel", alt: "Laravel", url: "https://laravel.com/" },
    ],
  },
  {
    title: "5. Database",
    items: [
      { name: "MySQL", icon: "mysql", alt: "MySQL", url: "https://www.mysql.com/" },
      { name: "MongoDB", icon: "mongodb", alt: "MongoDB", url: "https://www.mongodb.com/" },
      { name: "PostgreSQL", icon: "postgresql", alt: "PostgreSQL", url: "https://www.postgresql.org/" },
      { name: "Oracle", icon: "oracle", alt: "Oracle", url: "https://www.oracle.com/database/" },
    ],
  },
  {
    title: "6. Testing",
    items: [
      { name: "Jest", icon: "jest", alt: "Jest", url: "https://jestjs.io/" },
      { name: "SonarQube", icon: "sonarqube", alt: "SonarQube", url: "https://www.sonarsource.com/products/sonarqube/" },
    ],
  },
  {
    title: "7. DevOps",
    items: [
      { name: "Docker", icon: "docker", alt: "Docker", url: "https://www.docker.com/" },
      { name: "GitHub Actions", icon: "githubactions", alt: "GitHub Actions", url: "https://github.com/features/actions" },
      { name: "GitLab CI", icon: "gitlab", alt: "GitLab CI", url: "https://docs.gitlab.com/ee/ci/" },
      { name: "Bitbucket Pipelines", icon: "bitbucket", alt: "Bitbucket Pipelines", url: "https://bitbucket.org/product/features/pipelines" },
      { name: "Firebase", icon: "firebase", alt: "Firebase", url: "https://firebase.google.com/" },
    ],
  },
  {
    title: "8. Tools",
    items: [
      { name: "VSCode", icon: "visualstudiocode", alt: "VS Code", url: "https://code.visualstudio.com/" },
      { name: "Figma", icon: "figma", alt: "Figma", url: "https://figma.com/" },
      { name: "GitHub", icon: "github", alt: "GitHub", url: "https://github.com/" },
      { name: "GitLab", icon: "gitlab", alt: "GitLab", url: "https://gitlab.com/" },
      { name: "Bitbucket", icon: "bitbucket", alt: "Bitbucket", url: "https://bitbucket.org/" },
      { name: "Jira", icon: "jira", alt: "Jira", url: "https://www.atlassian.com/software/jira" },
      { name: "ClickUp", icon: "clickup", alt: "ClickUp", url: "https://clickup.com/" },
      { name: "Firebase", icon: "firebase", alt: "Firebase", url: "https://firebase.google.com/" },
    ],
  },
];

export default skills;
