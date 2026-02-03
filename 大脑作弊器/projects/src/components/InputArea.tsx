'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, Link2, Image as ImageIcon, FileText, ArrowRight } from 'lucide-react';

interface InputAreaProps {
  onSubmit: (data: { type: 'file' | 'url' | 'image'; content: string | File }) => void;
}

export function InputArea({ onSubmit }: InputAreaProps) {
  const [inputType, setInputType] = useState<'file' | 'url' | 'image'>('file');
  const [urlValue, setUrlValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf' || 
        file.type === 'application/epub+zip' ||
        file.type === 'text/plain' ||
        file.name.endsWith('.epub')) {
      setSelectedFile(file);
    } else {
      alert('仅支持 PDF、EPUB、TXT 文件');
    }
  };

  const handleImageSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      alert('仅支持图片文件');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      if (inputType === 'image') {
        handleImageSelect(files[0]);
      } else {
        handleFileSelect(files[0]);
      }
    }
  };

  const handleSubmit = async () => {
    if (inputType === 'url' && urlValue) {
      onSubmit({ type: 'url', content: urlValue });
    } else if (inputType === 'file' && selectedFile) {
      // 将文件转换为base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onSubmit({ type: 'file', content: base64 });
      };
      reader.readAsDataURL(selectedFile);
    } else if (inputType === 'image' && selectedFile) {
      // 图片已经在imagePreview中存储为base64
      if (imagePreview) {
        onSubmit({ type: 'image', content: imagePreview });
      }
    } else {
      alert('请输入内容');
    }
  };

  return (
    <div className="space-y-6">
      {/* 输入类型选择 */}
      <div className="flex gap-2 justify-center">
        <Button
          variant={inputType === 'file' ? 'default' : 'outline'}
          onClick={() => setInputType('file')}
          className="flex-1 max-w-[150px]"
        >
          <FileText className="w-4 h-4 mr-2" />
          文件
        </Button>
        <Button
          variant={inputType === 'url' ? 'default' : 'outline'}
          onClick={() => setInputType('url')}
          className="flex-1 max-w-[150px]"
        >
          <Link2 className="w-4 h-4 mr-2" />
          链接
        </Button>
        <Button
          variant={inputType === 'image' ? 'default' : 'outline'}
          onClick={() => setInputType('image')}
          className="flex-1 max-w-[150px]"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          截图
        </Button>
      </div>

      {/* 输入区域 */}
      <Card className="p-8">
        {inputType === 'url' && (
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="粘贴网页链接..."
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              className="text-lg h-12"
            />
          </div>
        )}

        {(inputType === 'file' || inputType === 'image') && (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
              isDragging 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                : 'border-slate-300 dark:border-slate-700 hover:border-blue-400'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => {
              if (inputType === 'image') {
                imageInputRef.current?.click();
              } else {
                fileInputRef.current?.click();
              }
            }}
          >
            {inputType === 'image' && imagePreview ? (
              <div className="space-y-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-muted-foreground">
                  点击重新选择图片
                </p>
              </div>
            ) : selectedFile ? (
              <div className="space-y-4">
                <FileText className="w-16 h-16 mx-auto text-blue-500" />
                <div>
                  <p className="font-medium text-lg">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  点击重新选择文件
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 mx-auto text-slate-400" />
                <div>
                  <p className="font-medium text-lg">
                    {inputType === 'image' ? '拖拽图片到这里' : '拖拽文件到这里'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    或点击选择文件
                  </p>
                  <p className="text-xs text-muted-foreground mt-4">
                    {inputType === 'image' 
                      ? '支持 JPG、PNG、WEBP 格式' 
                      : '支持 PDF、EPUB、TXT 格式'}
                  </p>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.epub,.txt"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />
            <input
              ref={imageInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageSelect(e.target.files[0]);
                }
              }}
            />
          </div>
        )}

        {/* 提交按钮 */}
        <div className="mt-6 flex justify-end">
          <Button 
            size="lg" 
            onClick={handleSubmit}
            disabled={
              (inputType === 'url' && !urlValue) ||
              (inputType !== 'url' && !selectedFile)
            }
            className="h-12 px-8"
          >
            开始脱水
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
