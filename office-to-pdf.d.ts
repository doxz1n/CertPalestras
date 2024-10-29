declare module "office-to-pdf" {
  function officeToPdf(filePath: string): Promise<Buffer>;
  export default officeToPdf;
}
