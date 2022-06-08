export function generateAndDownloadFile(content: any, filename: string){
    const blob = new Blob([content], {type: 'text/xml'});
    if ('msSaveOrOpenBlob' in window.navigator) {
        // @ts-ignore
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const tempLink = window.document.createElement('a');
        tempLink.href = window.URL.createObjectURL(blob);
        tempLink.download = filename;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
}