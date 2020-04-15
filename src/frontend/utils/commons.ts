import { v4 as uuidv4 } from 'uuid';

export const randomUUID = (): string => {
    return uuidv4();
};
