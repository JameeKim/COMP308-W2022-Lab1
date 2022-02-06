export interface Course {
  code: string;
  name: string;
  sections: number;
}

export const courseCmp = (c1: Readonly<Course>, c2: Readonly<Course>): number =>
  c1.code > c2.code ? 1 : -1;

const courses: readonly Readonly<Course>[] = [
  {
    code: "COMP308",
    name: "Emerging Technologies",
    sections: 5,
  },
  {
    code: "COMP395",
    name: "Simulation Design",
    sections: 1,
  },
  {
    code: "COMP397",
    name: "Web Game Programming",
    sections: 2,
  },
  {
    code: "COMP217",
    name: "C++ for Game Development",
    sections: 2,
  },
  {
    code: "COMP231",
    name: "Software Development Project 1",
    sections: 7,
  },
  {
    code: "COMP311",
    name: "Software Testing and Quality Assurance",
    sections: 4,
  },
  {
    code: "COMP254",
    name: "Data Structures and Algorithms",
    sections: 9,
  },
];

export default courses;
