import { exec } from 'child_process'

export function runPython(pythonScriptPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(`python "${pythonScriptPath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
                return;
            }
            console.log(`stdout: ${stdout}`);
            if(stderr) console.error(`stderr: ${stderr}`);
            resolve();
        });
    });
}
