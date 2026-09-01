export type Locale = 'zh' | 'en';

export type LocalizedText = Record<Locale, string>;

export interface Project {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  year: string;
  summary: LocalizedText;
  image: string;
  imageAvif: string;
  alt: LocalizedText;
  tags: string[];
}

export interface SiteContent {
  brand: string;
  nav: { work: string; about: string; capabilities: string; contact: string };
  hero: {
    kicker: string;
    eyebrow: string;
    title: string;
    cta: string;
    sceneLabels: string[];
    fieldTitle: string;
    fieldCopy: string;
    manifesto: string;
    manifestoCopy: string;
  };
  work: { index: string; title: string; intro: string; open: string };
  about: { index: string; title: string; body: string; note: string };
  capabilities: {
    index: string;
    title: string;
    items: Array<{ title: string; body: string; tools: string }>;
  };
  contact: { index: string; title: string; body: string; pending: string };
  dialog: { close: string; projectLabel: string };
  footer: string;
}

export const content: Record<Locale, SiteContent> = {
  zh: {
    brand: '个人作品集',
    nav: { work: '作品', about: '关于', capabilities: '能力', contact: '联系' },
    hero: {
      kicker: 'MULTIDISCIPLINARY CREATOR · 2026',
      eyebrow: '视觉设计 / AI 创作 / 网页体验',
      title: 'CREATE\nBEYOND\nFORM.',
      cta: '查看精选作品',
      sceneLabels: ['赛博身份场景', '创作领域场景', '创作宣言场景'],
      fieldTitle: 'THREE FIELDS.\nONE PRACTICE.',
      fieldCopy: '把图像、生成式工具与网页交互放进同一个创作系统。',
      manifesto: '在真实与虚拟之间，\n寻找新的表达界面。',
      manifestoCopy: '不被单一媒介定义。以视觉为起点，用技术拓展叙事的边界。',
    },
    work: {
      index: '01 — SELECTED WORK',
      title: '作品先说话。',
      intro: '从视觉系统到动态角色，再到可交互的网页界面。这是一组持续更新的跨媒介创作练习。',
      open: '查看项目',
    },
    about: {
      index: '02 — ABOUT',
      title: '在人的直觉与机器的可能性之间工作。',
      body: '这是一个综合创作者的个人档案：关注视觉设计、AI 影像与网页体验如何互相影响。每个项目都从一个明确的感受或问题出发，再选择最合适的媒介完成表达。',
      note: '当前版本使用现有创作素材构建，正式姓名与完整履历将在后续补充。',
    },
    capabilities: {
      index: '03 — CAPABILITIES',
      title: '三种能力，\n一套创作方法。',
      items: [
        { title: 'Visual Design', body: '编辑排版、视觉系统、海报与数字图像，强调节奏、层级和可识别性。', tools: 'LAYOUT / TYPE / IMAGE' },
        { title: 'AI Creation', body: '使用生成式工具进行角色、画面与动态实验，并把结果纳入完整叙事。', tools: 'CONCEPT / IMAGE / MOTION' },
        { title: 'Web Experience', body: '把视觉语言转译为响应式网页、交互动效和可访问的数字体验。', tools: 'UI / MOTION / FRONTEND' },
      ],
    },
    contact: {
      index: '04 — CONTACT',
      title: '让下一件作品\n从一次对话开始。',
      body: '联系方式与社交链接将在确认后补充。网站不会展示虚构邮箱或无效账号。',
      pending: 'CONTACT DETAILS — COMING SOON',
    },
    dialog: { close: '关闭', projectLabel: '项目预览' },
    footer: '视觉 · AI · WEB / 持续更新中',
  },
  en: {
    brand: 'Portfolio',
    nav: { work: 'Work', about: 'About', capabilities: 'Skills', contact: 'Contact' },
    hero: {
      kicker: 'MULTIDISCIPLINARY CREATOR · 2026',
      eyebrow: 'VISUAL DESIGN / AI CREATION / WEB EXPERIENCE',
      title: 'CREATE\nBEYOND\nFORM.',
      cta: 'View selected work',
      sceneLabels: ['Cyber identity scene', 'Creative fields scene', 'Creative manifesto scene'],
      fieldTitle: 'THREE FIELDS.\nONE PRACTICE.',
      fieldCopy: 'Images, generative tools and web interaction shaped into one creative system.',
      manifesto: 'Finding new interfaces\nbetween the real and virtual.',
      manifestoCopy: 'Never defined by one medium. Starting with visual instinct, using technology to expand the edges of a story.',
    },
    work: {
      index: '01 — SELECTED WORK',
      title: 'Let the work speak.',
      intro: 'From visual systems and moving characters to interactive web surfaces — an evolving set of cross-media studies.',
      open: 'View project',
    },
    about: {
      index: '02 — ABOUT',
      title: 'Working between human intuition and machine possibility.',
      body: 'A multidisciplinary creator archive exploring how visual design, AI imagery and web experiences influence one another. Each project begins with a feeling or a question, then finds the medium that can express it best.',
      note: 'This first edition is built from existing creative material. A formal name and full biography will be added later.',
    },
    capabilities: {
      index: '03 — CAPABILITIES',
      title: 'Three capabilities.\nOne creative method.',
      items: [
        { title: 'Visual Design', body: 'Editorial systems, typography, posters and digital imagery with a focus on rhythm and identity.', tools: 'LAYOUT / TYPE / IMAGE' },
        { title: 'AI Creation', body: 'Character, image and motion experiments shaped with generative tools and intentional art direction.', tools: 'CONCEPT / IMAGE / MOTION' },
        { title: 'Web Experience', body: 'Visual languages translated into responsive interfaces, motion and accessible digital experiences.', tools: 'UI / MOTION / FRONTEND' },
      ],
    },
    contact: {
      index: '04 — CONTACT',
      title: 'Let the next piece\nbegin with a conversation.',
      body: 'Contact and social links will be added once confirmed. No invented email address or inactive account is shown.',
      pending: 'CONTACT DETAILS — COMING SOON',
    },
    dialog: { close: 'Close', projectLabel: 'Project preview' },
    footer: 'VISUAL · AI · WEB / AN EVOLVING ARCHIVE',
  },
};

