export interface Question {
  q: string;
  type: 'scale' | 'binary';
  tag?: string;
  cat: string;
  opts?: Option[];
}

export interface Option {
  t: string;
  v?: string;
  tag?: string;
  score?: number;
}

export interface Archetype {
  title: string;
  desc: string;
}

export interface Scores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface TestResult {
  heroType: string;
  heroTitle: string;
  heroDesc: string;
  mbtiType: string;
  scores: Scores;
  advice: string;
}
