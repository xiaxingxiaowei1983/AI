/* eslint-disable */
// This file was generated and will be overwritten

export interface DataModel {
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
}