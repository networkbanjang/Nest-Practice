import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('Create a root uploads folder...');
    fs.mkdirSync(path.join(__dirname, '..', 'uploads')); //폴더없으면 만들기
  } catch (err) {
    console.log('The folder already exists...');
  }
  try {
    console.log(`Create ${folder} uploads folder...`);
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (err) {
    console.log(`${folder} 있음`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    //디스크에
    destination(req, file, done) {
      //어디에 저장할지
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      done(null, folderName);
    },
    filename(req, file, done) {
      //어떤이름으로 올릴지
      const ext = path.extname(file.originalname); //확장자
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      done(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
    limits: { fieldSize: 20 * 1024 * 1024 },
  };
  return result;
};
