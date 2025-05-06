import { inject, injectable } from "tsyringe";
import { ReqAdmin } from "../../../../shared/types/req.types";
import path from "path";
import * as XLSX from "xlsx";
import { parse } from "csv-parse/sync";
import fs from 'fs'
import FileParserDatasource from "./file-parser.datasource";

@injectable()
class FileParserService {

        constructor(@inject(FileParserDatasource) private fileParserDatasource: FileParserDatasource) {}

    
        async parseFile(file: Express.Multer.File, admin: ReqAdmin){
            try {

                const originalName = file.originalname
                const buffer = file.buffer

              //  console.log(originalName)
                const isExcel = originalName.endsWith(".xlsx") || originalName.endsWith(".xls");
                const isCSV = originalName.endsWith(".csv");
              
                if (isExcel) {
                  const workbook = XLSX.read(buffer, { type: "buffer" });
                  const sheet = workbook.Sheets[workbook.SheetNames[0]];
                  const parsedFile =  XLSX.utils.sheet_to_json(sheet);
                  return await this.fileParserDatasource.saveFile(parsedFile)
                }
              
                if (isCSV) {
                  const parsedFile =  parse(buffer.toString("utf-8"), {
                    columns: true,
                    skip_empty_lines: true,
                  });

                  return await this.fileParserDatasource.saveFile(parsedFile)

                }

                
            } catch (error) {
                throw error 
            }
        }
}

export default FileParserService