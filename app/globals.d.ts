declare module '*.css' {
    // This declares that importing any CSS file is valid.
    // The 'any' type is used here for simplicity to satisfy the compiler.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}