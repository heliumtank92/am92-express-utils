export default DEFAULT_ROUTES;
declare const DEFAULT_ROUTES: {
    path: string;
    method: string;
    routePipeline: ((request: any, response: any, next: any) => void)[];
}[];
