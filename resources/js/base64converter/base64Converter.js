export function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export async function toBase64Handler(files) {
    const filePathsPromises = [];
    files.forEach((file) => {
        filePathsPromises.push(toBase64(file));
    });
    const filePaths = await Promise.all(filePathsPromises);
    const mappedFiles = filePaths.map((base64File) => base64File);
    return mappedFiles;
}