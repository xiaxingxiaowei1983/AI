import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const dynamic = 'force-dynamic';

// 导出为 Word 文档
async function exportToWord(script: any): Promise<Buffer> {
  const children: any[] = [];

  // 添加标题
  children.push(
    new Paragraph({
      text: "认知脚本",
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 }
    })
  );

  // 遍历六段式结构
  const sections = ['名', '道', '法', '术', '器', '例'];

  for (const section of sections) {
    const content = script[section];
    if (!content) continue;

    // 添加章节标题
    children.push(
      new Paragraph({
        text: section,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 150 }
      })
    );

    // 添加内容
    if (typeof content === 'string') {
      const paragraphs = content.split('\n').filter(p => p.trim());
      paragraphs.forEach(p => {
        children.push(new Paragraph({ text: p, spacing: { after: 120 } }));
      });
    } else if (typeof content === 'object') {
      // 处理"名"部分的对象结构
      if (section === '名') {
        if (content['核心命题']) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: '核心命题: ', bold: true }), new TextRun(content['核心命题'])],
              spacing: { after: 120 }
            })
          );
        }
        if (content['核心观点']) {
          children.push(new Paragraph({
            children: [new TextRun({ text: '核心观点:', bold: true })],
            spacing: { after: 120 }
          }));
          content['核心观点'].forEach((view: string) => {
            children.push(new Paragraph({ text: `• ${view}`, spacing: { after: 80 } }));
          });
        }
        if (content['核心价值']) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: '核心价值: ', bold: true }), new TextRun(content['核心价值'])],
              spacing: { after: 120 }
            })
          );
        }
        if (content['适用场景']) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: '适用场景: ', bold: true }), new TextRun(content['适用场景'])],
              spacing: { after: 120 }
            })
          );
        }
      }
    }
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });

  return await Packer.toBuffer(doc);
}

// 导出为 PDF 文档
async function exportToPDF(script: any): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  let yPosition = height - 50;

  // 添加标题
  page.drawText('认知脚本', {
    x: 50,
    y: yPosition,
    size: 24,
    font: font,
    color: rgb(0, 0, 0)
  });
  yPosition -= 40;

  // 遍历六段式结构
  const sections = ['名', '道', '法', '术', '器', '例'];

  for (const section of sections) {
    const content = script[section];
    if (!content) continue;

    // 添加章节标题
    page.drawText(section, {
      x: 50,
      y: yPosition,
      size: 18,
      font: font,
      color: rgb(0, 0, 0)
    });
    yPosition -= 30;

    // 添加内容
    let text = '';
    if (typeof content === 'string') {
      text = content;
    } else if (typeof content === 'object' && section === '名') {
      text = `核心命题: ${content['核心命题'] || ''}\n`;
      if (content['核心观点']) {
        text += `核心观点:\n${content['核心观点'].map((v: string) => `• ${v}`).join('\n')}\n`;
      }
      text += `核心价值: ${content['核心价值'] || ''}\n`;
      text += `适用场景: ${content['适用场景'] || ''}`;
    }

    const lines = text.split('\n');
    for (const line of lines) {
      if (yPosition < 50) {
        page = pdfDoc.addPage();
        yPosition = height - 50;
      }
      page.drawText(line, {
        x: 70,
        y: yPosition,
        size: 12,
        font: font,
        color: rgb(0, 0, 0)
      });
      yPosition -= 20;
    }
    yPosition -= 20;
  }

  return Buffer.from(await pdfDoc.save());
}

// 导出为 Markdown
async function exportToMarkdown(script: any): Promise<string> {
  let markdown = '# 认知脚本\n\n';

  const sections = ['名', '道', '法', '术', '器', '例'];

  for (const section of sections) {
    const content = script[section];
    if (!content) continue;

    markdown += `## ${section}\n\n`;

    if (typeof content === 'string') {
      markdown += content + '\n\n';
    } else if (typeof content === 'object' && section === '名') {
      if (content['核心命题']) {
        markdown += `**核心命题**: ${content['核心命题']}\n\n`;
      }
      if (content['核心观点']) {
        markdown += `**核心观点**:\n`;
        content['核心观点'].forEach((view: string) => {
          markdown += `- ${view}\n`;
        });
        markdown += '\n';
      }
      if (content['核心价值']) {
        markdown += `**核心价值**: ${content['核心价值']}\n\n`;
      }
      if (content['适用场景']) {
        markdown += `**适用场景**: ${content['适用场景']}\n\n`;
      }
    }
  }

  return markdown;
}

// 导出 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { script, format } = body;

    if (!script) {
      return NextResponse.json({ error: '缺少script参数' }, { status: 400 });
    }

    if (!format || !['pdf', 'word', 'markdown'].includes(format)) {
      return NextResponse.json({ error: '不支持的导出格式' }, { status: 400 });
    }

    let buffer: Buffer | string;
    let mimeType: string;
    let filename: string;

    switch (format) {
      case 'word':
        buffer = await exportToWord(script);
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        filename = '认知脚本.docx';
        break;
      case 'pdf':
        buffer = Buffer.from(await exportToPDF(script));
        mimeType = 'application/pdf';
        filename = '认知脚本.pdf';
        break;
      case 'markdown':
        buffer = Buffer.from(await exportToMarkdown(script));
        mimeType = 'text/markdown';
        filename = '认知脚本.md';
        break;
      default:
        return NextResponse.json({ error: '不支持的导出格式' }, { status: 400 });
    }

    return new NextResponse(buffer as BodyInit, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`
      }
    });
  } catch (error: any) {
    console.error('[导出] 错误:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
