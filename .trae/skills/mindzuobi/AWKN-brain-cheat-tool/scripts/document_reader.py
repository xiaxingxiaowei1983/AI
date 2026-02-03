#!/usr/bin/env python3
"""
文档读取器 - 支持多种文档格式的文本提取

使用方法：
    python document_reader.py --file <文件路径>

支持的格式：
    - PDF (.pdf)
    - DOCX (.docx)
    - TXT (.txt)
    - EPUB (.epub)
"""

import argparse
import os
import sys


def read_pdf(file_path):
    """读取PDF文件并提取文本"""
    try:
        import PyPDF2
        text = []
        with open(file_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text.append(page.extract_text())
        return '\n'.join(text)
    except ImportError:
        raise ImportError("缺少 PyPDF2 库，请运行：pip install PyPDF2")


def read_docx(file_path):
    """读取DOCX文件并提取文本"""
    try:
        from docx import Document
        doc = Document(file_path)
        text = []
        for para in doc.paragraphs:
            text.append(para.text)
        return '\n'.join(text)
    except ImportError:
        raise ImportError("缺少 python-docx 库，请运行：pip install python-docx")


def read_txt(file_path):
    """读取TXT文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except UnicodeDecodeError:
        # 尝试其他编码
        try:
            with open(file_path, 'r', encoding='gbk') as f:
                return f.read()
        except:
            raise ValueError("无法解码文件，请检查文件编码")


def read_epub(file_path):
    """读取EPUB文件并提取文本"""
    try:
        from ebooklib import epub
        book = epub.read_epub(file_path)
        text = []
        for item in book.get_items():
            if item.get_type() == 9:  # EPUB item type for XHTML
                content = item.get_content().decode('utf-8')
                # 简单去除HTML标签（实际场景可能需要更复杂的处理）
                import re
                text_content = re.sub('<[^<]+?>', '', content)
                text.append(text_content)
        return '\n'.join(text)
    except ImportError:
        raise ImportError("缺少 ebooklib 库，请运行：pip install ebooklib")


def read_document(file_path):
    """
    根据文件扩展名自动选择读取方法

    Args:
        file_path (str): 文档文件路径

    Returns:
        str: 提取的文本内容

    Raises:
        FileNotFoundError: 文件不存在
        ValueError: 不支持的文件格式
    """
    # 检查文件是否存在
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"文件不存在: {file_path}")

    # 获取文件扩展名
    _, ext = os.path.splitext(file_path)
    ext = ext.lower()

    # 根据扩展名选择读取方法
    readers = {
        '.pdf': read_pdf,
        '.docx': read_docx,
        '.txt': read_txt,
        '.epub': read_epub,
    }

    reader = readers.get(ext)
    if reader is None:
        raise ValueError(f"不支持的文件格式: {ext}，支持的格式: {', '.join(readers.keys())}")

    # 读取文件
    text = reader(file_path)

    # 返回清理后的文本
    return text.strip()


def main():
    """命令行入口"""
    parser = argparse.ArgumentParser(description='读取多种文档格式的文本内容')
    parser.add_argument('--file', '-f', required=True, help='文档文件路径')

    args = parser.parse_args()

    try:
        text = read_document(args.file)
        print(text)
        return 0
    except Exception as e:
        print(f"错误: {str(e)}", file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
