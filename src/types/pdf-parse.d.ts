// pdf-parse için TypeScript tip tanımları
declare module 'pdf-parse/lib/pdf-parse.js' {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
  }

  function parse(buffer: Buffer, options?: any): Promise<PDFData>;
  export default parse;
}

declare module 'pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
  }

  function parse(buffer: Buffer, options?: any): Promise<PDFData>;
  export default parse;
}
