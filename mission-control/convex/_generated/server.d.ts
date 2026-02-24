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

export type DatabaseReader = {
  get<T extends keyof IdTable>(id: Id<T>): Promise<Document<T> | null>;
  query<T extends keyof DocumentByTable>(table: T): {
    collect(): Promise<Array<Document<T>>>;
    first(): Promise<Document<T> | null>;
    withIndex<Index extends string>(index: Index, f: (q: any) => any): {
      collect(): Promise<Array<Document<T>>>;
      first(): Promise<Document<T> | null>;
    };
    filter(f: (q: any) => any): {
      collect(): Promise<Array<Document<T>>>;
      first(): Promise<Document<T> | null>;
    };
  };
};

export type DatabaseWriter = DatabaseReader & {
  insert<T extends keyof DocumentByTable>(table: T, value: Omit<Document<T>, '_id' | '_creationTime'>): Promise<Id<T>>;
  patch<T extends keyof DocumentByTable>(id: Id<T>, value: Partial<Omit<Document<T>, '_id' | '_creationTime'>>): Promise<Id<T>>;
  delete<T extends keyof IdTable>(id: Id<T>): Promise<void>;
};

export type QueryCtx = {
  db: DatabaseReader;
};

export type MutationCtx = {
  db: DatabaseWriter;
};

export function query<Args extends any[], ReturnType>(
  f: (ctx: QueryCtx, ...args: Args) => Promise<ReturnType>
): (...args: Args) => Promise<ReturnType>;

export function mutation<Args extends any[], ReturnType>(
  f: (ctx: MutationCtx, ...args: Args) => Promise<ReturnType>
): (...args: Args) => Promise<ReturnType>;