export const projects: Project[] = [
  {
    id: 'cyber-identity',
    title: { zh: '赛博身份视觉研究', en: 'Cyber Identity Study' },
    category: { zh: 'AI 视觉', en: 'AI Visual' },
    year: '2026',
    summary: {
      zh: '围绕虚拟角色、霓虹界面与未来身份展开的视觉风格练习。',
      en: 'A visual style study around virtual characters, neon interfaces and future identity.',
    },
    image: '/assets/project-cyber.webp',
    imageAvif: '/assets/project-cyber.avif',
    alt: { zh: '紫色霓虹赛博朋克网页视觉', en: 'Purple neon cyberpunk web visual' },
    tags: ['AI', 'ART DIRECTION', 'IDENTITY'],
  },
  {
    id: 'dark-interface',
    title: { zh: '暗色界面系统', en: 'Dark Interface System' },
    category: { zh: '网页体验', en: 'Web Experience' },
    year: '2026',
    summary: {
      zh: '以信息层级、克制色彩和模块网格为核心的个人网站界面研究。',
      en: 'A personal-site interface study built around hierarchy, restrained color and modular grids.',
    },
    image: '/assets/project-web.webp',
    imageAvif: '/assets/project-web.avif',
    alt: { zh: '暗蓝色个人网站长页面预览', en: 'Dark blue long-form portfolio page preview' },
    tags: ['WEB', 'UI', 'SYSTEM'],
  },
  {
    id: 'motion-character',
    title: { zh: '角色与镜头实验', en: 'Character & Motion Study' },
    category: { zh: 'AI 动态影像', en: 'AI Motion' },
    year: '2026',
    summary: {
      zh: '从静态角色出发，探索镜头运动、人物动作与画面节奏。',
      en: 'An exploration of camera motion, character movement and visual rhythm from a static source.',
    },
    image: '/assets/project-motion.webp',
    imageAvif: '/assets/project-motion.avif',
    alt: { zh: '粉色头发角色的动态影像分镜', en: 'Motion storyboard featuring a pink-haired character' },
    tags: ['MOTION', 'CHARACTER', 'AI'],
  },
  {
    id: 'editorial-grid',
    title: { zh: '编辑网格练习', en: 'Editorial Grid Practice' },
    category: { zh: '视觉设计', en: 'Visual Design' },
    year: '2026',
    summary: {
      zh: '通过不对称图像、粗体标题和细密信息建立具有节奏感的版面。',
      en: 'Rhythmic layouts built from asymmetric imagery, bold headlines and dense micro-copy.',
    },
    image: '/assets/project-editorial.webp',
    imageAvif: '/assets/project-editorial.avif',
    alt: { zh: '黑白编辑设计作品集页面', en: 'Black-and-white editorial portfolio layout' },
    tags: ['EDITORIAL', 'TYPE', 'LAYOUT'],
  },
  {
    id: 'poster-type',
    title: { zh: '海报与字体实验', en: 'Poster & Type Experiments' },
    category: { zh: '平面视觉', en: 'Graphic Visual' },
    year: '2026',
    summary: {
      zh: '将角色图像、三维字体和高对比构图组合成数字海报系列。',
      en: 'A digital poster series combining character imagery, 3D type and high-contrast composition.',
    },
    image: '/assets/project-poster.webp',
    imageAvif: '/assets/project-poster.avif',
    alt: { zh: '黑白赛博风格平面设计拼贴', en: 'Black-and-white cyber graphic design collage' },
    tags: ['POSTER', '3D TYPE', 'GRAPHIC'],
  },
];
