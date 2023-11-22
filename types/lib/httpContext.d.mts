export default httpContext;
declare namespace httpContext {
    export const get: typeof expressHttpContext.get;
    export const set: typeof expressHttpContext.set;
    export { getRequestId };
    export { setRequestId };
    export { getSessionId };
    export { setSessionId };
    export { getClientId };
    export { setClientId };
    export { getEncryptionKey };
    export { setEncryptionKey };
    export { getPlaintextEncryptionKey };
    export { setPlaintextEncryptionKey };
}
import expressHttpContext from "express-http-context";
declare function getRequestId(): any;
declare function setRequestId(requestId: any): void;
declare function getSessionId(): any;
declare function setSessionId(sessionId: any): void;
declare function getClientId(): any;
declare function setClientId(clientId: any): void;
declare function getEncryptionKey(): any;
declare function setEncryptionKey(encryptionKey: any): void;
declare function getPlaintextEncryptionKey(): any;
declare function setPlaintextEncryptionKey(encryptionKey: any): void;
