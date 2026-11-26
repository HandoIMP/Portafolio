/**
 * Whether `filePath` is inside a `node_modules` or `.git` directory within `rootPath`.
 * Only path segments below `rootPath` are checked, so the root itself is never ignored.
 */
export declare function isInIgnoredDirectory(rootPath: string, filePath: string): boolean;
