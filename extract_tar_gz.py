#!/usr/bin/env python3
import os
import tarfile
import gzip

def extract_tar_gz(file_path, output_dir):
    """解压.tar.gz文件"""
    # 确保输出目录存在
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"开始解压: {file_path}")
    print(f"输出目录: {output_dir}")
    
    try:
        # 先解压.gz文件
        with gzip.open(file_path, 'rb') as f_in:
            # 解压到.tar文件
            tar_file = os.path.join(output_dir, os.path.basename(file_path).replace('.gz', ''))
            with open(tar_file, 'wb') as f_out:
                f_out.write(f_in.read())
        
        # 再解压.tar文件
        with tarfile.open(tar_file, 'r') as tar:
            tar.extractall(output_dir)
        
        # 删除临时的.tar文件
        os.remove(tar_file)
        
        print("解压完成！")
        return True
    except Exception as e:
        print(f"解压失败: {e}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        print("用法: python extract_tar_gz.py <tar_gz文件路径> <输出目录>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    output_dir = sys.argv[2]
    extract_tar_gz(file_path, output_dir)
