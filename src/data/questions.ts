export interface QuestionOption {
  id: string;
  text_en: string;
  text_fa: string;
  image_url?: string;
}

export interface Question {
  id: number;
  stage: number;
  level: "3pt" | "4pt" | "5pt";
  text_en: string;
  text_fa: string;
  question_image_url?: string;
  options: QuestionOption[];
  correct: string;
  skills: string[];
  year: number;
  grade_group: string;
}

export const questions: Question[] = [
  // ─── TEXT-ONLY QUESTIONS ──────────────────────────────────────────────────

  {
    id: 1,
    stage: 1,
    level: "4pt",
    year: 2025,
    grade_group: "1-2",
    text_en:
      "There were 12 pieces of fruit on the table. Vera removed 2 pears, 4 apples, and half of the oranges. Now there are only oranges left on the table. How many oranges are left?",
    text_fa:
      "۱۲ عدد میوه روی میز بود. ورا ۲ گلابی، ۴ سیب، و نصف پرتقال‌ها را برداشت. حالا فقط پرتقال روی میز مانده. چند پرتقال مانده؟",
    options: [
      { id: "A", text_en: "1", text_fa: "۱" },
      { id: "B", text_en: "2", text_fa: "۲" },
      { id: "C", text_en: "3", text_fa: "۳" },
      { id: "D", text_en: "4", text_fa: "۴" },
      { id: "E", text_en: "6", text_fa: "۶" },
    ],
    correct: "C",
    skills: ["arithmetic", "logical-thinking"],
  },
  {
    id: 2,
    stage: 1,
    level: "3pt",
    year: 2025,
    grade_group: "3-4",
    text_en:
      "Arya writes the four digits 2, 0, 2, 5 in the four boxes of the expression □ + □ − □ + □. Which order would give her the largest result?",
    text_fa:
      "آریا چهار عدد ۲، ۰، ۲، ۵ را در چهار خانه‌ی عبارت □ + □ − □ + □ می‌نویسد. کدام ترتیب بزرگترین نتیجه را می‌دهد؟",
    options: [
      { id: "A", text_en: "0, 2, 2, 5", text_fa: "۰، ۲، ۲، ۵" },
      { id: "B", text_en: "0, 5, 2, 2", text_fa: "۰، ۵، ۲، ۲" },
      { id: "C", text_en: "2, 5, 2, 0", text_fa: "۲، ۵، ۲، ۰" },
      { id: "D", text_en: "5, 0, 2, 2", text_fa: "۵، ۰، ۲، ۲" },
      { id: "E", text_en: "5, 2, 0, 2", text_fa: "۵، ۲، ۰، ۲" },
    ],
    correct: "E",
    skills: ["arithmetic", "optimization"],
  },
  {
    id: 3,
    stage: 1,
    level: "5pt",
    year: 2026,
    grade_group: "1-2",
    text_en:
      "A cat in Istanbul has 7 kittens. One male kitten's name is Albert, and one female kitten's name is Stella. Stella has twice as many brothers as Albert. How many sisters does Stella have?",
    text_fa:
      "یک گربه در استانبول ۷ بچه گربه دارد. یکی از نرها آلبرت نام دارد و یکی از ماده‌ها استلا. استلا دو برابر آلبرت برادر دارد. استلا چند خواهر دارد؟",
    options: [
      { id: "A", text_en: "1", text_fa: "۱" },
      { id: "B", text_en: "2", text_fa: "۲" },
      { id: "C", text_en: "3", text_fa: "۳" },
      { id: "D", text_en: "4", text_fa: "۴" },
      { id: "E", text_en: "5", text_fa: "۵" },
    ],
    correct: "D",
    skills: ["logical-thinking", "algebra"],
  },

  // ─── IMAGE-BASED QUESTIONS ────────────────────────────────────────────────

  {
    id: 4,
    stage: 2,
    level: "3pt",
    year: 2025,
    grade_group: "1-2",
    text_en:
      "On Michael's toy shelf, there are no turtles, no rabbits, and no robots. Which of these shelves could be Michael's shelf?",
    text_fa:
      "روی قفسه اسباب‌بازی‌های مایکل هیچ لاک‌پشتی، خرگوشی، یا ربات وجود ندارد. کدام قفسه می‌تواند متعلق به مایکل باشد؟",
    question_image_url: "/lumio/images/questions/2025-g12-q1-shelves.png",
    options: [
      { id: "A", text_en: "Shelf 1", text_fa: "قفسه ۱" },
      { id: "B", text_en: "Shelf 2", text_fa: "قفسه ۲" },
      { id: "C", text_en: "Shelf 3", text_fa: "قفسه ۳" },
      { id: "D", text_en: "Shelf 4", text_fa: "قفسه ۴" },
      { id: "E", text_en: "Shelf 5", text_fa: "قفسه ۵" },
    ],
    correct: "B",
    skills: ["logical-thinking", "visual-reasoning"],
  },
  {
    id: 5,
    stage: 2,
    level: "4pt",
    year: 2026,
    grade_group: "1-2",
    text_en:
      "Grandma divides a cake with 3 cuts. Then she turns the cake and makes 4 more cuts, as shown in the picture. How many pieces of cake are there now?",
    text_fa:
      "مادربزرگ با ۳ برش کیک را تقسیم می‌کند. سپس کیک را می‌چرخاند و ۴ برش دیگر می‌زند. حالا کیک چند تکه شده؟",
    question_image_url: "/lumio/images/questions/2026-g12-q2-cake.png",
    options: [
      { id: "A", text_en: "14", text_fa: "۱۴" },
      { id: "B", text_en: "16", text_fa: "۱۶" },
      { id: "C", text_en: "18", text_fa: "۱۸" },
      { id: "D", text_en: "20", text_fa: "۲۰" },
      { id: "E", text_en: "21", text_fa: "۲۱" },
    ],
    correct: "D",
    skills: ["spatial-reasoning", "arithmetic"],
  },
  {
    id: 6,
    stage: 2,
    level: "3pt",
    year: 2026,
    grade_group: "1-2",
    text_en:
      "The picture shows 2 different families of monsters. Which of the groups below is made up of monsters from the same family?",
    text_fa:
      "تصویر ۲ خانواده متفاوت از هیولاها را نشان می‌دهد. کدام گروه از هیولاهای یک خانواده تشکیل شده است؟",
    question_image_url: "/lumio/images/questions/2026-g12-q1-context.png",
    options: [
      { id: "A", text_en: "Group A", text_fa: "گروه الف", image_url: "/lumio/images/questions/2026-g12-q1-optA.png" },
      { id: "B", text_en: "Group B", text_fa: "گروه ب", image_url: "/lumio/images/questions/2026-g12-q1-optB.png" },
      { id: "C", text_en: "Group C", text_fa: "گروه ج", image_url: "/lumio/images/questions/2026-g12-q1-optC.png" },
      { id: "D", text_en: "Group D", text_fa: "گروه د", image_url: "/lumio/images/questions/2026-g12-q1-optD.png" },
      { id: "E", text_en: "Group E", text_fa: "گروه ه", image_url: "/lumio/images/questions/2026-g12-q1-optE.png" },
    ],
    correct: "B",
    skills: ["visual-reasoning", "pattern-recognition"],
  },
];
