import { CreateJobDescription, CreateResourceRequest, CreateUpdateTracker } from '../types/requests.types.js';
import resourceRequestServices from '../services/resourceRequest.services.js';
import updateTrackerServices from '../services/updateTracker.services.js';

const emailBodyTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title></title>
  <style>
    /* Global styling */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f2f2f2;
      color: #333;
      line-height: 1.6;
    }

    /* Container for centered email content */
    .container {
      max-width: 1000px;
      margin: 30px auto;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    /* Header styling */
    .header {
      background: white;
      padding: 20px;
      text-align: center;
      color: black;
    }
    .header img {
      max-width: 100px;
      margin-bottom: 10px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 1px;
    }

    .content {
      padding: 20px;
      background: #f9f9f9;
    }
    .content h4 {
      margin-bottom: 15px;
      font-size: 20px;
    }
    .content p {
      margin: 0 0 15px;
      font-size: 16px;
    }

    /* Bullet list styling */
    ul {
      margin: 0 0 15px 20px;
      padding: 0;
      list-style-type: disc;
    }
    ul ul {
      margin-left: 20px;
    }
    li {
      margin: 5px 0;
    }

    /* Footer styling */
    .footer {
      background-color: #fafafa;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #777;
      border-top: 1px solid #eee;
    }
    .footer a {
      color: #4A90E2;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }

    /* Responsive adjustments */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        border: none;
        border-radius: 0;
        box-shadow: none;
        margin: 0;
      }
      .header h1 {
        font-size: 20px;
      }
      .content p,
      .content h4,
      li {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
    <img src="https://tecnics.com/wp-content/uploads/2020/03/logo1.png"
           alt="Logo" style="max-width: 150px;">
      <h1>Tecnics Integration Technologies Private Limited</h1>
    </div>
    <div class="content">
      {{BODY_CONTENT}}
    </div>
    <div class="footer">
      <p>Contact us at: <a href="mailto:info@tecnics.com">info@tecnics.com</a></p>
      <address>
        Plot 12/1, Sector 1, Huda Techno Enclave Rd, HUDA Techno Enclave, Madhapur, Hyderabad, Telangana 500081
      </address>
    </div>
  </div>
</body>
</html>
`;

export async function formatCreateJDEmailBody(requestId: number): Promise<string> {
    const resourceRequest = await resourceRequestServices.getResourceRequestById(requestId);

    const bodyContent = `
        <h3>Hi HR Team,</h3>
        <p>
            A new job request has been created by ${resourceRequest?.Employee?.FirstName ?? 'Employee'} ${resourceRequest?.Employee?.LastName ?? 'Name not specified'} from the ${resourceRequest?.Employee?.Designation ?? 'Designation not specified'} of ${resourceRequest?.Employee?.Department?.DepartmentName ?? 'Department not specified'}. Please find the JD below:
        </p>

      <h3>Job Description:</h3>
      <p>
        We are looking for a dedicated ${resourceRequest?.JobDescription?.Role ?? 'Role not specified'} to join our team in a ${resourceRequest?.JobDescription?.ModeOfWork?.ModeOfWorkName ?? 'Mode of Work not specified'} environment. The ideal candidate should have a ${resourceRequest?.JobDescription?.Education?.EducationName ?? 'Education not specified'} with ${resourceRequest?.JobDescription?.Experience ?? 'Experience not specified'} year of experience.
        This role requires strong proficiency in ${resourceRequest?.JobDescription?.RequiredTechnicalSkills ?? 'Required Technical Skills not specified'}, with familiarity in ${resourceRequest?.JobDescription?.PreferredTechnicalSkills ?? 'Preferred Technical Skills not specified'} being highly advantageous.
        The successful applicant will be responsible for ${resourceRequest?.JobDescription?.Responsibility ?? 'Responsibilities not specified'}. Candidates with relevant ${resourceRequest?.JobDescription?.Certifications ?? 'Certifications not specified'} are preferred.
        This is an immediate requirement for an ongoing project, and additional incentives may be offered to the right candidate.
      </p>
      <ul>
        <li><b>Job Type:</b> ${resourceRequest?.JobDescription?.JobType?.JobTypeName ?? 'Job Type not specified'}</li>
        <li><b>Location:</b> ${resourceRequest?.JobDescription?.Location ?? 'Hyderabad'}</li>
        <li><b>Notice Period:</b> ${resourceRequest?.JobDescription?.NoticePeriod?.NoticePeriodName ?? 'Notice Period not specified'}</li>
        <li><b>Open Positions:</b> ${resourceRequest?.JobDescription?.OpenPositions ?? 'Open Positions not specified'}</li>
        <li><b>Salary:</b> ${resourceRequest?.updateTracker?.[0]?.Priority?.PriorityName ?? 'Salary not specified'}</li>
        <li><b>Interview Process:</b>
          <ul>
            <li>Level 1 Interview Panel: ${resourceRequest?.updateTracker?.[0]?.Employee_UpdateTracker_Level1PanelIDToEmployee?.FirstName ?? 'First Name not specified'} ${resourceRequest?.updateTracker?.[0]?.Employee_UpdateTracker_Level1PanelIDToEmployee?.LastName ?? 'Last Name not specified'}</li>
            <li>Available slots: ${Array.isArray(resourceRequest?.updateTracker?.[0]?.Level1PanelInterviewSlots) ? resourceRequest?.updateTracker?.[0]?.Level1PanelInterviewSlots.map(slot => slot.name).join(', ') : 'No slots available'}</li>
            <li>Level 2 Interview Panel: ${resourceRequest?.updateTracker?.[0]?.Employee_UpdateTracker_Level2PanelIDToEmployee?.FirstName ?? 'First Name not specified'} ${resourceRequest?.updateTracker?.[0]?.Employee_UpdateTracker_Level2PanelIDToEmployee?.LastName ?? 'Last Name not specified'}</li>
            <li>Available slots: ${Array.isArray(resourceRequest?.updateTracker?.[0]?.Level2PanelInterviewSlots) ? resourceRequest?.updateTracker?.[0]?.Level2PanelInterviewSlots.map(slot => slot.name).join(', ') : 'No slots available'}</li>
          </ul>
        </li>
      </ul>
    `;

    return emailBodyTemplate.replace('{{BODY_CONTENT}}', bodyContent);
}

export async function formatUpdateJDEmailBodyByManager(jobDescriptionId: string, updatedBy: string) {
    const resourceRequest = await updateTrackerServices.getLatestEditsOfUpdateTracker(Number(jobDescriptionId));
    console.log(resourceRequest);
    const bodyContent = `Job Description ${jobDescriptionId} has been updated by ${updatedBy}`;
    return emailBodyTemplate.replace('{{BODY_CONTENT}}', bodyContent);
}

export async function formatUpdateJDEmailBody(requestId: string, updatedBy: string) {
    const bodyContent = `Job Description ${requestId} has been updated by ${updatedBy}`;
    return emailBodyTemplate.replace('{{BODY_CONTENT}}', bodyContent);
}

export async function formatUpdateJDEmailBodyByHR(jobDescription: string) {
    const bodyContent = `Job Description ${jobDescription} has been updated by HR`;
    return emailBodyTemplate.replace('{{BODY_CONTENT}}', bodyContent);
}

export async function formatAprrovedJDEmailBody(jobDescription: string) {
    const bodyContent = `Job Description ${jobDescription} has been approved`;
    return emailBodyTemplate.replace('{{BODY_CONTENT}}', bodyContent);
}