const baseUrl = String(import.meta.env.BGSV2_API_URL);

interface ErrorResponse {
    error: string;
    message: string;
}

interface apiParameters {
    endpoint: string;
    jwt?: string;
    body?: object;
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

const apiGet = ({ endpoint, jwt }: apiParameters) =>
    fetch(baseUrl + endpoint, {
        method: 'GET',
        headers: getHeaders(jwt),
    });

const apiPost = ({ endpoint, jwt, body }: apiParameters) =>
    fetch(baseUrl + endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: getHeaders(jwt),
    });

const apiPut = ({ endpoint, jwt, body }: apiParameters) =>
    fetch(baseUrl + endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: getHeaders(jwt),
    });

const apiDelete = ({ endpoint, jwt, body }: apiParameters) =>
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
                const error = new Error(data.message);
                error.cause = data.error;
                throw error;
            }

            return data;
        });

export { returnDataFrom, apiGet, apiPost, apiPut, apiDelete };
