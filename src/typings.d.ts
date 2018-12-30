declare module '*.md' {
  const value: string;
  export default value;
}

declare module '*.json' {
  const value: { default: { [key: string]: string } };
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.webp' {
  const value: any;
  export default value;
}
