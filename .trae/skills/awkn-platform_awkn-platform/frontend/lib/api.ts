/**
 * API配置和工具函数
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

/**
 * 封装fetch请求，处理错误和认证
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
}

/**
 * 漫画生成API
 */
export const comicAPI = {
  generate: (data: {
    story: string;
    artStyle?: string;
    pageCount: number;
  }) =>
    fetchAPI('/generate/comic', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

/**
 * PPT生成API
 */
export const pptAPI = {
  generate: (data: {
    content: string;
    style: string;
    slideCount: number;
  }) =>
    fetchAPI('/generate/ppt', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

/**
 * 信息图生成API
 */
export const infographicAPI = {
  generate: (data: {
    content: string;
    data?: string;
    style: string;
  }) =>
    fetchAPI('/generate/infographic', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

/**
 * 架构图生成API
 */
export const architectureAPI = {
  generate: (data: {
    description: string;
    type: string;
    style: string;
  }) =>
    fetchAPI('/generate/architecture', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

/**
 * 历史作品API
 */
export const historyAPI = {
  list: (params?: {
    type?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams(
      Object.entries(params || {}).filter(([_, v]) => v !== undefined) as [string, string][]
    ).toString();
    return fetchAPI(`/history${queryParams ? `?${queryParams}` : ''}`);
  },

  delete: (id: string) =>
    fetchAPI(`/history/${id}`, {
      method: 'DELETE',
    }),
};

/**
 * 认证API
 */
export const authAPI = {
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: {
    email: string;
    password: string;
  }) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default fetchAPI;
