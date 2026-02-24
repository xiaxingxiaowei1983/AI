'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { PlusIcon } from 'lucide-react';

interface ProjectFormProps {
  onSuccess?: (project: {
    title: string;
    description: string;
    status: string;
    createdBy: string;
    dueDate?: number;
    priority: string;
  }) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('idea');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      const project = {
        title,
        description,
        status,
        createdBy: 'user1', // 这里应该从认证系统获取
        dueDate: dueDate ? dueDate.getTime() : undefined,
        priority,
      };
      
      // 触发成功回调
      if (onSuccess) {
        onSuccess(project);
      }
      
      // 重置表单
      setTitle('');
      setDescription('');
      setStatus('idea');
      setPriority('medium');
      setDueDate(undefined);
      setIsOpen(false);
    } catch (error) {
      console.error('创建项目失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <PlusIcon className="mr-2 h-4 w-4" />
          新建项目
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>创建新内容项目</DialogTitle>
          <DialogDescription>
            填写项目信息，开始内容创作流程
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入项目标题"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="输入项目描述"
              required
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">初始状态</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="选择初始状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">灵感</SelectItem>
                <SelectItem value="script">脚本</SelectItem>
                <SelectItem value="thumbnail">缩略图</SelectItem>
                <SelectItem value="filming">拍摄</SelectItem>
                <SelectItem value="publish">发布</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">优先级</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="选择优先级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="high">高</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">截止日期</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  id="dueDate"
                  className="w-full justify-start text-left font-normal"
                >
                  {dueDate ? format(dueDate, 'yyyy-MM-dd') : '选择截止日期'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
              取消
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? '创建中...' : '创建项目'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
