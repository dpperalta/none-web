module.exports = {
  1: {
    question: `¿El Ecuador como república independiente, en qué año se estableció?`,
    fact: `Fue el 10 de Agosto de 1822`,
    choices: [
      {
        id: Math.random(),
        item: "1820",
        answer: false
      },
      {
        id: Math.random(),
        item: "1822",
        answer: true
      }
    ]
  },
  2: {
    question: `¿Quién fue el primer presidente del Ecuador?`,
    fact: `Fue Juan José Flores`,
    choices: [
      {
        id: Math.random(),
        item: "Juan José Flores",
        answer: true
      },
      {
        id: Math.random(),
        item: "Eloy Alfaro",
        answer: false
      }
    ]
  },
  3: {
    question: `¿Cuál es la capital de Ecuador?`,
    fact: `La capital es Quito`,
    choices: [
      {
        id: Math.random(),
        item: "Guayaquil",
        answer: false
      },
      {
        id: Math.random(),
        item: "Quito",
        answer: true
      }
    ]
  }
};
