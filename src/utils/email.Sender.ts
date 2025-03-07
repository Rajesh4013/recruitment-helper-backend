import EmailService from '../services/email.services.js';
import { employeeRepository } from '../repos/employee.repos.js';

export async function sendJobRequestUpdateEmail(employeeId: number, updatedBy: string) {
    const toEmails = await employeeRepository.getEmailsByEmployeeIds([employeeId]);
    const ccEmails = await employeeRepository.getHREmails();
    const subject = 'Job Description Updated';
    const text = `The job request created by employee ID ${employeeId} has been updated by ${updatedBy}.`;

    await EmailService.sendJobRequestEmail(toEmails, ccEmails, subject, text);
}