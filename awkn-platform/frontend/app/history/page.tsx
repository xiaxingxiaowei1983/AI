'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { History, BookOpen, Presentation, BarChart3, GitBranch, Trash2, Download, Calendar, Filter } from 'lucide-react'
import Navigation from '@/components/Navigation'

interface Work {
  id: string
  title: string
  type: 'comic' | 'ppt' | 'infographic' | 'architecture'
  thumbnail: string
  createdAt: string
}

const typeIcons = {
  comic: BookOpen,
  ppt: Presentation,
  infographic: BarChart3,
  architecture: GitBranch,
}

const typeNames = {
  comic: '漫画',
  ppt: 'PPT',
  infographic: '信息图',
  architecture: '架构图',
}

const typeColors = {
  comic: 'from-blue-500 to-blue-600',
  ppt: 'from-purple-500 to-purple-600',
  infographic: 'from-green-500 to-green-600',
  architecture: 'from-orange-500 to-orange-600',
}

export default function HistoryPage() {
  const [works, setWorks] = useState<Work[]>([])
  const [filter, setFilter] = useState<'all' | 'comic' | 'ppt' | 'infographic' | 'architecture'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟加载历史作品
    const mockWorks: Work[] = [
      {
        id: '1',
        title: '科幻漫画 - 星际旅行',
        type: 'comic',
        thumbnail: '/mock/comic-1.jpg',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        title: '产品发布会PPT',
        type: 'ppt',
        thumbnail: '/mock/ppt-1.jpg',
        createdAt: '2024-01-14',
      },
      {
        id: '3',
        title: '市场数据分析信息图',
        type: 'infographic',
        thumbnail: '/mock/info-1.jpg',
        createdAt: '2024-01-13',
      },
      {
        id: '4',
        title: '微服务架构图',
        type: 'architecture',
        thumbnail: '/mock/arch-1.jpg',
        createdAt: '2024-01-12',
      },
      {
        id: '5',
        title: '都市爱情漫画',
        type: 'comic',
        thumbnail: '/mock/comic-2.jpg',
        createdAt: '2024-01-11',
      },
      {
        id: '6',
        title: '年度总结PPT',
        type: 'ppt',
        thumbnail: '/mock/ppt-2.jpg',
        createdAt: '2024-01-10',
      },
    ]

    setTimeout(() => {
      setWorks(mockWorks)
      setLoading(false)
    }, 500)
  }, [])

  const filteredWorks = filter === 'all' ? works : works.filter(work => work.type === filter)

  const handleDelete = (id: string) => {
    setWorks(prev => prev.filter(work => work.id !== id))
  }

  const handleDownload = (work: Work) => {
    // 模拟下载
    const link = document.createElement('a')
    link.href = work.thumbnail
    link.download = `${work.title}.png`
    link.click()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-apple-gray-50">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-apple-blue/10 text-apple-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <History className="w-4 h-4" />
              历史作品
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-apple-gray-900 mb-6">
              我的作品
            </h1>
            <p className="text-xl text-apple-gray-500 max-w-2xl mx-auto">
              查看和管理您的所有创作作品
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-apple-blue text-white shadow-lg'
                    : 'bg-white text-apple-gray-600 hover:bg-apple-gray-100'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setFilter('comic')}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filter === 'comic'
                    ? 'bg-apple-blue text-white shadow-lg'
                    : 'bg-white text-apple-gray-600 hover:bg-apple-gray-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                漫画
              </button>
              <button
                onClick={() => setFilter('ppt')}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filter === 'ppt'
                    ? 'bg-apple-blue text-white shadow-lg'
                    : 'bg-white text-apple-gray-600 hover:bg-apple-gray-100'
                }`}
              >
                <Presentation className="w-4 h-4" />
                PPT
              </button>
              <button
                onClick={() => setFilter('infographic')}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filter === 'infographic'
                    ? 'bg-apple-blue text-white shadow-lg'
                    : 'bg-white text-apple-gray-600 hover:bg-apple-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                信息图
              </button>
              <button
                onClick={() => setFilter('architecture')}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  filter === 'architecture'
                    ? 'bg-apple-blue text-white shadow-lg'
                    : 'bg-white text-apple-gray-600 hover:bg-apple-gray-100'
                }`}
              >
                <GitBranch className="w-4 h-4" />
                架构图
              </button>
            </div>
          </motion.div>

          {/* Works Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-16 h-16 border-4 border-apple-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredWorks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Filter className="w-16 h-16 text-apple-gray-300 mx-auto mb-4" />
              <p className="text-xl text-apple-gray-500">暂无作品</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredWorks.map((work, index) => {
                const Icon = typeIcons[work.type]
                return (
                  <div
                    key={work.id}
                    className="apple-card relative group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[3/4] overflow-hidden bg-apple-gray-100">
                      <img
                        src={work.thumbnail}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${typeColors[work.type]} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleDownload(work)}
                        className="p-3 bg-white rounded-full hover:bg-apple-gray-100 transition-colors"
                        title="下载"
                      >
                        <Download className="w-5 h-5 text-apple-gray-900" />
                      </button>
                      <button
                        onClick={() => handleDelete(work.id)}
                        className="p-3 bg-white rounded-full hover:bg-red-50 transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <h3 className="text-white font-semibold text-lg mb-1 truncate">
                        {work.title}
                      </h3>
                      <div className="flex items-center gap-1 text-white/70 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(work.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
