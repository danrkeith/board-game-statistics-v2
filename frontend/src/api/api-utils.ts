const baseUrl = 'http://localhost:8080';

interface ErrorResponse {
    error: string;
    message: string;
}

const isErrorResponse = (data: object) => 'error' in data && 'message' in data;

const apiPost = (endpoint: string, body?: object) =>
    fetch(baseUrl + endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });

export type { ErrorResponse };
export { isErrorResponse, apiPost };
