import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyCO2plubp13JHLa76Fs3lo4B44vl_udJa4";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const aiService = {
    getSubject: async (formData: any) => {
        console.log(formData);
        try {
            const fullPrompt = `Generate a clear and professional email subject for a resource request to a Recruiter (HR) at a software company using the following details: ${JSON.stringify(formData)}. The subject should be concise, directly reflect key information like the role, experience, and other relevant details, and be easy to understand at a glance. Provide only the email subject without any extra text or formatting. No introductory or concluding statements, and no new line character at the end.`;
            console.log(fullPrompt);
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            const emailSubject = response?.candidates && response.candidates[0]?.content?.parts[0]?.text || "No subject generated";
            return emailSubject ? {
                success: true, data: emailSubject.trim()
            } : null
        } catch (error) {
            console.error("❌ Error:", error);
            return {
                success: false,
                message: "Failed to fetch subject"
            };
        }
    },

    getQuestions: async (formData: string) => {
        try {
            const prompt = `Generate a list of exactly 10 clear and concise technical interview questions and their answers tailored to the following details: ${JSON.stringify(formData)}. Ensure the questions are directly relevant to the specified role, experience level, and other provided details. Focus on both theoretical understanding and practical application, covering key concepts and skills required for the role.
                            Response Format:
                            Provide exactly 10 valid JSON objects.
                            7-8 questions should be theoretical, 2-3 questions should be practical.
                            Each object should have two keys: "question" and "answer".
                            If the question is opinion-based or experience-related, omit the answer field.
                            No markdown formatting, explanations, headings, or additional text.
                            No introductory or concluding statements.`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const questions_and_Answers = response?.candidates && response.candidates[0]?.content?.parts[0]?.text || "No questions generated";
            const filteredQuestions = JSON.parse(questions_and_Answers);
            return filteredQuestions.length ? {
                success: true,
                data: filteredQuestions
            } : {
                success: false,
                data: "No questions generated"
            }
        } catch (error) {
            console.error("❌ Error:", error);
            return {
                success: false,
                message: "Failed to fetch questions"
            };
        }
    },

    generateJD: async (formData: any) => {
        try {
            const prompt = `Generate Job description with the following details in such a way that it is easy to understand and professional and good with the following details: ${JSON.stringify(formData)}. Response format should be in html format with inline CSS. no extra formatting no intro or outro statements. a valid <div> element </div>`
        } catch (error) {

        }
    }
}

export default aiService;