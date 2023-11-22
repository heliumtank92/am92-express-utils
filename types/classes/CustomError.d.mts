export default class CustomError extends Error {
    constructor(e: {}, eMap: any);
    _isCustomError: boolean;
    service: string;
    message: any;
    statusCode: any;
    errorCode: any;
    error: {};
    data: any;
}
