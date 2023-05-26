// Extend Prisma Model to Accept Conditions, Example Question:
const exampleSchema = {
  id: 5,
  title: 'Multiple Question Type Example',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sint ex odio et consectetur ullam placeat ea in alias corporis',
  type: 'multiple',
  choiceConditonals: {
    Executive: 2,
    Legislative: 3,
    Judicial: 4,
    Financial: 5,
  },
}

// Answers are presented in an object, where the answer is the key and the next question is the value
// Answer is saved as normal, and corresponding Question ID is passed to route to appropriate question
