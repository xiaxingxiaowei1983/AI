/**
 * 类型定义
 */

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Work {
  id: string;
  title: string;
  type: 'comic' | 'ppt' | 'infographic' | 'architecture';
  userId: string;
  thumbnail: string;
  images?: string[];
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
  parameters?: Record<string, any>;
}

export interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

export interface ComicGenerationParams {
  story: string;
  artStyle?: string;
  pageCount: number;
}

export interface PPTGenerationParams {
  content: string;
  style: string;
  slideCount: number;
}

export interface InfographicGenerationParams {
  content: string;
  data?: string;
  style: string;
}

export interface ArchitectureGenerationParams {
  description: string;
  type: string;
  style: string;
}

export interface AuthRegisterParams {
  username: string;
  email: string;
  password: string;
}

export interface AuthLoginParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}
