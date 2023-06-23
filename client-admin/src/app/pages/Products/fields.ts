export interface IFields {
    label: string;
    name: string;
    type: string
}

export interface IProduct {
    name: string,
    metadata: string
}

export const fields: IFields[] = [
    { label: 'name_', name: 'name', type: 'text' },
    // { label: 'description_', name: 'description', type: 'text' },
    // { label: 'manufacturer_', name: 'manufacturer', type: 'text' },
    // { label: 'category', name: 'category', type: 'text' },
    // { label: 'productTokens', name: 'productTokens', type: 'text' },
    // { label: 'expireDate', name: 'expireDate', type: 'text' },
    { label: 'metadata_', name: 'metadata', type: 'text' },
];