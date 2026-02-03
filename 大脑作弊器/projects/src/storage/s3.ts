import { S3Storage } from "coze-coding-dev-sdk";

/**
 * 初始化S3存储实例
 */
export const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: "",
  secretKey: "",
  bucketName: process.env.COZE_BUCKET_NAME,
  region: "cn-beijing",
});

/**
 * 文件存储服务类
 */
export class FileStorageService {
  /**
   * 上传用户上传的文件（PDF、EPUB、TXT等）
   */
  async uploadUserFile(userId: string, file: Buffer, fileName: string): Promise<string> {
    const key = await storage.uploadFile({
      fileContent: file,
      fileName: `user-files/${userId}/${fileName}`,
      contentType: this.getContentType(fileName),
    });

    return key;
  }

  /**
   * 上传用户图片
   */
  async uploadUserImage(userId: string, image: Buffer, fileName: string): Promise<string> {
    const key = await storage.uploadFile({
      fileContent: image,
      fileName: `user-images/${userId}/${fileName}`,
      contentType: "image/jpeg",
    });

    return key;
  }

  /**
   * 上传脚本导出文件
   */
  async uploadScriptExport(scriptId: string, content: string, fileName: string): Promise<string> {
    const key = await storage.uploadFile({
      fileContent: Buffer.from(content, "utf-8"),
      fileName: `script-exports/${scriptId}/${fileName}`,
      contentType: "text/plain",
    });

    return key;
  }

  /**
   * 获取文件访问URL
   */
  async getFileUrl(fileKey: string, expireTime: number = 86400): Promise<string> {
    return await storage.generatePresignedUrl({
      key: fileKey,
      expireTime: expireTime,
    });
  }

  /**
   * 删除文件
   */
  async deleteFile(fileKey: string): Promise<boolean> {
    return await storage.deleteFile({ fileKey: fileKey });
  }

  /**
   * 检查文件是否存在
   */
  async fileExists(fileKey: string): Promise<boolean> {
    return await storage.fileExists({ fileKey: fileKey });
  }

  /**
   * 读取文件内容
   */
  async readFile(fileKey: string): Promise<Buffer> {
    return await storage.readFile({ fileKey: fileKey });
  }

  /**
   * 根据文件名获取Content-Type
   */
  private getContentType(fileName: string): string {
    const ext = fileName.split(".").pop()?.toLowerCase();

    const contentTypes: Record<string, string> = {
      pdf: "application/pdf",
      epub: "application/epub+zip",
      txt: "text/plain",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      gif: "image/gif",
    };

    return contentTypes[ext || ""] || "application/octet-stream";
  }

  /**
   * 批量删除用户的所有文件
   */
  async deleteUserFiles(userId: string): Promise<number> {
    let deletedCount = 0;

    try {
      // 列出用户文件
      const userFiles = await storage.listFiles({
        prefix: `user-files/${userId}/`,
        maxKeys: 1000,
      });

      for (const fileKey of userFiles.keys) {
        await storage.deleteFile({ fileKey: fileKey });
        deletedCount++;
      }

      // 列出用户图片
      const userImages = await storage.listFiles({
        prefix: `user-images/${userId}/`,
        maxKeys: 1000,
      });

      for (const fileKey of userImages.keys) {
        await storage.deleteFile({ fileKey: fileKey });
        deletedCount++;
      }
    } catch (error) {
      console.error("删除用户文件失败:", error);
    }

    return deletedCount;
  }
}

export const fileStorageService = new FileStorageService();
