export interface Question {
  id: number;
  stage: number;
  level: "3pt" | "4pt" | "5pt";
  text_en: string;
  text_fa: string;
  image_url?: string; // optional, for image-based questions
  options: {
    id: string; // "A" | "B" | "C" | "D" | "E"
    text_en: string;
    text_fa: string;
  }[];
  correct: string; // option id
  skills: string[];
  year: number;
  grade_group: string; // e.g. "1-2", "3-4", "5-6"
}

export const questions: Question[] = [
  {
    id: 1,
    stage: 1,
    level: "4pt",
    year: 2025,
    grade_group: "1-2",
    text_en: "There were 12 pieces of fruit on the table. Vera removed 2 pears, 4 apples, and half of the oranges. Now there are only oranges left on the table. How many oranges are left?",
    text_fa: "۱۲ عدد میوه روی میز بود. ورا ۲ گلابی، ۴ سیب، و نصف پرتقال‌ها را برداشت. حالا فقط پرتقال روی میز مانده. چند پرتقال مانده؟",
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
    text_en: "Arya writes the four digits 2, 0, 2, 5 in the four boxes of the expression □ + □ − □ + □. Which order would give her the largest result?",
    text_fa: "آریا چهار عدد ۲، ۰، ۲، ۵ را در چهار خانه‌ی عبارت □ + □ − □ + □ می‌نویسد. کدام ترتیب بزرگترین نتیجه را می‌دهد؟",
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
    text_en: "A cat in Istanbul has 7 kittens. One male kitten's name is Albert, and one female kitten's name is Stella. Stella has twice as many brothers as Albert. How many sisters does Stella have?",
    text_fa: "یک گربه در استانبول ۷ بچه گربه دارد. یکی از بچه‌های نر آلبرت نام دارد و یکی از ماده‌ها استلا. استلا دو برابر آلبرت برادر دارد. استلا چند خواهر دارد؟",
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
  {
    id: 4,
    stage: 2,
    level: "5pt",
    year: 2026,
    grade_group: "3-4",
    text_en: "Five polar bears – Karen, Lisa, Marieke, Nadja, and Peter – each keep the fish they catch in a bucket. Karen tells Lisa: 'Give me 2 fish, and then we will have the same number of fish.' Marieke tells Karen and Lisa: 'I have half as many fish as the two of you have together.' If Karen has 6 fish now, how many fish does Lisa have?",
    text_fa: "پنج خرس قطبی هر کدام ماهی‌هایشان را در سطل نگه می‌دارند. کارن به لیزا می‌گوید: 'دو ماهی به من بده، آنوقت هر دو یکسان داریم.' اگر کارن الان ۶ ماهی داشته باشد، لیزا چند ماهی دارد؟",
    options: [
      { id: "A", text_en: "6", text_fa: "۶" },
      { id: "B", text_en: "8", text_fa: "۸" },
      { id: "C", text_en: "10", text_fa: "۱۰" },
      { id: "D", text_en: "12", text_fa: "۱۲" },
      { id: "E", text_en: "14", text_fa: "۱۴" },
    ],
    correct: "C",
    skills: ["algebra", "logical-thinking"],
  },
  {
    id: 5,
    stage: 2,
    level: "4pt",
    year: 2026,
    grade_group: "1-2",
    text_en: "Grandma makes 3 cuts on a cake. Then she turns the cake 90 degrees and makes 4 more cuts. How many pieces of cake are there now?",
    text_fa: "مادربزرگ ۳ برش روی کیک می‌زند. سپس کیک را ۹۰ درجه می‌چرخاند و ۴ برش دیگر می‌زند. حالا کیک چند تکه شده؟",
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
];
