import path from 'path';
import dotenvSafe from 'dotenv-safe';

const root = path.join.bind(this, __dirname, './');

dotenvSafe.load({
    path: root('.env'),
    sample: root('.env.example'),
});



export const isDebug = process.env.NODE_ENV !== 'production';
export const graphqlPort = process.env.GRAPHQL_PORT || 8080;
export const graphqlWsPort = process.env.GRAPHQL_WS_PORT || 8090;
export const mongoHost = process.env.MONGO_DB_HOST || 'localhost';
export const mongoPort = process.env.MONGO_DB_PORT || 27017;
export const mongoDb = process.env.MONGO_DB_DATABASE || 'socialnet';
export const mongoUsername = process.env.MONGO_DB_USERNAME || '';
export const mongoPassword = process.env.MONGO_DB_PASSWORD || '';
export const wwwBaseUrl = process.env.WWW_BASE_URL || 'http://emrecavunt.info';

export const filesPath = process.env.FILES_PATH || './files';

export const uploadPath = process.env.UPLOAD_PATH || './files/uploads';
export const certificatesPath = process.env.CERTIFICATES_PATH || './files/certificates';
export const templatesPath = process.env.TEMPLATES_PATH || './files/templates';
export const receiptPhotoPath = process.env.RECEIPT_PHOTO_PATH || './files/receipts';

export const adminEmail = process.env.ADMIN_EMAIL || 'emre.cavunt@gmail.com';
export const adminPassword = process.env.ADMIN_PASSWORD || 'mernstack';

export const userEmail = process.env.USER_EMAIL || 'emre.cavunt@gmail.com';
export const userPassword = process.env.USER_PASSWORD || 'mernstack';

export const testUsersToDelete = ['email1@example.com', 'email2@example.com', 'email3@example.com'];

export const enableDataLoaderCache = false;
