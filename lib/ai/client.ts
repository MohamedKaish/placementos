/**
 * PlacementOS - Gemini AI Service Abstraction
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * 1. Gemini is strictly an AI language understanding and synthesis engine.
 * 2. Gemini MUST NOT calculate the final readiness score or calibration gap.
 * 3. Gemini is used solely for:
 *    - Resume parsing and skill keyword extraction
 *    - Job description parsing into candidate requirements
 *    - Generating human-readable explanations of detected gaps
 *    - Generating practice questions & rubrics
 *    - Providing personalized qualitative interview feedback
 * 4. This module runs exclusively SERVER-SIDE.
 */

export interface ParsedResumeSkill {
  skillName: string;
  contextFound: string;
  inferredProficiency: number;
}

export interface ParsedResumeOutput {
  candidateName?: string;
  detectedSkills: ParsedResumeSkill[];
  projectHighlights: string[];
  educationFound?: string;
}

export class GeminiAIClient {
  private apiKey: string;
  private modelName: string;

  constructor() {
    // Read strictly from server environment variables
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.length > 0);
  }

  /**
   * Safe server-side caller to Google Gemini REST endpoint
   */
  private async generateContent(prompt: string): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error(
        'Gemini API key is not configured. Please set GEMINI_API_KEY in server environment.'
      );
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2, // Low temperature for factual extraction
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  }

  /**
   * Language task: Parse raw resume text into structured skill mentions.
   * Note: Extracted skills will later be weighted by the deterministic EvidenceEngine.
   */
  public async parseResumeText(rawText: string): Promise<ParsedResumeOutput> {
    const prompt = `You are an engineering placement evidence parser.
Analyze this resume text and extract technical skills, tools, and evidence artifacts.
Return ONLY valid JSON matching this schema:
{
  "candidateName": "string",
  "detectedSkills": [
    { "skillName": "string", "contextFound": "sentence from resume", "inferredProficiency": 1 to 5 }
  ],
  "projectHighlights": ["string"]
}

Resume Text:
${rawText}`;

    const rawResponse = await this.generateContent(prompt);
    try {
      // Strip markdown code fences if present
      const cleanJson = rawResponse.replace(/```json\n?|```/g, '').trim();
      return JSON.parse(cleanJson) as ParsedResumeOutput;
    } catch {
      return {
        detectedSkills: [],
        projectHighlights: ['Raw extraction completed; manual review advised.']
      };
    }
  }

  /**
   * Language task: Generate a supportive, actionable explanation for a deterministic gap
   */
  public async explainGapActionPlan(
    skillName: string,
    currentLevel: number,
    requiredLevel: number,
    roleTitle: string
  ): Promise<string> {
    const prompt = `Explain why ${skillName} is important for a ${roleTitle} role.
The student currently demonstrates Level ${currentLevel} but the target role requires Level ${requiredLevel}.
Provide 3 concise, concrete engineering practice suggestions to bridge this exact gap.
Keep tone professional, encouraging, and engineering-focused.`;

    return this.generateContent(prompt);
  }
}

export const geminiClient = new GeminiAIClient();
