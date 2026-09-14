import { useQuery } from "@tanstack/react-query";
import { getTicketById, getTicketsByCompany } from "./ticketApi";

export function useTicket(id: number) {
    return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
    enabled: id > 0,
    });
}

export function useTickets(companyId: number) {
    return useQuery({
    queryKey: ["tickets", "company", companyId],
    queryFn: () => getTicketsByCompany(companyId),
    enabled: companyId > 0,
    });
}