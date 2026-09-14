export interface PracticeSet {
  id: string;
  title: string;
  question: string;
  instructions: string;
  wordLimitMin: number;
  wordLimitMax: number;
  timeLimitMins: number;
  difficulty: "Easy" | "Moderate" | "Hard" | "Exam Level";
}

export interface Section {
  id: string;
  name: string;
  description: string;
  sets: PracticeSet[];
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  color: string;
  sections: Section[];
}

export const DESCRIPTIVE_EXAMS: Exam[] = [
  {
    id: "ibps-so-it",
    name: "IBPS SO IT Officer",
    description: "Descriptive English specifically curated for IBPS SO IT Mains & Interview prep.",
    color: "bg-blue-600",
    sections: [
      {
        id: "email",
        name: "Email Writing",
        description: "Professional workplace emails, IT incidents, and managerial communication.",
        sets: [
          {
            id: "set-01",
            title: "Set 01: Cybersecurity Incident",
            question: "Write an email to the IT Head regarding a suspected ransomware attack on the HR department servers. Highlight the immediate steps taken and request further guidance.",
            instructions: "Use a formal tone. Ensure proper salutation and sign-off. Clearly state the problem and actions taken.",
            wordLimitMin: 150,
            wordLimitMax: 200,
            timeLimitMins: 15,
            difficulty: "Exam Level"
          },
          {
            id: "set-02",
            title: "Set 02: Software Deployment Delay",
            question: "Write an email to the project stakeholders informing them about a 2-day delay in the new CBS (Core Banking System) module deployment due to critical bugs found during UAT.",
            instructions: "Be polite but clear. State the reason without using overly technical jargon. Provide the revised timeline.",
            wordLimitMin: 150,
            wordLimitMax: 200,
            timeLimitMins: 15,
            difficulty: "Moderate"
          },
          {
            id: "set-03",
            title: "Set 03: Requesting Hardware Upgrade",
            question: "Write an email to the Procurement Manager requesting an immediate hardware upgrade for your development team to handle the new AI-based fraud detection project.",
            instructions: "Justify the requirement with solid reasons. Keep it concise.",
            wordLimitMin: 150,
            wordLimitMax: 200,
            timeLimitMins: 15,
            difficulty: "Easy"
          },
          {
            id: "set-04",
            title: "Set 04: Server Maintenance Notification",
            question: "Write an email to all bank employees notifying them of scheduled server maintenance this weekend. Mention the expected downtime and services affected.",
            instructions: "Use clear formatting. Include alternative support contact details.",
            wordLimitMin: 150,
            wordLimitMax: 200,
            timeLimitMins: 15,
            difficulty: "Moderate"
          },
          {
            id: "set-05",
            title: "Set 05: Data Breach Advisory",
            question: "Write an email on behalf of the CISO to all employees advising them about a recent phishing campaign targeting the bank, and list 3 preventive measures.",
            instructions: "Maintain an urgent yet professional tone. Bullet points are encouraged.",
            wordLimitMin: 150,
            wordLimitMax: 200,
            timeLimitMins: 15,
            difficulty: "Exam Level"
          }
        ]
      },
      {
        id: "essay",
        name: "Essay Writing",
        description: "Essays on Technology, Banking, AI, Cybersecurity, and Economy.",
        sets: [
          {
            id: "set-01",
            title: "Set 01: AI in Banking",
            question: "Write an essay on 'The Role of Artificial Intelligence in the Future of Indian Banking: Opportunities and Threats'.",
            instructions: "Structure your essay with a clear introduction, body paragraphs, and a conclusion. Provide relevant examples.",
            wordLimitMin: 250,
            wordLimitMax: 300,
            timeLimitMins: 20,
            difficulty: "Exam Level"
          },
          {
            id: "set-02",
            title: "Set 02: Cybersecurity",
            question: "Write an essay on 'Increasing Cybersecurity Threats in Digital Payments and How Banks Can Combat Them'.",
            instructions: "Mention recent trends. Use appropriate vocabulary.",
            wordLimitMin: 250,
            wordLimitMax: 300,
            timeLimitMins: 20,
            difficulty: "Hard"
          },
          {
            id: "set-03",
            title: "Set 03: CBDC",
            question: "Write an essay on 'Central Bank Digital Currency (CBDC): e-Rupee and its Impact on the Financial Ecosystem'.",
            instructions: "Explain what CBDC is, its benefits, and potential challenges.",
            wordLimitMin: 250,
            wordLimitMax: 300,
            timeLimitMins: 20,
            difficulty: "Exam Level"
          },
          {
            id: "set-04",
            title: "Set 04: Cloud Computing",
            question: "Write an essay on 'Migration of Core Banking Systems to Cloud: Pros, Cons, and Regulatory Compliance'.",
            instructions: "Focus on data localization and security aspects.",
            wordLimitMin: 250,
            wordLimitMax: 300,
            timeLimitMins: 20,
            difficulty: "Hard"
          },
          {
            id: "set-05",
            title: "Set 05: Financial Inclusion",
            question: "Write an essay on 'How Technology is Driving Financial Inclusion in Rural India'.",
            instructions: "Include government schemes like UPI, Jan Dhan, and rural broadband.",
            wordLimitMin: 250,
            wordLimitMax: 300,
            timeLimitMins: 20,
            difficulty: "Moderate"
          }
        ]
      }
    ]
  },
  {
    id: "ibps-po",
    name: "IBPS PO",
    description: "General Banking & Social issues for PO Mains.",
    color: "bg-emerald-500",
    sections: [
      {
        id: "letter",
        name: "Letter Writing",
        description: "Formal and Informal letters.",
        sets: [
          {
            id: "set-01",
            title: "Set 01: Bank Manager",
            question: "Write a letter to the Bank Manager requesting an educational loan for higher studies abroad.",
            instructions: "Follow formal letter format.",
            wordLimitMin: 150,
            wordLimitMax: 200,
            timeLimitMins: 15,
            difficulty: "Moderate"
          }
        ]
      }
    ]
  }
];

export const getExamById = (id: string) => DESCRIPTIVE_EXAMS.find(e => e.id === id);
