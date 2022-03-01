let serverUrl: string;

export function setServerUrl(url: string): void {
    serverUrl = url;
}

export function getServerUrl(): string {
    return serverUrl;
}