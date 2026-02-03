'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Download, Trash2, Loader2, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function ArchitecturePage() {
  const [formData, setFormData] = useState({
    description: '',
    type: 'flowchart',
    style: 'modern',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDiagrams, setGeneratedDiagrams] = useState<string[]>([])
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGenerate = async () => {
    if (!formData.description.trim()) {
      setError('请输入架构描述')
      return
    }

    setIsGenerating(true)
    setError('')
    setGeneratedDiagrams([])

    try {
      const response = await fetch('/api/generate/architecture', {
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
      setGeneratedDiagrams(data.diagrams || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `architecture-${index + 1}.png`
    link.click()
  }

  const handleDelete = (index: number) => {
    setGeneratedDiagrams(prev => prev.filter((_, i) => i !== index))
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
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI架构图生成
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-apple-gray-900 mb-6">
              架构图生成
            </h1>
            <p className="text-xl text-apple-gray-500 max-w-2xl mx-auto">
              生成系统架构图、流程图等专业图表
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
              {/* Description Input */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-3">
                  架构描述 *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="描述要生成的架构图内容和结构..."
                  className="apple-input min-h-[200px] resize-none"
                  rows={6}
                />
              </div>

              {/* Type Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-3">
                  图表类型
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="apple-input"
                >
                  <option value="flowchart">流程图</option>
                  <option value="architecture">系统架构图</option>
                  <option value="sequence">时序图</option>
                  <option value="mindmap">思维导图</option>
                  <option value="organization">组织结构图</option>
                </select>
              </div>

              {/* Style Selection */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-apple-gray-900 mb-3">
                  设计风格
                </label>
                <select
                  name="style"
                  value={formData.style}
                  onChange={handleInputChange}
                  className="apple-input"
                >
                  <option value="modern">现代简约</option>
                  <option value="minimal">极简主义</option>
                  <option value="technical">技术专业</option>
                  <option value="elegant">优雅风格</option>
                </select>
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
                    <GitBranch className="mr-2 w-5 h-5" />
                    开始生成架构图
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          {generatedDiagrams.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-7xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-apple-gray-900 mb-8">
                生成结果
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generatedDiagrams.map((diagram, index) => (
                  <div
                    key={index}
                    className="apple-card relative group"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-apple-gray-100">
                      <img
                        src={diagram}
                        alt={`架构图${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleDownload(diagram, index)}
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
                        架构图 {index + 1}
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
