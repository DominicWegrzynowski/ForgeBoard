import type { Ticket } from "./ticketTypes";

export async function getTicketById(id: number): Promise<Ticket> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets/${id}`);

    if(!response.ok) {
        throw new Error(`Failed to fetch ticket with id ${id}`);
    }

    return response.json();
}

export async function getTicketsByCompany(companyId: number): Promise<Ticket[]> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/tickets/company/${companyId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to get tickets for company ${companyId}`);
  }

  return response.json();
}