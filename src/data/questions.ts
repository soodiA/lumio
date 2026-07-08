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

  // ════════════════════════════════════════════════════════════════
  //  2025  ·  GRADES 1 AND 2
  // ════════════════════════════════════════════════════════════════

  {
    id: 1,
    stage: 1,
    level: "3pt",
    year: 2025,
    grade_group: "1-2",
    text_en:
      "On Michael's toy shelf, there are no turtles, no rabbits, and no robots. Which of these shelves could be Michael's shelf?",
    text_fa:
      "روی قفسه اسباب‌بازی‌های مایکل هیچ لاک‌پشتی، خرگوشی، یا ربات وجود ندارد. کدام قفسه می‌تواند متعلق به مایکل باشد؟",
    options: [
      {
        id: "A",
        text_en: "Shelf 1",
        text_fa: "قفسه ۱",
        image_url: "/lumio/images/questions/2025-g12-q1-shelf-A.png",
      },
      {
        id: "B",
        text_en: "Shelf 2",
        text_fa: "قفسه ۲",
        image_url: "/lumio/images/questions/2025-g12-q1-shelf-B.png",
      },
      {
        id: "C",
        text_en: "Shelf 3",
        text_fa: "قفسه ۳",
        image_url: "/lumio/images/questions/2025-g12-q1-shelf-C.png",
      },
      {
        id: "D",
        text_en: "Shelf 4",
        text_fa: "قفسه ۴",
        image_url: "/lumio/images/questions/2025-g12-q1-shelf-D.png",
      },
      {
        id: "E",
        text_en: "Shelf 5",
        text_fa: "قفسه ۵",
        image_url: "/lumio/images/questions/2025-g12-q1-shelf-E.png",
      },
    ],
    correct: "B",
    skills: ["logical-thinking", "visual-reasoning"],
  },

  {
    id: 2,
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
    id: 3,
    stage: 1,
    level: "5pt",
    year: 2025,
    grade_group: "1-2",
    text_en:
      "Charles has 5 wooden toys with weights shown. He picks 2 pairs of toys so that the pairs weigh the same. Which toy was not picked?",
    text_fa:
      "چارلز ۵ اسباب‌بازی چوبی دارد با وزن‌های نشان داده شده. او ۲ جفت اسباب‌بازی انتخاب می‌کند به طوری که هر جفت وزن یکسانی داشته باشد. کدام اسباب‌بازی انتخاب نشد؟",
    options: [
      { id: "A", text_en: "6 g toy", text_fa: "اسباب‌بازی ۶ گرمی" },
      { id: "B", text_en: "8 g toy", text_fa: "اسباب‌بازی ۸ گرمی" },
      { id: "C", text_en: "10 g toy", text_fa: "اسباب‌بازی ۱۰ گرمی" },
      { id: "D", text_en: "11 g toy", text_fa: "اسباب‌بازی ۱۱ گرمی" },
      { id: "E", text_en: "12 g toy", text_fa: "اسباب‌بازی ۱۲ گرمی" },
    ],
    correct: "D",
    skills: ["arithmetic", "logical-thinking"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2025  ·  GRADES 3 AND 4
  // ════════════════════════════════════════════════════════════════

  {
    id: 4,
    stage: 2,
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
    id: 5,
    stage: 2,
    level: "4pt",
    year: 2025,
    grade_group: "3-4",
    text_en:
      "In the morning, 5 friends had identical fully-charged mobile phones. By the evening, Bob had spoken on the phone as much as Ann and Cristina together. Bob ran out of power. David had not used his phone at all. Which phone belonged to Edward?",
    text_fa:
      "صبح، ۵ دوست تلفن‌های همراه کاملاً شارژ شده‌ی یکسانی داشتند. تا عصر، باب به اندازه‌ی آن و کریستینا روی هم صحبت کرده بود. باب باتری‌اش تمام شد. دیوید اصلاً از تلفنش استفاده نکرد. کدام تلفن متعلق به ادوارد است؟",
    options: [
      { id: "A", text_en: "Phone 1", text_fa: "تلفن ۱" },
      { id: "B", text_en: "Phone 2", text_fa: "تلفن ۲" },
      { id: "C", text_en: "Phone 3", text_fa: "تلفن ۳" },
      { id: "D", text_en: "Phone 4", text_fa: "تلفن ۴" },
      { id: "E", text_en: "Phone 5", text_fa: "تلفن ۵" },
    ],
    correct: "C",
    skills: ["logical-thinking", "arithmetic"],
  },

  {
    id: 6,
    stage: 2,
    level: "5pt",
    year: 2025,
    grade_group: "3-4",
    text_en:
      "Six ladybugs have 1, 2, 3, 4, 5, or 6 spots each. Marta took four photos of them in groups of three. Each ladybug appeared the same number of times in the photos. Three of the photos, along with the outline of the fourth photo, are shown here. How many spots do the three ladybugs in Marta's fourth photo have in total?",
    text_fa:
      "شش کفشدوزک هر کدام ۱، ۲، ۳، ۴، ۵ یا ۶ لکه دارند. مارتا چهار عکس از آن‌ها به صورت گروه‌های سه تایی گرفت. هر کفشدوزک به تعداد یکسانی در عکس‌ها ظاهر شد. سه عکس به همراه طرح کلی عکس چهارم اینجا نشان داده شده است. جمع لکه‌های سه کفشدوزک در عکس چهارم چقدر است؟",
    question_image_url: "/lumio/images/questions/2025-g34-q3-ladybugs.png",
    options: [
      { id: "A", text_en: "9", text_fa: "۹" },
      { id: "B", text_en: "10", text_fa: "۱۰" },
      { id: "C", text_en: "11", text_fa: "۱۱" },
      { id: "D", text_en: "12", text_fa: "۱۲" },
      { id: "E", text_en: "23", text_fa: "۲۳" },
    ],
    correct: "A",
    skills: ["arithmetic", "logical-thinking", "counting"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2025  ·  GRADES 5 AND 6
  // ════════════════════════════════════════════════════════════════

  {
    id: 7,
    stage: 3,
    level: "3pt",
    year: 2025,
    grade_group: "5-6",
    text_en:
      "Max put slices of tomato, black olives, chilies, mushrooms, and onion rings on top of a pizza, but not necessarily in that order. He only put one ingredient at a time. His finished pizza is shown in the picture. Which was the third topping he put on the pizza?",
    text_fa:
      "مکس برش‌های گوجه، زیتون سیاه، فلفل تند، قارچ و حلقه‌های پیاز را روی پیتزا گذاشت، اما نه لزوماً به این ترتیب. او هر بار یک ماده می‌گذاشت. پیتزای تمام‌شده در تصویر نشان داده شده است. کدام ماده سوم اضافه شد؟",
    options: [
      { id: "A", text_en: "Tomato slices", text_fa: "برش‌های گوجه" },
      { id: "B", text_en: "Black olives", text_fa: "زیتون سیاه" },
      { id: "C", text_en: "Chilies", text_fa: "فلفل تند" },
      { id: "D", text_en: "Mushrooms", text_fa: "قارچ" },
      { id: "E", text_en: "Onion rings", text_fa: "حلقه‌های پیاز" },
    ],
    correct: "B",
    skills: ["logical-thinking", "visual-reasoning", "ordering"],
  },

  {
    id: 8,
    stage: 3,
    level: "4pt",
    year: 2025,
    grade_group: "5-6",
    text_en:
      "Each of the cards shown below has two 3-digit numbers written on them, but some of the digits cannot be seen as they are covered in ink. On one of the cards, the sum of the digits of both numbers is the same. On which card are those two numbers?",
    text_fa:
      "هر یک از کارت‌های نشان داده شده دو عدد سه‌رقمی دارند، اما برخی ارقام با جوهر پوشیده شده‌اند. روی یکی از کارت‌ها مجموع ارقام هر دو عدد یکسان است. آن دو عدد روی کدام کارت هستند؟",
    options: [
      { id: "A", text_en: "543 and 11□", text_fa: "۵۴۳ و ۱۱□" },
      { id: "B", text_en: "58□ and 11□", text_fa: "۵۸□ و ۱۱□" },
      { id: "C", text_en: "982 and 1□□", text_fa: "۹۸۲ و ۱□□" },
      { id: "D", text_en: "211 and 6□□", text_fa: "۲۱۱ و ۶□□" },
      { id: "E", text_en: "777 and 2□□", text_fa: "۷۷۷ و ۲□□" },
    ],
    correct: "C",
    skills: ["arithmetic", "number-theory"],
  },

  {
    id: 9,
    stage: 3,
    level: "5pt",
    year: 2025,
    grade_group: "5-6",
    text_en:
      "Some blocks are balanced on top of each other as shown. Blocks that are shaded in the same way have the same weight. Ville wants to order the three different types of square blocks from heaviest to lightest. What order should Ville obtain?",
    text_fa:
      "برخی بلوک‌ها روی یکدیگر تعادل دارند. بلوک‌هایی با سایه‌زنی یکسان وزن برابر دارند. ویله می‌خواهد سه نوع مختلف بلوک مربعی را از سنگین‌ترین به سبک‌ترین مرتب کند. چه ترتیبی باید بدست آورد؟",
    options: [
      { id: "A", text_en: "□ ▣ ■", text_fa: "□ ▣ ■" },
      { id: "B", text_en: "□ ■ ▣", text_fa: "□ ■ ▣" },
      { id: "C", text_en: "▣ □ ■", text_fa: "▣ □ ■" },
      { id: "D", text_en: "▣ ■ □", text_fa: "▣ ■ □" },
      { id: "E", text_en: "■ ▣ □", text_fa: "■ ▣ □" },
    ],
    correct: "D",
    skills: ["logical-thinking", "algebra", "ordering"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2025  ·  GRADES 7 AND 8
  // ════════════════════════════════════════════════════════════════

  {
    id: 10,
    stage: 4,
    level: "3pt",
    year: 2025,
    grade_group: "7-8",
    text_en:
      "The regular hexagon shown is divided into many triangles of equal area. What fraction of the hexagon is shaded?",
    text_fa:
      "مسدس منتظم نشان داده شده به مثلث‌های مساوی المساحت تقسیم شده است. چه کسری از مسدس سایه زده شده است؟",
    options: [
      { id: "A", text_en: "1/2", text_fa: "۱/۲" },
      { id: "B", text_en: "1/3", text_fa: "۱/۳" },
      { id: "C", text_en: "1/4", text_fa: "۱/۴" },
      { id: "D", text_en: "1/5", text_fa: "۱/۵" },
      { id: "E", text_en: "1/6", text_fa: "۱/۶" },
    ],
    correct: "C",
    skills: ["geometry", "fractions", "visual-reasoning"],
  },

  {
    id: 11,
    stage: 4,
    level: "4pt",
    year: 2025,
    grade_group: "7-8",
    text_en:
      "Peter drew a quarter circle with center at each corner of a flag with dimensions 12 cm by 9 cm and colored the region formed, as shown. What is the length indicated by the question mark?",
    text_fa:
      "پیتر یک ربع دایره با مرکز در هر گوشه پرچمی به ابعاد ۱۲ در ۹ سانتیمتر رسم کرد و ناحیه تشکیل‌شده را رنگ آمیزی کرد. طول نشان داده شده با علامت سوال چقدر است؟",
    options: [
      { id: "A", text_en: "5 cm", text_fa: "۵ سانتیمتر" },
      { id: "B", text_en: "6 cm", text_fa: "۶ سانتیمتر" },
      { id: "C", text_en: "7 cm", text_fa: "۷ سانتیمتر" },
      { id: "D", text_en: "8 cm", text_fa: "۸ سانتیمتر" },
      { id: "E", text_en: "9 cm", text_fa: "۹ سانتیمتر" },
    ],
    correct: "A",
    skills: ["geometry", "pythagorean-theorem"],
  },

  {
    id: 12,
    stage: 4,
    level: "5pt",
    year: 2025,
    grade_group: "7-8",
    text_en:
      "Some birds, including Ha, Long, Nha, and Trang, are perching on four parallel wires. There are 10 birds perched above Ha. There are 25 birds perched above Long. There are five birds perched below Nha. There are two birds perched below Trang. The number of birds perched above Trang is a multiple of the number of birds perched below her. How many birds in total are perched on the four wires?",
    text_fa:
      "تعدادی پرنده از جمله ها، لونگ، نها و ترنگ روی چهار سیم موازی نشسته‌اند. ۱۰ پرنده بالاتر از هاست. ۲۵ پرنده بالاتر از لونگ است. ۵ پرنده زیر نها هستند. ۲ پرنده زیر ترنگ هستند. تعداد پرندگان بالاتر از ترنگ مضربی از تعداد پرندگان زیر اوست. جمع پرندگان روی چهار سیم چقدر است؟",
    options: [
      { id: "A", text_en: "27", text_fa: "۲۷" },
      { id: "B", text_en: "30", text_fa: "۳۰" },
      { id: "C", text_en: "32", text_fa: "۳۲" },
      { id: "D", text_en: "37", text_fa: "۳۷" },
      { id: "E", text_en: "40", text_fa: "۴۰" },
    ],
    correct: "A",
    skills: ["logical-thinking", "algebra"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2025  ·  GRADES 9 AND 10
  // ════════════════════════════════════════════════════════════════

  {
    id: 13,
    stage: 5,
    level: "3pt",
    year: 2025,
    grade_group: "9-10",
    text_en:
      "The 4-digit number 80□□ is missing its last two digits. The number is divisible by 8 and 9. What is the product of these two missing digits?",
    text_fa:
      "عدد چهار رقمی ۸۰□□ دو رقم آخرش گم شده است. این عدد بر ۸ و ۹ بخش‌پذیر است. حاصل‌ضرب دو رقم گم‌شده چقدر است؟",
    options: [
      { id: "A", text_en: "6", text_fa: "۶" },
      { id: "B", text_en: "16", text_fa: "۱۶" },
      { id: "C", text_en: "20", text_fa: "۲۰" },
      { id: "D", text_en: "24", text_fa: "۲۴" },
      { id: "E", text_en: "48", text_fa: "۴۸" },
    ],
    correct: "D",
    skills: ["number-theory", "divisibility"],
  },

  {
    id: 14,
    stage: 5,
    level: "4pt",
    year: 2025,
    grade_group: "9-10",
    text_en:
      "Anna looks at a photo on her smartphone. The format is 16:9 and fills the whole display. When she turns the smartphone, the picture gets smaller. What fraction of the display area is taken up by the smaller picture?",
    text_fa:
      "آنا به عکسی روی گوشی‌اش نگاه می‌کند. قالب ۱۶:۹ است و کل نمایشگر را پر می‌کند. وقتی گوشی را می‌چرخاند، عکس کوچک‌تر می‌شود. چه کسری از مساحت نمایشگر را عکس کوچک‌تر اشغال می‌کند؟",
    options: [
      { id: "A", text_en: "3/4", text_fa: "۳/۴" },
      { id: "B", text_en: "9/16", text_fa: "۹/۱۶" },
      { id: "C", text_en: "27/64", text_fa: "۲۷/۶۴" },
      { id: "D", text_en: "32/81", text_fa: "۳۲/۸۱" },
      { id: "E", text_en: "81/256", text_fa: "۸۱/۲۵۶" },
    ],
    correct: "E",
    skills: ["geometry", "fractions", "ratio"],
  },

  {
    id: 15,
    stage: 5,
    level: "5pt",
    year: 2025,
    grade_group: "9-10",
    text_en:
      "In the diagram, the diameter of the inner circle forms part of the diameter of the outer circle. The outer circle has a chord of length 16 that is parallel to its diameter and is also a tangent to the inner circle. What is the area of the shaded region?",
    text_fa:
      "در نمودار، قطر دایره داخلی بخشی از قطر دایره خارجی را تشکیل می‌دهد. دایره خارجی وتری به طول ۱۶ دارد که موازی قطرش است و همچنین مماس بر دایره داخلی است. مساحت ناحیه سایه‌زده چقدر است؟",
    options: [
      { id: "A", text_en: "36π", text_fa: "۳۶π" },
      { id: "B", text_en: "49π", text_fa: "۴۹π" },
      { id: "C", text_en: "64π", text_fa: "۶۴π" },
      { id: "D", text_en: "81π", text_fa: "۸۱π" },
      { id: "E", text_en: "Not enough information", text_fa: "اطلاعات کافی نیست" },
    ],
    correct: "C",
    skills: ["geometry", "circles", "algebra"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2025  ·  GRADES 11 AND 12
  // ════════════════════════════════════════════════════════════════

  {
    id: 16,
    stage: 6,
    level: "3pt",
    year: 2025,
    grade_group: "11-12",
    text_en:
      "Mike obtains a number x by dividing √11 by 3. Where is the number x to be found on the number line?",
    text_fa:
      "مایک عدد x را با تقسیم √۱۱ بر ۳ به دست می‌آورد. عدد x کجای محور اعداد قرار دارد؟",
    options: [
      { id: "A", text_en: "Between 0 and 1", text_fa: "بین ۰ و ۱" },
      { id: "B", text_en: "Between 1 and 2", text_fa: "بین ۱ و ۲" },
      { id: "C", text_en: "Between 2 and 3", text_fa: "بین ۲ و ۳" },
      { id: "D", text_en: "Between 3 and 4", text_fa: "بین ۳ و ۴" },
      { id: "E", text_en: "Between 4 and 5", text_fa: "بین ۴ و ۵" },
    ],
    correct: "B",
    skills: ["algebra", "estimation", "square-roots"],
  },

  {
    id: 17,
    stage: 6,
    level: "4pt",
    year: 2025,
    grade_group: "11-12",
    text_en:
      "A student drew the graphs of two linear functions y = ax + b and y = cx + d in a coordinate system, as shown. The expression ab + cd − (ac + bd) is always:",
    text_fa:
      "یک دانش‌آموز نمودار دو تابع خطی y = ax + b و y = cx + d را در یک دستگاه مختصات رسم کرد. عبارت ab + cd − (ac + bd) همیشه:",
    options: [
      { id: "A", text_en: "Negative", text_fa: "منفی" },
      { id: "B", text_en: "Non-positive", text_fa: "غیرمثبت" },
      { id: "C", text_en: "Positive", text_fa: "مثبت" },
      { id: "D", text_en: "Zero", text_fa: "صفر" },
      { id: "E", text_en: "None of the above is always true", text_fa: "هیچ‌کدام از موارد بالا همیشه صادق نیست" },
    ],
    correct: "C",
    skills: ["algebra", "functions", "coordinate-geometry"],
  },

  {
    id: 18,
    stage: 6,
    level: "5pt",
    year: 2025,
    grade_group: "11-12",
    text_en:
      "A group of three square men from Mars and a group of three circular men from Jupiter are sitting around a table. One of the six has the key to their flying saucer. All members of one group always tell the truth and all members of the other group always lie. All six were asked \"Does a person sitting next to you have the key?\" Their answers are shown. Who has the key?",
    text_fa:
      "گروهی از سه مرد مربعی از مریخ و گروهی از سه مرد دایره‌ای از مشتری دور میز نشسته‌اند. یکی از شش نفر کلید بشقاب پرنده را دارد. اعضای یک گروه همیشه راست می‌گویند و اعضای گروه دیگر همیشه دروغ. از همه پرسیده شد «آیا کسی که کنارت نشسته کلید را دارد؟» جواب‌ها نشان داده شده. چه کسی کلید را دارد؟",
    options: [
      { id: "A", text_en: "Person A", text_fa: "شخص A" },
      { id: "B", text_en: "Person B", text_fa: "شخص B" },
      { id: "C", text_en: "Person C", text_fa: "شخص C" },
      { id: "D", text_en: "Person D", text_fa: "شخص D" },
      { id: "E", text_en: "Person E", text_fa: "شخص E" },
    ],
    correct: "D",
    skills: ["logical-thinking", "truth-lies"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2026  ·  GRADES 1 AND 2
  // ════════════════════════════════════════════════════════════════

  {
    id: 19,
    stage: 1,
    level: "3pt",
    year: 2026,
    grade_group: "1-2",
    text_en:
      "The picture shows 2 different families of monsters. Which of the groups below is made up of monsters from the same family?",
    text_fa:
      "تصویر ۲ خانواده متفاوت از هیولاها را نشان می‌دهد. کدام گروه از هیولاهای یک خانواده تشکیل شده است؟",
    question_image_url: "/lumio/images/questions/2026-g12-q1-context.png",
    options: [
      {
        id: "A",
        text_en: "Group A",
        text_fa: "گروه الف",
        image_url: "/lumio/images/questions/2026-g12-q1-optA.png",
      },
      {
        id: "B",
        text_en: "Group B",
        text_fa: "گروه ب",
        image_url: "/lumio/images/questions/2026-g12-q1-optB.png",
      },
      {
        id: "C",
        text_en: "Group C",
        text_fa: "گروه ج",
        image_url: "/lumio/images/questions/2026-g12-q1-optC.png",
      },
      {
        id: "D",
        text_en: "Group D",
        text_fa: "گروه د",
        image_url: "/lumio/images/questions/2026-g12-q1-optD.png",
      },
      {
        id: "E",
        text_en: "Group E",
        text_fa: "گروه ه",
        image_url: "/lumio/images/questions/2026-g12-q1-optE.png",
      },
    ],
    correct: "B",
    skills: ["visual-reasoning", "pattern-recognition"],
  },

  {
    id: 20,
    stage: 1,
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
    id: 21,
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

  // ════════════════════════════════════════════════════════════════
  //  2026  ·  GRADES 3 AND 4
  // ════════════════════════════════════════════════════════════════

  {
    id: 22,
    stage: 2,
    level: "3pt",
    year: 2026,
    grade_group: "3-4",
    text_en:
      "Finn has 5 pencils. The shortest one is blue. The green and red pencils are the same length. The purple pencil is shorter than the yellow one. Which pencil is the purple one?",
    text_fa:
      "فین ۵ مداد دارد. کوتاه‌ترین آبی است. مداد سبز و قرمز یک اندازه‌اند. مداد بنفش از زرد کوتاه‌تر است. کدام مداد بنفش است؟",
    options: [
      { id: "A", text_en: "Pencil A", text_fa: "مداد A" },
      { id: "B", text_en: "Pencil B", text_fa: "مداد B" },
      { id: "C", text_en: "Pencil C", text_fa: "مداد C" },
      { id: "D", text_en: "Pencil D", text_fa: "مداد D" },
      { id: "E", text_en: "Pencil E", text_fa: "مداد E" },
    ],
    correct: "B",
    skills: ["logical-thinking", "ordering", "comparison"],
  },

  {
    id: 23,
    stage: 2,
    level: "4pt",
    year: 2026,
    grade_group: "3-4",
    text_en:
      "The three photographs show a tiger, a kangaroo, a lion, and an ostrich escaping from the zoo. In what order did they escape through the gate?",
    text_fa:
      "سه عکس نشان می‌دهند یک ببر، یک کانگورو، یک شیر و یک شترمرغ از باغ‌وحش فرار کردند. به چه ترتیبی از دروازه گذشتند؟",
    options: [
      { id: "A", text_en: "Lion, ostrich, tiger, kangaroo", text_fa: "شیر، شترمرغ، ببر، کانگورو" },
      { id: "B", text_en: "Lion, tiger, ostrich, kangaroo", text_fa: "شیر، ببر، شترمرغ، کانگورو" },
      { id: "C", text_en: "Tiger, ostrich, kangaroo, lion", text_fa: "ببر، شترمرغ، کانگورو، شیر" },
      { id: "D", text_en: "Ostrich, kangaroo, lion, tiger", text_fa: "شترمرغ، کانگورو، شیر، ببر" },
      { id: "E", text_en: "Tiger, kangaroo, lion, ostrich", text_fa: "ببر، کانگورو، شیر، شترمرغ" },
    ],
    correct: "B",
    skills: ["logical-thinking", "visual-reasoning", "ordering"],
  },

  {
    id: 24,
    stage: 2,
    level: "5pt",
    year: 2026,
    grade_group: "3-4",
    text_en:
      "Five polar bears – Karen, Lisa, Marieke, Nadja, and Peter – each keep the fish they catch in a bucket. Karen tells Lisa, \"Give me 2 fish, and then we will have the same number of fish.\" Marieke tells Karen and Lisa, \"I have half as many fish as the two of you have together.\" Which bucket belongs to Lisa?",
    text_fa:
      "پنج خرس قطبی — کارن، لیزا، ماریکه، نادیا و پیتر — ماهی‌هایی که صید می‌کنند را در سطل نگه می‌دارند. کارن به لیزا می‌گوید «۲ ماهی به من بده، آنوقت تعداد یکسانی خواهیم داشت.» ماریکه به کارن و لیزا می‌گوید «من نصف آنچه شما دو تا روی هم دارید، ماهی دارم.» کدام سطل متعلق به لیزاست؟",
    options: [
      { id: "A", text_en: "Bucket A", text_fa: "سطل A" },
      { id: "B", text_en: "Bucket B", text_fa: "سطل B" },
      { id: "C", text_en: "Bucket C", text_fa: "سطل C" },
      { id: "D", text_en: "Bucket D", text_fa: "سطل D" },
      { id: "E", text_en: "Bucket E", text_fa: "سطل E" },
    ],
    correct: "D",
    skills: ["algebra", "logical-thinking", "arithmetic"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2026  ·  GRADES 5 AND 6
  // ════════════════════════════════════════════════════════════════

  {
    id: 25,
    stage: 3,
    level: "3pt",
    year: 2026,
    grade_group: "5-6",
    text_en:
      "The first figure shows a kangaroo's face. The second figure shows the result after reflecting the kangaroo across the figure's lines twice. If this process continues until all the triangles are filled, what will the kangaroo look like in the shaded triangle?",
    text_fa:
      "شکل اول چهره کانگوروی را نشان می‌دهد. شکل دوم نتیجه بازتاب کانگورو از خطوط شکل را دو بار نشان می‌دهد. اگر این فرایند ادامه یابد تا همه مثلث‌ها پر شوند، کانگورو در مثلث سایه‌زده چه شکلی خواهد داشت؟",
    options: [
      { id: "A", text_en: "Option A", text_fa: "گزینه A" },
      { id: "B", text_en: "Option B", text_fa: "گزینه B" },
      { id: "C", text_en: "Option C", text_fa: "گزینه C" },
      { id: "D", text_en: "Option D", text_fa: "گزینه D" },
      { id: "E", text_en: "Option E", text_fa: "گزینه E" },
    ],
    correct: "B",
    skills: ["geometry", "symmetry", "visual-reasoning"],
  },

  {
    id: 26,
    stage: 3,
    level: "4pt",
    year: 2026,
    grade_group: "5-6",
    text_en:
      "Which option shows a cut that divides the figure shown into two identical parts? The parts may be flipped.",
    text_fa:
      "کدام گزینه برشی را نشان می‌دهد که شکل را به دو قسمت یکسان تقسیم کند؟ قطعات ممکن است برگردانده شوند.",
    options: [
      { id: "A", text_en: "Cut A", text_fa: "برش A" },
      { id: "B", text_en: "Cut B", text_fa: "برش B" },
      { id: "C", text_en: "Cut C", text_fa: "برش C" },
      { id: "D", text_en: "Cut D", text_fa: "برش D" },
      { id: "E", text_en: "Cut E", text_fa: "برش E" },
    ],
    correct: "C",
    skills: ["geometry", "symmetry", "spatial-reasoning"],
  },

  {
    id: 27,
    stage: 3,
    level: "5pt",
    year: 2026,
    grade_group: "5-6",
    text_en:
      "The five cups shown belong to Leonard, Rajesh, Amy, Penny, and Sheldon, in some order. Each cup's handle is either black or white. Leonard's cup and Rajesh's cup are the same size, but their handles are different colors. Amy's cup and Penny's cup are different sizes, but their handles are the same color. Which cup belongs to Sheldon?",
    text_fa:
      "پنج فنجان نشان داده شده متعلق به لئونارد، راجش، ایمی، پنی و شلدون هستند. دسته هر فنجان یا سیاه است یا سفید. فنجان لئونارد و راجش یک سایز هستند ولی دسته‌های رنگ متفاوتی دارند. فنجان ایمی و پنی اندازه متفاوتی دارند ولی دسته‌ها یک رنگ هستند. کدام فنجان متعلق به شلدون است؟",
    options: [
      { id: "A", text_en: "Cup A", text_fa: "فنجان A" },
      { id: "B", text_en: "Cup B", text_fa: "فنجان B" },
      { id: "C", text_en: "Cup C", text_fa: "فنجان C" },
      { id: "D", text_en: "Cup D", text_fa: "فنجان D" },
      { id: "E", text_en: "Cup E", text_fa: "فنجان E" },
    ],
    correct: "E",
    skills: ["logical-thinking", "visual-reasoning"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2026  ·  GRADES 7 AND 8
  // ════════════════════════════════════════════════════════════════

  {
    id: 28,
    stage: 4,
    level: "3pt",
    year: 2026,
    grade_group: "7-8",
    text_en:
      "Jo wants to place the numbers 2, 0, 2, and 6 into the four boxes, with one number in each box, to form the expression (□ + □) ÷ (□ − □). When she calculates the result, what is the smallest positive value she can obtain?",
    text_fa:
      "جو می‌خواهد اعداد ۲، ۰، ۲ و ۶ را در چهار خانه قرار دهد تا عبارت (□ + □) ÷ (□ − □) را تشکیل دهد. کوچک‌ترین مقدار مثبتی که می‌تواند بدست آورد چیست؟",
    options: [
      { id: "A", text_en: "1/6", text_fa: "۱/۶" },
      { id: "B", text_en: "1/4", text_fa: "۱/۴" },
      { id: "C", text_en: "1/3", text_fa: "۱/۳" },
      { id: "D", text_en: "1/2", text_fa: "۱/۲" },
      { id: "E", text_en: "2/3", text_fa: "۲/۳" },
    ],
    correct: "D",
    skills: ["arithmetic", "optimization", "fractions"],
  },

  {
    id: 29,
    stage: 4,
    level: "4pt",
    year: 2026,
    grade_group: "7-8",
    text_en:
      "What is the sum of the measures of all the shaded angles?",
    text_fa:
      "مجموع اندازه‌های همه زوایای سایه‌زده چقدر است؟",
    options: [
      { id: "A", text_en: "180°", text_fa: "۱۸۰°" },
      { id: "B", text_en: "240°", text_fa: "۲۴۰°" },
      { id: "C", text_en: "270°", text_fa: "۲۷۰°" },
      { id: "D", text_en: "360°", text_fa: "۳۶۰°" },
      { id: "E", text_en: "450°", text_fa: "۴۵۰°" },
    ],
    correct: "D",
    skills: ["geometry", "angles"],
  },

  {
    id: 30,
    stage: 4,
    level: "5pt",
    year: 2026,
    grade_group: "7-8",
    text_en:
      "Anna, Elsa, and their mother are playing a reasoning game. Their mother chooses one of the pieces of candy from the options shown. She tells Anna the pattern on the wrapper and tells Elsa the shape of the candy. Then she asks, \"Do you know which piece of candy I chose?\" Both Anna and Elsa answer, \"No.\" She asks the same question a second time, and again both answer, \"No.\" When she asks a third time, both Anna and Elsa answer correctly at the same time. Which piece of candy did the mother choose?",
    text_fa:
      "آنا، الزا و مادرشان یک بازی استدلالی بازی می‌کنند. مادر یکی از تکه‌های آبنبات از گزینه‌های نشان داده شده را انتخاب می‌کند. به آنا الگوی کاغذ بسته‌بندی و به الزا شکل آبنبات را می‌گوید. سپس می‌پرسد «می‌دانید کدام آبنبات را انتخاب کردم؟» هر دو جواب می‌دهند «نه.» دوباره همان سوال و هر دو «نه». بار سوم هر دو درست جواب می‌دهند. مادر کدام آبنبات را انتخاب کرده بود؟",
    options: [
      { id: "A", text_en: "Candy A", text_fa: "آبنبات A" },
      { id: "B", text_en: "Candy B", text_fa: "آبنبات B" },
      { id: "C", text_en: "Candy C", text_fa: "آبنبات C" },
      { id: "D", text_en: "Candy D", text_fa: "آبنبات D" },
      { id: "E", text_en: "Candy E", text_fa: "آبنبات E" },
    ],
    correct: "B",
    skills: ["logical-thinking", "elimination"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2026  ·  GRADES 9 AND 10
  // ════════════════════════════════════════════════════════════════

  {
    id: 31,
    stage: 5,
    level: "3pt",
    year: 2026,
    grade_group: "9-10",
    text_en:
      "The number of the year 2026 has the following two properties: Exactly two of its four digits are equal and the sum of its digits is 10. How many years in the 21st century have both of these same properties?",
    text_fa:
      "عدد سال ۲۰۲۶ دو ویژگی دارد: دقیقاً دو تا از چهار رقمش برابرند و مجموع ارقامش ۱۰ است. چند سال در قرن بیست‌ویکم هر دو این ویژگی‌ها را دارند؟",
    options: [
      { id: "A", text_en: "1", text_fa: "۱" },
      { id: "B", text_en: "2", text_fa: "۲" },
      { id: "C", text_en: "3", text_fa: "۳" },
      { id: "D", text_en: "4", text_fa: "۴" },
      { id: "E", text_en: "5", text_fa: "۵" },
    ],
    correct: "E",
    skills: ["number-theory", "counting", "arithmetic"],
  },

  {
    id: 32,
    stage: 5,
    level: "4pt",
    year: 2026,
    grade_group: "9-10",
    text_en:
      "The diagram shows how the depth of water in a bottle changes when it is flipped upside down. The bottle's capacity is 4.5 liters and the entire water-filled part in the first diagram is cylindrical in shape. What is the volume of water, in liters, in the bottle?",
    text_fa:
      "نمودار نشان می‌دهد عمق آب در یک بطری وقتی وارونه می‌شود چگونه تغییر می‌کند. ظرفیت بطری ۴.۵ لیتر است و قسمت پر از آب در نمودار اول شکل استوانه‌ای دارد. حجم آب در بطری چند لیتر است؟",
    options: [
      { id: "A", text_en: "2.4 L", text_fa: "۲.۴ لیتر" },
      { id: "B", text_en: "2.5 L", text_fa: "۲.۵ لیتر" },
      { id: "C", text_en: "2.7 L", text_fa: "۲.۷ لیتر" },
      { id: "D", text_en: "3.0 L", text_fa: "۳.۰ لیتر" },
      { id: "E", text_en: "3.5 L", text_fa: "۳.۵ لیتر" },
    ],
    correct: "C",
    skills: ["algebra", "geometry", "ratio"],
  },

  {
    id: 33,
    stage: 5,
    level: "5pt",
    year: 2026,
    grade_group: "9-10",
    text_en:
      "Charles and Paul alternate in taking toffees out of a box: Charles takes 1, then Paul takes 2, then Charles takes 3, then Paul takes 4, and so on. When there are not enough toffees to follow this pattern, the boy whose turn it is takes all of the remaining ones. At the end, Charles has 407 toffees. How many toffees were in the box at the beginning?",
    text_fa:
      "چارلز و پل به نوبت تافی از جعبه‌ای برمی‌دارند: چارلز ۱، پل ۲، چارلز ۳، پل ۴ و به همین ترتیب. وقتی به اندازه کافی نباشد، هر کس نوبتش باشد بقیه را می‌گیرد. در پایان چارلز ۴۰۷ تافی دارد. اول چند تافی در جعبه بود؟",
    options: [
      { id: "A", text_en: "814", text_fa: "۸۱۴" },
      { id: "B", text_en: "827", text_fa: "۸۲۷" },
      { id: "C", text_en: "834", text_fa: "۸۳۴" },
      { id: "D", text_en: "841", text_fa: "۸۴۱" },
      { id: "E", text_en: "851", text_fa: "۸۵۱" },
    ],
    correct: "B",
    skills: ["arithmetic", "pattern-recognition", "series"],
  },

  // ════════════════════════════════════════════════════════════════
  //  2026  ·  GRADES 11 AND 12
  // ════════════════════════════════════════════════════════════════

  {
    id: 34,
    stage: 6,
    level: "3pt",
    year: 2026,
    grade_group: "11-12",
    text_en:
      "Ali made seven folds in a strip of paper with a white side and a dark side, as seen in the figure. He then unfolded the paper. What does the white side of the paper look like after unfolding?",
    text_fa:
      "علی هفت تا روی یک نوار کاغذ که یک طرف سفید و یک طرف تیره دارد زد. سپس کاغذ را باز کرد. طرف سفید کاغذ بعد از باز شدن چه شکلی دارد؟",
    options: [
      { id: "A", text_en: "Option A", text_fa: "گزینه A" },
      { id: "B", text_en: "Option B", text_fa: "گزینه B" },
      { id: "C", text_en: "Option C", text_fa: "گزینه C" },
      { id: "D", text_en: "Option D", text_fa: "گزینه D" },
      { id: "E", text_en: "Option E", text_fa: "گزینه E" },
    ],
    correct: "C",
    skills: ["spatial-reasoning", "symmetry"],
  },

  {
    id: 35,
    stage: 6,
    level: "4pt",
    year: 2026,
    grade_group: "11-12",
    text_en:
      "Two points P and Q are randomly placed on a line segment AB, with neither at the mid-point. What is the probability that the line segment PQ contains the mid-point of AB?",
    text_fa:
      "دو نقطه P و Q به‌طور تصادفی روی پاره‌خط AB قرار می‌گیرند، هیچ‌کدام روی نقطه میانی نیستند. احتمال اینکه پاره‌خط PQ نقطه میانی AB را دربرگیرد چقدر است؟",
    options: [
      { id: "A", text_en: "1/4", text_fa: "۱/۴" },
      { id: "B", text_en: "1/3", text_fa: "۱/۳" },
      { id: "C", text_en: "1/2", text_fa: "۱/۲" },
      { id: "D", text_en: "2/3", text_fa: "۲/۳" },
      { id: "E", text_en: "3/4", text_fa: "۳/۴" },
    ],
    correct: "C",
    skills: ["probability", "geometry"],
  },

  {
    id: 36,
    stage: 6,
    level: "5pt",
    year: 2026,
    grade_group: "11-12",
    text_en:
      "For a number x > 0, define the triangular root △x to be the value s > 0 such that s(s+1)/2 = x. Which of the following is always equal to the triangular root of (4x − △x)?",
    text_fa:
      "برای عدد x > 0، ریشه مثلثاتی △x را مقدار s > 0 تعریف می‌کنیم به طوری که s(s+1)/2 = x. کدام یک از موارد زیر همیشه برابر ریشه مثلثاتی (4x − △x) است؟",
    options: [
      { id: "A", text_en: "2△x", text_fa: "2△x" },
      { id: "B", text_en: "4△x − 1", text_fa: "4△x − ۱" },
      { id: "C", text_en: "3△x", text_fa: "3△x" },
      { id: "D", text_en: "△(x² + x)", text_fa: "△(x² + x)" },
      { id: "E", text_en: "△x + 1", text_fa: "△x + ۱" },
    ],
    correct: "E",
    skills: ["algebra", "functions", "series"],
  },
];
