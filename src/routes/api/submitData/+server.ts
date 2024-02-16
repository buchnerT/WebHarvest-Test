import * as fs from 'fs/promises';
import path from 'path';
import { streamToString } from '$lib/server/stringConverter';
import { runScraper } from '$lib/server/runScraper'
import { exec } from 'child_process'

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
      }
      modulePath = decodeURIComponent(modulePath);

      // Set path's
      const dataFolder = path.join(path.dirname(modulePath), '../../../json/files');
      const pythonScriptPath = path.join(path.dirname(modulePath), '../../../scripts/main.py');

      clearDirectory(dataFolder);


      await fs.mkdir(dataFolder, { recursive: true });

      const filePath = path.join(dataFolder, filename);

      await fs.writeFile(filePath, JSON.stringify(formData, null, 2));

      runScraper(pythonScriptPath);

      return new Response(JSON.stringify({ message: 'Data transmitted successfully' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
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


async function clearDirectory(directory: string): Promise<void> {
  try {

    const entries = await fs.readdir(directory, { withFileTypes: true });

    const deletionPromises = entries.map((dirent) => {
      const entryPath = path.join(directory, dirent.name);
      return dirent.isFile() ? fs.unlink(entryPath) : Promise.resolve();
  
    });

    await Promise.all(deletionPromises);

    console.log('All files have been deleted.');
  } catch (error) {
    console.error('Error clearing directory:', error);
  }
}

