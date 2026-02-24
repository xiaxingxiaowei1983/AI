// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

// Content types
export interface Content {
  id: string;
  title: string;
  type: 'article' | 'social' | 'video' | 'podcast';
  status: 'draft' | 'review' | 'scheduled' | 'published';
  author: string;
  createdAt: string;
  scheduledAt?: string;
  publishedAt?: string;
  platform: string[];
  tags: string[];
  thumbnail?: string;
}

// Memory types
export interface Memory {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  tags: string[];
  category: string;
  userId: string;
}

// Team types
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  status: 'working' | 'idle' | 'stuck';
  currentTask: string;
  avatar: string;
  position: {
    row: number;
    col: number;
  };
}

// Calendar types
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  category: string;
}
