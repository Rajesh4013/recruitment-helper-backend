import EmailService from '../services/email.services.js';
import { employeeRepository } from '../repos/employee.repos.js';
import { formatCreateJDEmailBody, formatUpdateJDEmailBody, formatUpdateJDEmailBodyByHR, formatUpdateJDEmailBodyByManager } from './emailFormatter.js';
import { ResourceRequestRepository } from '../repos/resourceRequest.repos.js';

export async function sendJobRequestUpdateEmailByManager(JobDescriptionId: number, updatedBy: number) {
    const managerEmails = await employeeRepository.getManagerHierarchy(updatedBy);
    const toEmails = await employeeRepository.getEmailsByEmployeeIds(managerEmails);
    const ccEmails = await employeeRepository.getHREmails();
    const subject = 'Job Description Updated';
    const body = await formatUpdateJDEmailBodyByManager(JobDescriptionId.toString(), updatedBy.toString());

    await EmailService.sendJobRequestEmail(toEmails, ccEmails, subject, body);
}

export async function sendJobRequestUpdateEmailByHR(JobDescriptionId: number) {
    const resourceRequestRepo = new ResourceRequestRepository();
    const employee = await resourceRequestRepo.getEmployeeIdByJobDescriptionId(JobDescriptionId);
    if (employee === null) {
        throw new Error('Employee ID not found for the given Job Description ID');
    }
    const managerEmails = await employeeRepository.getManagerHierarchy(employee.EmployeeID);
    const toEmails = await employeeRepository.getEmailsByEmployeeIds(managerEmails);
    // const toEmails = await employeeRepository.getEmailsByEmployeeIds([]);
    const ccEmails = await employeeRepository.getHREmails();
    const subject = 'Job Description Updated By HR';
    const body = await formatUpdateJDEmailBodyByHR(JobDescriptionId.toString());
    // const text = `The job request created by employee ID ${employeeId} has been updated by ${updatedBy}.`;

    await EmailService.sendJobRequestEmail(toEmails, ccEmails, subject, body);
}

export async function sendJobRequestUpdateEmail(requestId: number, updatedBy: number) {
    const managerEmails = await employeeRepository.getManagerHierarchy(updatedBy);
    const toEmails = await employeeRepository.getEmailsByEmployeeIds(managerEmails);
    const ccEmails = await employeeRepository.getHREmails();
    const subject = 'Job Description Updated By HR';
    const body = await formatUpdateJDEmailBody(requestId.toString(), updatedBy.toString());
    // const text = `The job request created by employee ID ${employeeId} has been updated by ${updatedBy}.`;

    await EmailService.sendJobRequestEmail(toEmails, ccEmails, subject, body);
}

export async function sendJobRequestCreateEmail(employeeId: number, requestId: number) {
    const managerEmails = await employeeRepository.getManagerHierarchy(employeeId);
    const toEmails = await employeeRepository.getEmailsByEmployeeIds(managerEmails);
    const ccEmails = await employeeRepository.getHREmails();
    const subject = 'New Job Request Created';
    const body = formatCreateJDEmailBody(requestId);
    // const text = `A new job request has been created by employee ID ${employeeId}.`;

    await EmailService.sendJobRequestEmail(toEmails, ccEmails, subject, await body);
}

// export async function sendApprovedJdEmail(employeeId: number) {
//     const toEmails = await employeeRepository.getEmailsByEmployeeIds([employeeId]);
//     const ccEmails = await employeeRepository.getHREmails();
//     const subject = 'Job Description Approved';
//     const text = `The job request created by employee ID ${employeeId} has been approved.`;

//     await EmailService.sendJobRequestEmail(toEmails, ccEmails, subject, text);
// }

// export async function sendRejectedJdEmail(employeeId: number) {
//     const toEmails = await employeeRepository.getEmailsByEmployeeIds([employeeId]);
//     const ccEmails = await employeeRepository.getHREmails();
//     const subject = 'Job Description Rejected';
//     const text = `The job request created by employee ID ${employeeId} has been rejected.`;

//     await EmailService.sendJobRequestEmail(toEmails, ccEmails, subject, text);
// }