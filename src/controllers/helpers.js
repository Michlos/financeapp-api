export const badRequest = (body) => ({
    statusCode: 400,
    body,
});

export const created = (body) => ({
    statusCode: 201,
    body,
});

export const serverError = (body) => ({
    statusCode: 500,
    body: {
        errorMessage: `Internal server error: ${body.message}`,
    },
});

export const notFound = (body) => ({
    statusCode: 404,
    body: {
        errorMessage: `Not found: ${body.message}`,
    },
});

export const ok = (body) => ({
    statusCode: 200,
    body,
});
