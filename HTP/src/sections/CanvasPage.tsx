import { useEffect, useState, useRef, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { 
  ChevronLeft, 
  Undo2, 
  Redo2, 
  Eraser, 
  Trash2, 
  Pencil,
  Check,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type DrawingTool = 'pen' | 'eraser';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  tool: DrawingTool;
  width: number;
}

export default function CanvasPage() {
  const { goToOnboarding, goToLoading, setUserDrawing } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTool, setCurrentTool] = useState<DrawingTool>('pen');
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  // 初始化画布
  useEffect(() => {
    setIsVisible(true);
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#2d2d2d';
        ctx.lineWidth = 3;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // 重绘画布
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

    // 绘制所有笔画
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      
      ctx.strokeStyle = stroke.tool === 'eraser' ? '#ffffff' : '#2d2d2d';
      ctx.lineWidth = stroke.width;
      ctx.stroke();
    });

    // 检查是否有内容
    setHasContent(strokes.length > 0);
  }, [strokes]);

  useEffect(() => {
    redrawCanvas();
  }, [strokes, redrawCanvas]);

  // 获取画布坐标
  const getCanvasPoint = (e: React.TouchEvent | React.MouseEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // 开始绘制
  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const point = getCanvasPoint(e);
    if (!point) return;

    setIsDrawing(true);
    const newStroke: Stroke = {
      points: [point],
      tool: currentTool,
      width: currentTool === 'eraser' ? 20 : 3
    };
    setCurrentStroke(newStroke);
  };

  // 绘制中
  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing || !currentStroke) return;
    e.preventDefault();

    const point = getCanvasPoint(e);
    if (!point) return;

    const updatedStroke = {
      ...currentStroke,
      points: [...currentStroke.points, point]
    };
    setCurrentStroke(updatedStroke);

    // 实时绘制到画布
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastPoint = currentStroke.points[currentStroke.points.length - 1];
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : '#2d2d2d';
    ctx.lineWidth = currentTool === 'eraser' ? 20 : 3;
    ctx.stroke();
  };

  // 结束绘制
  const endDrawing = () => {
    if (!isDrawing || !currentStroke) return;
    
    setIsDrawing(false);
    if (currentStroke.points.length > 1) {
      setStrokes(prev => [...prev, currentStroke]);
      setRedoStack([]); // 清空重做栈
    }
    setCurrentStroke(null);
  };

  // 撤销
  const handleUndo = () => {
    if (strokes.length === 0) return;
    const lastStroke = strokes[strokes.length - 1];
    setRedoStack(prev => [...prev, lastStroke]);
    setStrokes(prev => prev.slice(0, -1));
  };

  // 重做
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const strokeToRedo = redoStack[redoStack.length - 1];
    setStrokes(prev => [...prev, strokeToRedo]);
    setRedoStack(prev => prev.slice(0, -1));
  };

  // 清空
  const handleClear = () => {
    if (strokes.length === 0) return;
    setRedoStack([]);
    setStrokes([]);
  };

  // 完成绘制
  const handleComplete = () => {
    if (!hasContent) {
      alert('请先画出房子、树和人哦~');
      return;
    }
    setShowConfirmDialog(true);
  };

  // 确认提交
  const handleConfirmSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 获取画布尺寸
    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // 创建临时画布，绘制当前内容
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      // 绘制当前画布内容
      tempCtx.drawImage(canvas, 0, 0, width, height);

      // 获取图像数据
      const imageData = tempCtx.getImageData(0, 0, width, height).data;
      let hasContent = false;
      let contentCount = 0;

      // 检查是否有绘制内容
      for (let i = 0; i < imageData.length; i += 4) {
        const alpha = imageData[i + 3];
        if (alpha > 0) {
          contentCount++;
          if (contentCount > 100) { // 需要至少100个非透明像素
            hasContent = true;
            break;
          }
        }
      }

      if (!hasContent) {
        alert('请画出更多内容，确保包含房子、树和人哦~');
        return;
      }
    }

    const imageData = canvas.toDataURL('image/png');
    setUserDrawing({
      imageData,
      method: 'draw',
      timestamp: Date.now()
    });
    setShowConfirmDialog(false);
    goToLoading();
  };

  return (
    <div className="min-h-screen watercolor-bg relative overflow-hidden flex flex-col">
      {/* 顶部导航 */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3">
        <button
          onClick={goToOnboarding}
          className="p-2 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <div className="gold-card px-4 py-2">
          <span className="text-sm font-medium text-foreground">
            请画出：房子、树、人
          </span>
        </div>
        
        <div className="w-9" /> {/* 占位 */}
      </div>

      {/* 画布区域 */}
      <div 
        ref={containerRef}
        className={`flex-1 mx-4 mb-4 gold-card overflow-hidden transition-all duration-800 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
      </div>

      {/* 工具栏 */}
      <div 
        className={`relative z-20 px-4 pb-6 transition-all duration-800 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* 工具按钮 */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="tool-btn disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Undo2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className="tool-btn disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Redo2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setCurrentTool('pen')}
            className={`tool-btn ${currentTool === 'pen' ? 'active' : ''}`}
          >
            <Pencil className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setCurrentTool('eraser')}
            className={`tool-btn ${currentTool === 'eraser' ? 'active' : ''}`}
          >
            <Eraser className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleClear}
            disabled={strokes.length === 0}
            className="tool-btn disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* 完成按钮 */}
        <button
          onClick={handleComplete}
          className={`w-full gradient-btn py-4 flex items-center justify-center gap-2 ${
            hasContent ? '' : 'opacity-60'
          }`}
        >
          <Check className="w-5 h-5" />
          完成绘制
        </button>
      </div>

      {/* 确认对话框 */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="gold-card border-0 max-w-sm">
          <DialogHeader className="text-center">
            <DialogTitle className="font-serif text-xl text-gradient">
              绘制完成了吗？
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-2">
              这幅画将成为通往你内心的钥匙。
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowConfirmDialog(false)}
              className="flex-1 secondary-btn py-3 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              再改改
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="flex-1 gradient-btn py-3 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              开始分析
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
