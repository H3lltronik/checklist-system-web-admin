import { UserPermissions } from '@/@types/auth';
import { signal } from '@preact/signals';

export const userPermissionsSignal = signal<UserPermissions | null>(null);
