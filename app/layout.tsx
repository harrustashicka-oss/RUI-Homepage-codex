import type { Metadata } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '个人作品集｜视觉 · AI · Web',
    template: '%s｜个人作品集',
  },
  description: '聚焦视觉设计、AI 创作与网页体验的动态个人作品集。',
  keywords: ['视觉设计', 'AI 创作', '网页体验', '个人作品集', 'Visual Design'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: 'CREATE BEYOND FORM.',
    description: 'VISUAL · AI · WEB / 动态综合创作者个人作品集',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CREATE BEYOND FORM.',
    description: 'VISUAL · AI · WEB / 动态综合创作者个人作品集',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
