'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Sparkles, Download, Trash2, Loader2 } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function ComicPage() {
  const [formData, setFormData] = useState({
    story: '',
    artStyle: '',
    pageCount: 1,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePageCountChange = (count: number) => {
    setFormData(prev => ({ ...prev, pageCount: count }))
  }

  const handleGenerate = async () => {
    if (!formData.story.trim()) {
      setError('请输入故事内容')
      return
    }

    setIsGenerating(true)
    setError('')
    setGeneratedImages([])

    try {
      const response = await fetch('/api/generate/comic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('生成失败，请稍后重试')
      }

      const data = await response.json()
      setGeneratedImages(data.images || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `comic-${index + 1}.png`
    link.click()
  }

  const handleDelete = (index: number) => {
    setGeneratedImages(prev => prev.filter((_, i) => i !== index))
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-apple-blue/10 text-apple-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI漫画生成
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-apple-gray-900 mb-6">
              漫画生成
            </h1>
            <p className="text-xl text-apple-gray-500 max-w-2xl mx-auto">
              输入故事内容，AI会自动拆分场景并生成连续风格的漫画
            </p>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white rounded-3xl p-8 apple-shadow">
              {/* Story Input */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-3">
                  故事内容 *
                </label>
                <textarea
                  name="story"
                  value={formData.story}
                  onChange={handleInputChange}
                  placeholder="输入你的故事内容，AI会自动拆分场景生成漫画..."
                  className="apple-input min-h-[200px] resize-none"
                  rows={6}
                />
              </div>

              {/* Art Style Input */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-3">
                  画风描述（选填）
                </label>
                <input
                  type="text"
                  name="artStyle"
                  value={formData.artStyle}
                  onChange={handleInputChange}
                  placeholder="例如：日式动漫风格、水墨画风格、赛博朋克风格..."
                  className="apple-input"
                />
              </div>

              {/* Page Count Selector */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-4">
                  漫画页数
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                    <button
                      key={count}
                      onClick={() => handlePageCountChange(count)}
                      className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                        formData.pageCount === count
                          ? 'bg-apple-blue text-white shadow-lg scale-105'
                          : 'bg-apple-gray-100 text-apple-gray-600 hover:bg-apple-gray-200'
                      }`}
                    >
                      {count} 页
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  {error}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full apple-button apple-button-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 w-5 h-5" />
                    开始生成漫画
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          {generatedImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-apple-gray-900 mb-8">
                生成结果
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {generatedImages.map((image, index) => (
                  <div
                    key={index}
                    className="apple-card relative group"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-apple-gray-100">
                      <img
                        src={image}
                        alt={`漫画第${index + 1}页`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleDownload(image, index)}
                        className="p-3 bg-white rounded-full hover:bg-apple-gray-100 transition-colors"
                        title="下载"
                      >
                        <Download className="w-5 h-5 text-apple-gray-900" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-3 bg-white rounded-full hover:bg-red-50 transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-white font-medium">
                        第 {index + 1} 页
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
