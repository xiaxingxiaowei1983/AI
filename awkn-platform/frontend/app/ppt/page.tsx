'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Presentation, FileText, Download, Trash2, Loader2, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function PPTPage() {
  const [formData, setFormData] = useState({
    content: '',
    style: 'modern',
    slideCount: 10,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSlides, setGeneratedSlides] = useState<string[]>([])
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGenerate = async () => {
    if (!formData.content.trim()) {
      setError('请输入内容')
      return
    }

    setIsGenerating(true)
    setError('')
    setGeneratedSlides([])

    try {
      const response = await fetch('/api/generate/ppt', {
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
      setGeneratedSlides(data.slides || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = (slideUrl: string, index: number) => {
    const link = document.createElement('a')
    link.href = slideUrl
    link.download = `slide-${index + 1}.png`
    link.click()
  }

  const handleDelete = (index: number) => {
    setGeneratedSlides(prev => prev.filter((_, i) => i !== index))
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
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI PPT生成
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-apple-gray-900 mb-6">
              PPT生成
            </h1>
            <p className="text-xl text-apple-gray-500 max-w-2xl mx-auto">
              将内容转换为专业的PPT演示文稿，支持多种视觉风格
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
              {/* Content Input */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-3">
                  内容 *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="输入要生成PPT的内容，可以是大纲、文章或演讲稿..."
                  className="apple-input min-h-[200px] resize-none"
                  rows={6}
                />
              </div>

              {/* Style Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-3">
                  视觉风格
                </label>
                <select
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  className="apple-input"
                >
                  <option value="modern">现代简约</option>
                  <option value="business">商务专业</option>
                  <option value="creative">创意活泼</option>
                  <option value="tech">科技未来</option>
                  <option value="elegant">优雅经典</option>
                </select>
              </div>

              {/* Slide Count */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-3">
                  幻灯片数量：{formData.slideCount} 页
                </label>
                <input
                  type="range"
                  name="slideCount"
                  min="5"
                  max="30"
                  value={formData.slideCount}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-apple-gray-200 rounded-lg appearance-none cursor-pointer accent-apple-blue"
                />
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
                    <Presentation className="mr-2 w-5 h-5" />
                    开始生成PPT
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          {generatedSlides.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-apple-gray-900 mb-8">
                生成结果
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedSlides.map((slide, index) => (
                  <div
                    key={index}
                    className="apple-card relative group"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-apple-gray-100">
                      <img
                        src={slide}
                        alt={`幻灯片${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleDownload(slide, index)}
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
