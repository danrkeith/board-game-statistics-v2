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

const isErrorResponse = (data: object | undefined) => !!data && 'error' in data && 'message' in data;

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

const ifErrorResponseThenThrow = <ResT extends object | undefined>(data: ResT | ErrorResponse): Promise<ResT> => {
    if (isErrorResponse(data)) {
        const errorResponse = data as ErrorResponse;
        const error = new Error(errorResponse.message);
        error.cause = errorResponse.error;
        return Promise.reject(error);
    }
    return Promise.resolve(data);
};

const returnDataFrom = <ResT extends object>(apiFunc: () => Promise<Response>): Promise<ResT> =>
    apiFunc()
        .then((res: Response): Promise<ResT | ErrorResponse> => res.json())
        .then(ifErrorResponseThenThrow);

const returnVoidFrom = (apiFunc: () => Promise<Response>): Promise<void> =>
    apiFunc()
        .then((res: Response) => res.text())
        .then((text: string): undefined | ErrorResponse => text ? JSON.parse(text) as ErrorResponse : undefined)
        .then(ifErrorResponseThenThrow);

export { returnDataFrom, returnVoidFrom, apiGet, apiPost, apiPut, apiDelete };
