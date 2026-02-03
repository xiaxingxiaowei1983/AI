import { Question, Archetype } from '../types/hero';

export const QUESTIONS: Question[] = []; // 数据库驱动，本地留空或作为兜底

export const ARCHETYPES: Record<string, Archetype> = {
    'R': { title: '先锋特工', desc: '行动力强，适合动手实践类工作。' },
    'I': { title: '真理贤者', desc: '逻辑思维强，适合研究探索类工作。' },
    'A': { title: '造梦幻术师', desc: '创造力强，适合艺术设计类工作。' },
    'S': { title: '圣光牧师', desc: '共情能力强，适合帮助服务类工作。' },
    'E': { title: '荣耀统帅', desc: '领导力强，适合管理协调类工作。' },
    'C': { title: '秩序执行官', desc: '执行力强，适合规划管理类工作。' }
};
