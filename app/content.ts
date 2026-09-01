export type Locale = 'zh' | 'en';

export type LocalizedText = Record<Locale, string>;

export interface Project {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  year: string;
  summary: LocalizedText;
  mediaType: 'image' | 'video';
  image: string;
  imageAvif?: string;
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
    id: 'bluetooth-speaker-motion',
    title: { zh: '蓝牙音响动画', en: 'Bluetooth Speaker Motion' },
    category: { zh: '动态影像', en: 'Motion' },
    year: '—',
    summary: {
      zh: '蓝牙音响的动态呈现作品。',
      en: 'A moving presentation for a Bluetooth speaker.',
    },
    mediaType: 'video',
    image: '/assets/work/bluetooth-speaker-motion.mp4',
    alt: { zh: '蓝牙音响动态影像', en: 'Bluetooth speaker motion film' },
    tags: ['PRODUCT', 'MOTION', '3D'],
  },
  {
    id: 'headphone-motion',
    title: { zh: '耳机动画效果', en: 'Headphone Motion' },
    category: { zh: '动态影像', en: 'Motion' },
    year: '—',
    summary: {
      zh: '耳机产品的动画效果展示。',
      en: 'A motion study for a headphone product.',
    },
    mediaType: 'video',
    image: '/assets/work/headphone-motion.mp4',
    alt: { zh: '耳机产品动态影像', en: 'Headphone product motion film' },
    tags: ['PRODUCT', 'MOTION', '3D'],
  },
  {
    id: 'bathroom-motion',
    title: { zh: '浴室小场景动画', en: 'Bathroom Scene Motion' },
    category: { zh: '场景动画', en: 'Scene Motion' },
    year: '—',
    summary: {
      zh: '浴室主题的三维小场景动画。',
      en: 'A small 3D motion scene set in a bathroom.',
    },
    mediaType: 'video',
    image: '/assets/work/bathroom-motion.mp4',
    alt: { zh: '浴室主题的三维动画场景', en: '3D bathroom motion scene' },
    tags: ['SCENE', 'MOTION', '3D'],
  },
  {
    id: 'beach-monkey',
    title: { zh: '沙滩猴', en: 'Beach Monkey' },
    category: { zh: '角色场景', en: 'Character Scene' },
    year: '—',
    summary: {
      zh: '夏日海岛主题的角色场景插画。',
      en: 'A summer-island character scene.',
    },
    mediaType: 'image',
    image: '/assets/work/beach-monkey.jpg',
    alt: { zh: '夏日海岛上的猴子与小鸡角色', en: 'Monkey and chick characters on a summer island' },
    tags: ['CHARACTER', '3D', 'SCENE'],
  },
  {
    id: 'space-crew',
    title: { zh: '宇航小队', en: 'Space Crew' },
    category: { zh: '角色视觉', en: 'Character Visual' },
    year: '—',
    summary: {
      zh: '宇宙场景中的卡通宇航角色视觉。',
      en: 'A cartoon astronaut character visual in space.',
    },
    mediaType: 'image',
    image: '/assets/work/space-crew.jpg',
    alt: { zh: '宇宙飞船旁的卡通宇航员', en: 'Cartoon astronaut near a spaceship' },
    tags: ['CHARACTER', '3D', 'SPACE'],
  },
  {
    id: 'r-design-logo',
    title: { zh: 'R-Design Studio', en: 'R-Design Studio' },
    category: { zh: '品牌标识', en: 'Brand Identity' },
    year: '—',
    summary: {
      zh: 'R-Design Studio 的霓虹立体标识视觉。',
      en: 'A neon dimensional identity for R-Design Studio.',
    },
    mediaType: 'image',
    image: '/assets/work/r-design-logo.png',
    alt: { zh: '紫蓝霓虹风格的 R-Design Studio 标识', en: 'Purple and blue neon R-Design Studio mark' },
    tags: ['BRAND', '3D', 'IDENTITY'],
  },
  {
    id: 'giant-spider-scene',
    title: { zh: '巨蛛街景', en: 'Giant Spider Scene' },
    category: { zh: '场景视觉', en: 'Scene Visual' },
    year: '—',
    summary: {
      zh: '废墟建筑与巨型蜘蛛构成的电影感场景视觉。',
      en: 'A cinematic scene with a giant spider above a weathered building.',
    },
    mediaType: 'image',
    image: '/assets/work/giant-spider-scene.png',
    alt: { zh: '废墟建筑上方的巨型蜘蛛场景', en: 'Giant spider above a weathered building' },
    tags: ['SCENE', 'CINEMATIC', 'VISUAL'],
  },
  {
    id: 'garden-resort',
    title: { zh: '花园泳池度假屋', en: 'Garden Pool Retreat' },
    category: { zh: '建筑可视化', en: 'Archviz' },
    year: '2026',
    summary: {
      zh: '热带花园环境中的泳池度假屋建筑可视化。',
      en: 'An architectural visualization of a pool retreat in a tropical garden.',
    },
    mediaType: 'image',
    image: '/assets/work/garden-resort.png',
    alt: { zh: '热带花园与泳池环绕的度假屋', en: 'Pool retreat surrounded by tropical gardens' },
    tags: ['ARCHVIZ', 'GARDEN', '3D'],
  },
];
