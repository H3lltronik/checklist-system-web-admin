export interface Assignation {
    id: number
    name: string
    description: string
    enterprise: Enterprise
    fileChecklist: FileChecklist
    period: Period
    checklistItems: ChecklistItem[]
    progress: number
}

export interface Enterprise {
    id: number
    name: string
    rfc: string
    email: string
}

export interface FileChecklist {
    id: number
    title: string
    description: string
    checklistItemsCount: number
}

export interface Period {
    name: string
    year: number
}

export interface ChecklistItem {
    id: number
    title: string
    description: string
    maxFiles: number
    minFiles?: number
    maxSize: number
    sizeSuffix: string
    allowedMimeTypes: string[]
    checklistItemType: ChecklistType
    uploadedFiles: UploadedFile[]
    overrideChecklistItemId: number
    progress: number
}

export interface UploadedFile {
    assignationId: number
    checklistItemId: number
    checklistItemType: string
    id: number
    uploadedFileId: number
    comment: string
    deletedAt: string
    status: {
        date: string
        event: string
        comment: string
    }
    upload: {
        id: number;
        url?: string;
        name: string;
        mimeType: string;
        slug: string;
        size: number;
        createdAt: string;
    };
}

export enum ChecklistType {
    CHECKLIST_ITEM = "CHECKLIST_ITEM",
    EXTRA_CHECKLIST_ITEM = "EXTRA_CHECKLIST_ITEM",
}

export enum CHECKLIST_ITEM_EVENT {
    // USER Events
    USER_UPLOADED_FILE = "USER_UPLOADED_FILE", // Usuario sube un archivo para un requisito.
    USER_REMOVED_FILE = "USER_REMOVED_FILE", // Usuario elimina un archivo subido.

    // ADMIN Events
    ADMIN_UPLOADED_FILE = "ADMIN_UPLOADED_FILE", // Administrador sube un archivo (en caso de asistencia al usuario).
    ADMIN_ACCEPTED_FILE = "ADMIN_ACCEPTED_FILE", // Administrador acepta un archivo subido.
    ADMIN_REJECTED_FILE = "ADMIN_REJECTED_FILE", // Administrador rechaza un archivo subido con feedback.
    ADMIN_REMOVED_FILE = "ADMIN_REMOVED_FILE", // Administrador elimina un archivo.

    // SYSTEM Events
    REQUIREMENT_COMPLETED = "REQUIREMENT_COMPLETED", // Sistema marca un requisito como completado.
    REQUIREMENT_EXPIRED = "REQUIREMENT_EXPIRED", // Un requisito expira automáticamente debido a un cronjob o límite de tiempo.
}