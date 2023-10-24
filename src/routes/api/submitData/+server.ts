import * as fs from 'fs/promises';
import path from 'path';

export async function POST(request: any) {
    const formData = request.body || {};
    console.log(formData);
    
    const filename = `data_${Date.now()}.json`;
    

    const moduleURL = new URL(import.meta.url);
    let modulePath = moduleURL.pathname;

 
    if (process.platform === 'win32') {
        modulePath = modulePath.replace(/^\/(?=[A-Z]:)/, '');
        modulePath = decodeURIComponent(modulePath); 
    }

    const dataFolder = path.join(path.dirname(modulePath), 'json', 'files');
    const filePath = path.join(dataFolder, filename);

    await fs.writeFile(filePath, JSON.stringify(formData, null, 2));

    return {
        status: 200,
        body: { message: 'Data submitted successfully' },
        headers: {
            'Content-Type': 'application/json',
        },
    };
}
