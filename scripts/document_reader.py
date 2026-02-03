#!/usr/bin/env python3
import argparse
import os
from PyPDF2 import PdfReader
from docx import Document
from ebooklib import epub

def read_pdf(file_path):
    """读取PDF文件"""
    text = []
    with open(file_path, 'rb') as f:
        reader = PdfReader(f)
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text.append(page.extract_text())
    return '\n'.join(text)

def read_docx(file_path):
    """读取DOCX文件"""
    doc = Document(file_path)
    text = []
    for paragraph in doc.paragraphs:
        text.append(paragraph.text)
    return '\n'.join(text)

def read_txt(file_path):
    """读取TXT文件"""
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()

def read_epub(file_path):
    """读取EPUB文件"""
    book = epub.read_epub(file_path)
    text = []
    for item in book.get_items():
        if item.get_type() == epub.ITEM_DOCUMENT:
            content = item.get_content().decode('utf-8', errors='ignore')
            # 简单处理HTML内容，提取文本
            import re
            # 移除HTML标签
            clean_text = re.sub(r'<[^>]+>', '', content)
            # 移除多余空白
            clean_text = re.sub(r'\s+', ' ', clean_text).strip()
            if clean_text:
                text.append(clean_text)
    return '\n'.join(text)

def read_document(file_path):
    """根据文件扩展名读取不同格式的文档"""
    ext = os.path.splitext(file_path)[1].lower()
    
    if ext == '.pdf':
        return read_pdf(file_path)
    elif ext == '.docx':
        return read_docx(file_path)
    elif ext == '.txt':
        return read_txt(file_path)
    elif ext == '.epub':
        return read_epub(file_path)
    else:
        raise ValueError(f"不支持的文件格式: {ext}")

def main():
    parser = argparse.ArgumentParser(description='读取文档文件并提取文本内容')
    parser.add_argument('--file', required=True, help='文档文件路径')
    args = parser.parse_args()
    
    try:
        text = read_document(args.file)
        print(text)
    except Exception as e:
        print(f"错误: {e}")

if __name__ == '__main__':
    main()