import { X } from 'lucide-react';
import { Button } from './ui/button';

interface Question {
  id: string;
  question_text: string;
  question_type: 'scale' | 'binary';
  tag: string | null;
  category: string;
  options: Array<{ t: string; v?: string; tag?: string; score?: number }> | null;
}

interface Answer {
  type: 'scale' | 'binary';
  tag?: string;
  value?: number;
  option?: { t: string; v?: string; tag?: string; score?: number };
}

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (answer: Answer) => void;
  onExit: () => void;
}

const QuizScreen = ({ question, questionIndex, totalQuestions, onAnswer, onExit }: QuizScreenProps) => {
  const progress = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  const scaleOptions = [
    { t: '是的，非常符合', v: 2 },
    { t: '一般 / 有时候', v: 1 },
    { t: '不是，完全不符', v: 0 }
  ];

  return (
    <section className="w-full max-w-md">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex-1 mr-4">
          <div className="flex justify-between text-xs text-primary mb-1 orbitron">
            <span>{questionIndex + 1 <= 12 ? '第一阶段：战场定位' : '第二阶段：武器校准'}</span>
            <span>{questionIndex + 1}/{totalQuestions}</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <Button
          onClick={onExit}
          variant="ghost"
          size="icon"
          className="hover:bg-destructive/20 hover:text-destructive"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="glass-panel p-6 rounded-2xl min-h-[300px] flex flex-col justify-between fade-in">
        <div>
          <span className="text-xs font-bold px-2 py-1 rounded bg-muted text-muted-foreground mb-2 inline-block">
            {question.category}
          </span>
          <h2 className="text-lg font-bold leading-relaxed mb-6 mt-2 text-foreground">
            {question.question_text}
          </h2>
        </div>
        
        <div className="space-y-3">
          {question.question_type === 'scale' ? (
            scaleOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => onAnswer({ type: 'scale', tag: question.tag, value: option.v })}
                variant="outline"
                className="w-full p-4 h-auto text-left btn-option justify-start text-sm"
              >
                {option.t}
              </Button>
            ))
          ) : (
            question.options?.map((option: { t: string; v?: string; tag?: string; score?: number }, index: number) => (
              <Button
                key={index}
                onClick={() => onAnswer({ type: 'binary', option })}
                variant="outline"
                className="w-full p-4 h-auto text-left btn-option justify-start text-sm"
              >
                {option.t}
              </Button>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizScreen;
