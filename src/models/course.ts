export interface Course {
  code: string;
  name: string;
  sections: number;
}

const courses: Readonly<Record<string, Readonly<Course>>> = {
  "COMP308": {
    code: "COMP308",
    name: "Emerging Technologies",
    sections: 5,
  },
  "COMP395": {
    code: "COMP395",
    name: "Simulation Design",
    sections: 1,
  },
  "COMP397": {
    code: "COMP397",
    name: "Web Game Programming",
    sections: 2,
  },
  "COMP217": {
    code: "COMP217",
    name: "C++ for Game Development",
    sections: 2,
  },
  "COMP231": {
    code: "COMP231",
    name: "Software Development Project 1",
    sections: 7,
  },
  "COMP311": {
    code: "COMP311",
    name: "Software Testing and Quality Assurance",
    sections: 4,
  },
  "COMP254": {
    code: "COMP254",
    name: "Data Structures and Algorithms",
    sections: 9,
  },
};

export default courses;
