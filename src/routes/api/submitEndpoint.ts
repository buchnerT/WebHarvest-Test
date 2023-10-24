import * as fs from 'fs/promises';
import path from 'path';

export async function post(request: any) {
    const formData = request.body || {};
    console.log(formData);

    const filename = `data_${Date.now()}.json`;
    const currentDir = new URL('.', import.meta.url).pathname;
    const dataFolder = path.resolve(currentDir, '../../json');
    const filePath = `${dataFolder}/${filename}`;

    fs.writeFile(filePath, JSON.stringify(formData, null, 2));

    return {
        status: 200,
        body: { message: 'Data submitted successfully' },
        headers: {
            'Content-Type': 'application/json',
        },
    };
}
