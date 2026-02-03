import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const maxDuration = 120; // 2分钟

// 确保临时目录存在且有权限（豆包建议）
const TEMP_DIR = path.join(process.cwd(), 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true, mode: 0o777 });
}

// 分片上传API（豆包优化版）
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileId = formData.get('fileId') as string;
    const chunkIndex = parseInt(formData.get('chunkIndex') as string);
    const totalChunks = parseInt(formData.get('totalChunks') as string);

    // 豆包建议：校验必要参数
    if (!fileId || isNaN(chunkIndex) || isNaN(totalChunks)) {
      return NextResponse.json({
        success: false,
        error: '缺少必要参数'
      }, { status: 400 });
    }

    console.log(`[分片上传] fileId: ${fileId}, chunk: ${chunkIndex + 1}/${totalChunks}, size: ${file.size}`);

    // 豆包建议：创建文件专属的分片目录
    const chunkDir = path.join(TEMP_DIR, 'chunks', fileId);
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true, mode: 0o777 });
    }

    // 豆包建议：保存分片文件（覆盖已存在的分片，支持重试）
    const chunkPath = path.join(chunkDir, `chunk-${chunkIndex}.part`);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(chunkPath, buffer, { mode: 0o666 });

    console.log(`[分片上传] 分片已保存: ${chunkPath}`);

    // 豆包建议：统计已上传的分片数
    const uploadedChunks = fs.readdirSync(chunkDir)
      .filter(f => f.endsWith('.part'))
      .length;

    console.log(`[分片上传] 已上传 ${uploadedChunks}/${totalChunks} 个分片`);

    // 豆包建议：返回结构化成功响应
    return NextResponse.json({
      success: true,
      uploadedChunks,
      totalChunks,
      progress: (uploadedChunks / totalChunks) * 100
    });

  } catch (error: any) {
    console.error("[分片接收失败]", error);
    // 豆包建议：返回结构化错误，方便前端重试
    return NextResponse.json({
      success: false,
      error: error.message || '分片接收失败'
    }, { status: 500 });
  }
}
