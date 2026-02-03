import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AWKN - AI Cognitive Awakening Platform',
  description: 'Help others achieve cognitive awakening through AI-powered content creation',
  keywords: ['AI', 'cognitive awakening', 'content creation', 'AI generation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-apple-gray-50 border-t border-apple-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-4 text-apple-gray-900">AWKN</h3>
                <p className="text-apple-gray-500 leading-relaxed max-w-md">
                  帮助他人做认知觉醒的平台，通过AI赋能内容创作，让创意无限延伸。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-apple-gray-900 mb-4">产品</h4>
                <ul className="space-y-2">
                  <li><a href="/comic" className="text-apple-gray-500 hover:text-apple-blue transition-colors">漫画生成</a></li>
                  <li><a href="/ppt" className="text-apple-gray-500 hover:text-apple-blue transition-colors">PPT生成</a></li>
                  <li><a href="/infographic" className="text-apple-gray-500 hover:text-apple-blue transition-colors">信息图生成</a></li>
                  <li><a href="/architecture" className="text-apple-gray-500 hover:text-apple-blue transition-colors">架构图生成</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-apple-gray-900 mb-4">关于</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-apple-gray-500 hover:text-apple-blue transition-colors">关于我们</a></li>
                  <li><a href="/contact" className="text-apple-gray-500 hover:text-apple-blue transition-colors">联系我们</a></li>
                  <li><a href="/privacy" className="text-apple-gray-500 hover:text-apple-blue transition-colors">隐私政策</a></li>
                  <li><a href="/terms" className="text-apple-gray-500 hover:text-apple-blue transition-colors">服务条款</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-apple-gray-200 text-center">
              <p className="text-apple-gray-400">© 2026 AWKN. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
