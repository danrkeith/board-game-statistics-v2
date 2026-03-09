const baseUrl = String(import.meta.env.BGSV2_API_URL);

interface ErrorResponse {
    error: string;
    message: string;
}

const getHeaders = (jwt?: string) => {
    return {
        'Content-Type': 'application/json',
        ...(jwt && {
            Authorization: `Bearer ${jwt}`,
        }),
    };
};

const isErrorResponse = (data: object) => 'error' in data && 'message' in data;

const apiGet = (endpoint: string, jwt?: string) =>
    fetch(baseUrl + endpoint, {
        method: 'GET',
        headers: getHeaders(jwt),
    });

const apiPost = (endpoint: string, jwt?: string, body?: object) =>
    fetch(baseUrl + endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: getHeaders(jwt),
    });

const apiDelete = (endpoint: string, jwt?: string, body?: object) =>
    fetch(baseUrl + endpoint, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: getHeaders(jwt),
    });

const returnDataFrom = <ResT extends object>(apiFunc: () => Promise<Response>) =>
    apiFunc()
        .then((res: Response) => res.json())
        .then((data: ResT | ErrorResponse) => {
            if (isErrorResponse(data)) {
                throw new Error(data.message);
            }

            return data;
        });

export type { ErrorResponse };
export { returnDataFrom, apiGet, apiPost, apiDelete };
