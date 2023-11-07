import * as fs from 'fs/promises';
import path from 'path';

export async function POST({ request }: { request: Request }) {
  try {
    if (request.body !== null) {
      const convertedString = await streamToString(request.body);

      const formData = JSON.parse(convertedString) || {};
      console.log("form:" + formData);
      let test = JSON.stringify(formData, null, 2);
      console.log(test);

      const filename = `data_${Date.now()}.json`;

      const moduleURL = new URL(import.meta.url);
      let modulePath = moduleURL.pathname;

      if (process.platform === 'win32') {
        modulePath = modulePath.replace(/^\/(?=[A-Z]:)/, '');
        modulePath = decodeURIComponent(modulePath);
      }

      const dataFolder = path.join(path.dirname(modulePath), '../../../json/files');

      await fs.mkdir(dataFolder, { recursive: true });

      const filePath = path.join(dataFolder, filename);

      await fs.writeFile(filePath, JSON.stringify(formData, null, 2));

      return{
        status: 200,
        body: { message: 'Data transmitted successfully'},
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { message: 'Internal server error' },
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  let result = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
  }
  return result;
}
