'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, BookOpen, Presentation, BarChart3, GitBranch, History, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      title: '漫画生成',
      description: '输入故事内容，AI自动拆分场景并生成连续风格的漫画',
      icon: BookOpen,
      href: '/comic',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'PPT生成',
      description: '将内容转换为专业的PPT演示文稿，支持多种视觉风格',
      icon: Presentation,
      href: '/ppt',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: '信息图生成',
      description: '将数据和信息可视化为精美的信息图',
      icon: BarChart3,
      href: '/infographic',
      color: 'from-green-500 to-green-600',
    },
    {
      title: '架构图生成',
      description: '生成系统架构图、流程图等专业图表',
      icon: GitBranch,
      href: '/architecture',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-apple-gray-900 mb-6 tracking-tight">
              认知觉醒
              <span className="block mt-2 text-apple-blue">从内容创作开始</span>
            </h1>
            <p className="text-xl sm:text-2xl text-apple-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
              AWKN 帮助他人做认知觉醒的平台，通过AI赋能内容创作，让创意无限延伸
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/comic"
                className="apple-button apple-button-primary text-lg px-8 py-4"
              >
                开始创作
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/history"
                className="apple-button apple-button-secondary text-lg px-8 py-4"
              >
                查看作品
                <History className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-apple-gray-900 mb-6">
              强大的AI创作工具
            </h2>
            <p className="text-xl text-apple-gray-500 max-w-2xl mx-auto">
              一站式内容创作平台，满足你的所有创作需求
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="apple-card p-8 h-full apple-shadow hover:apple-shadow-lg cursor-pointer group">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-apple-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-apple-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 flex items-center text-apple-blue font-medium group-hover:translate-x-2 transition-transform">
                      立即体验
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-apple-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '累计生成', value: '100万+' },
              { label: '活跃用户', value: '5万+' },
              { label: '作品类型', value: '4种' },
              { label: '满意度', value: '98%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl sm:text-6xl font-bold text-apple-blue mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-apple-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-apple-blue to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              开启你的创作之旅
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              加入AWKN，体验AI赋能的创作乐趣，让你的创意无限延伸
            </p>
            <Link
              href="/comic"
              className="inline-flex items-center px-8 py-4 bg-white text-apple-blue font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              立即开始
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
