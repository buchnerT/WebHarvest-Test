export async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
    const reader = stream.getReader();
    let result = '';
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        result += new TextDecoder().decode(value);
    }
    return result;
}