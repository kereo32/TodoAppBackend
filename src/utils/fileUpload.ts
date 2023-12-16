import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'eu-central-1' });

const s3BucketName = 'todoappfilestorage';

const storage = multerS3({
  s3: s3 as any,
  bucket: s3BucketName,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

export { upload };
