import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '大脑作弊器 | 不读废话，直取真经',
    template: '%s | 大脑作弊器',
  },
  description:
    '大脑作弊器是一款零门槛的认知提效工具，将60分钟阅读压缩至5分钟行动指令。支持文件、链接、截图三种输入方式，自动生成"名道法术器例"结构的核心脚本。',
  keywords: [
    '大脑作弊器',
    '知识提炼',
    '阅读加速',
    'AI摘要',
    '核心脚本',
    '名道法术器例',
    '认知提效',
    '知识管理',
  ],
  authors: [{ name: '大脑作弊器团队' }],
  generator: '大脑作弊器',
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: '扣子编程 | 你的 AI 工程师已就位',
    description:
      '我正在使用扣子编程 Vibe Coding，让创意瞬间上线。告别拖拽，拥抱心流。',
    url: 'https://code.coze.cn',
    siteName: '扣子编程',
    locale: 'zh_CN',
    type: 'website',
    // images: [
    //   {
    //     url: '',
    //     width: 1200,
    //     height: 630,
    //     alt: '扣子编程 - 你的 AI 工程师',
    //   },
    // ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Coze Code | Your AI Engineer is Here',
  //   description:
  //     'Build and deploy full-stack applications through AI conversation. No env setup, just flow.',
  //   // images: [''],
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
