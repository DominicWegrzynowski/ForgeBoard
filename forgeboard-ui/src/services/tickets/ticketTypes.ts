export interface Ticket {
    id: number;
    projectId: number;
    ticketPriorityId: number;
    ticketStatusId: number;
    ticketTypeId: number;
    ownerUserId: number;
    developerUserId: number | null;

    title: string;
    description: string;

    created: string;
    updated: string | null;

    archived: boolean;
    archivedByProject: boolean;

    projectName: string;
    priorityName: string;
    statusName: string;
    typeName: string;

    developerName: string | null;
    ownerName: string;
}