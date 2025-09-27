import RNFS from 'react-native-fs';
import { inflate } from 'pako';
import { Buffer } from 'buffer';

export const REMOTE_URL ='https://github.com/mustafa-alperen-yilmaz/FoodGenerator/releases/latest/download/recipes.jsonl.gz';

const PATH_GZ = `${RNFS.DocumentDirectoryPath}/recipes.jsonl.gz`;
const PATH_JSONL = `${RNFS.DocumentDirectoryPath}/recipes.jsonl`;

export async function ensureDataset(onProgress?: (p:number)=>void): Promise<string> {
  const ok = await RNFS.exists(PATH_JSONL);
  if (ok) return PATH_JSONL;

  await RNFS.downloadFile({
    fromUrl: REMOTE_URL,
    toFile: PATH_GZ,
    progress: e => onProgress?.(e.contentLength ? e.bytesWritten / e.contentLength : 0),
    progressDivider: 5,
  }).promise;


  const gzBase64 = await RNFS.readFile(PATH_GZ, 'base64');
  const gzBuf = Buffer.from(gzBase64, 'base64');
  const gunzipped = inflate(new Uint8Array(gzBuf));
  const text = Buffer.from(gunzipped).toString('utf-8');

  await RNFS.writeFile(PATH_JSONL, text, 'utf8');
  RNFS.unlink(PATH_GZ).catch(()=>{});
  return PATH_JSONL;
}
