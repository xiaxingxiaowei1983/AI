/* eslint-disable */
// This file was generated and will be overwritten
import type { DataModel } from './dataModel';

export type DocumentByTable = {
  tasks: {
    _id: string;
    _creationTime: number;
    title: string;
    start: number;
    end: number;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in_progress' | 'completed';
  };
};

export type IdTable = {
  tasks: string;
};

export type Id<T extends keyof IdTable> = IdTable[T];

export type Document<T extends keyof DocumentByTable> = DocumentByTable[T];

export type QueryNames = {
  tasks: {
    getAllTasks: [];
    getTaskById: [{ id: Id<'tasks'> }];
    getTasksByStatus: [{ status: 'pending' | 'in_progress' | 'completed' }];
    getTasksByPriority: [{ priority: 'low' | 'medium' | 'high' }];
    getTasksInRange: [{ start: number; end: number }];
  };
};

export type MutationNames = {
  tasks: {
    createTask: [{ title: string; start: number; end: number; description: string; priority: 'low' | 'medium' | 'high'; status: 'pending' | 'in_progress' | 'completed' }];
    updateTask: [{ id: Id<'tasks'>; title: string; start: number; end: number; description: string; priority: 'low' | 'medium' | 'high'; status: 'pending' | 'in_progress' | 'completed' }];
    deleteTask: [{ id: Id<'tasks'> }];
  };
};

export type ActionNames = {};

export type HttpEndpointNames = {};

export interface ConvexClient {
  query<Q extends keyof QueryNames['tasks']>(name: Q, ...args: QueryNames['tasks'][Q]): Promise<any>;
  mutation<M extends keyof MutationNames['tasks']>(name: M, ...args: MutationNames['tasks'][M]): Promise<any>;
  action<A extends keyof ActionNames>(name: A, ...args: any[]): Promise<any>;
  clearCache(): void;
  close(): void;
}

export function createClient(options: { url: string }): ConvexClient;
