declare module 'pptx-parser' {
  export interface Parser {
    parse(filePath: string): Promise<PPTX>;
  }

  export interface PPTX {
    slides: Slide[];
  }

  export interface Slide {
    shapes?: Shape[];
  }

  export interface Shape {
    text?: string;
    textBody?: {
      paragraphs?: Paragraph[];
    };
  }

  export interface Paragraph {
    text?: string;
  }

  const Parser: new () => Parser;
  export { Parser };
}
