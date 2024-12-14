declare module 'lisk-client' {
  export const apiClient: typeof import('@liskhq/lisk-api-client');
  export const cryptography: typeof import('@liskhq/lisk-cryptography');
  export const passphrase: typeof import('@liskhq/lisk-passphrase');
  export const transactions: typeof import('@liskhq/lisk-transactions');
  export const utils: typeof import('@liskhq/lisk-utils');
  export const tree: typeof import('@liskhq/lisk-tree');
  export const validator: typeof import('@liskhq/lisk-validator');
  export const codec: typeof import('@liskhq/lisk-codec');
}

/* This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) */