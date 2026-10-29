import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Curriculum from '@/models/Curriculum';

export async function GET() {
  try {
    await dbConnect();

    await Curriculum.deleteMany({});

    const realCurriculum = [
      {
        grade: 8,
        stream: 'General',
        courses: [
          {
            title: 'General Science',
            description: 'Grade 8 Integrated General Science covering basic physics, chemistry, and biology.',
            lessons: [
              { title: 'Unit 1: Earth in Space', content: 'The solar system, rotation, and revolution.', videoUrl: '' },
              { title: 'Unit 2: Matter and Materials', content: 'States of matter and simple chemical changes.', videoUrl: '' }
            ]
          },
          {
            title: 'Mathematics',
            description: 'Grade 8 Mathematics foundational topics.',
            lessons: [
              { title: 'Unit 1: Squares and Square Roots', content: 'Finding square roots and Pythagorean theorem.', videoUrl: '' }
            ]
          }
        ]
      },
      {
        grade: 9,
        stream: 'General',
        courses: [
          {
            title: 'Mathematics',
            description: 'Grade 9 Mathematics based on the Ethiopian Ministry of Education curriculum.',
            lessons: [
              { title: 'Unit 1: Sets', content: 'Introduction to set theory, operations on sets, and Venn diagrams.', videoUrl: '' },
              { title: 'Unit 2: The Number System', content: 'Rational and irrational numbers, real number properties.', videoUrl: '' }
            ]
          },
          {
            title: 'Physics',
            description: 'Grade 9 Physics foundation concepts.',
            lessons: [
              { title: 'Unit 1: Physics and Human Society', content: 'Scientific method, measurements, and physical quantities.', videoUrl: '' }
            ]
          }
        ]
      },
      {
        grade: 10,
        stream: 'General',
        courses: [
          {
            title: 'Chemistry',
            description: 'Grade 10 Chemistry core concepts.',
            lessons: [
              { title: 'Unit 1: Chemical Reaction and Stoichiometry', content: 'Balancing equations and mole concepts.', videoUrl: '' }
            ]
          },
          {
            title: 'Biology',
            description: 'Grade 10 Biology and life processes.',
            lessons: [
              { title: 'Unit 1: Heredity and Evolution', content: 'Mendelian genetics and genetic inheritance.', videoUrl: '' }
            ]
          }
        ]
      },
      // Grade 11: Natural Sciences
      {
        grade: 11,
        stream: 'Natural Sciences',
        courses: [
          {
            title: 'Advanced Physics',
            description: 'Mechanics, vectors, and motion for Grade 11 Natural Sciences.',
            lessons: [
              { title: 'Unit 1: Vectors', content: 'Vector addition, resolution, and dot/cross products.', videoUrl: '' }
            ]
          },
          {
            title: 'Organic Chemistry',
            description: 'Hydrocarbons and functional groups.',
            lessons: [
              { title: 'Unit 1: Introduction to Organic Chemistry', content: 'Covalent bonding in carbon and alkanes.', videoUrl: '' }
            ]
          }
        ]
      },
      // Grade 11: Social Sciences
      {
        grade: 11,
        stream: 'Social Sciences',
        courses: [
          {
            title: 'Economics',
            description: 'Introduction to microeconomics and the Ethiopian economy.',
            lessons: [
              { title: 'Unit 1: Nature and Scope of Economics', content: 'Scarcity, choice, opportunity cost, and economic systems.', videoUrl: '' },
              { title: 'Unit 2: Demand and Supply Analysis', content: 'Market equilibrium, price elasticity, and consumer behavior.', videoUrl: '' }
            ]
          },
          {
            title: 'Geography',
            description: 'Physical and regional geography of Ethiopia and the Horn of Africa.',
            lessons: [
              { title: 'Unit 1: Geology and Relief of Ethiopia', content: 'Major geologic eras, rock types, and physiographic divisions.', videoUrl: '' }
            ]
          },
          {
            title: 'History',
            description: 'Global and Ethiopian history from medieval times to the 16th century.',
            lessons: [
              { title: 'Unit 1: Peoples and States of Ethiopia', content: 'Ancient civilizations, trade networks, and kingdom expansions.', videoUrl: '' }
            ]
          }
        ]
      },
      // Grade 12: Natural Sciences
      {
        grade: 12,
        stream: 'Natural Sciences',
        courses: [
          {
            title: 'Grade 12 Physics',
            description: 'Electromagnetism, quantum mechanics, and electronics for Ethiopian preparatory students.',
            lessons: [
              { title: 'Unit 1: Electrostatics', content: 'Coulomb’s law, electric fields, and electric potential energy.', videoUrl: '' }
            ]
          },
          {
            title: 'Grade 12 Biology',
            description: 'Advanced biotechnology and human physiology.',
            lessons: [
              { title: 'Unit 1: Application of Biology', content: 'Recombinant DNA technology and genetic engineering.', videoUrl: '' }
            ]
          }
        ]
      },
      // Grade 12: Social Sciences
      {
        grade: 12,
        stream: 'Social Sciences',
        courses: [
          {
            title: 'Macroeconomics',
            description: 'National income, monetary policy, and international trade.',
            lessons: [
              { title: 'Unit 1: National Income Accounting', content: 'GDP, GNP, inflation, and unemployment measurements.', videoUrl: '' }
            ]
          },
          {
            title: 'History',
            description: 'Ethiopian modern history and global developments in the 19th and 20th centuries.',
            lessons: [
              { title: 'Unit 1: Making of Modern Ethiopia', content: 'The Zemene Mesafint, unification, and modern administrative reforms.', videoUrl: '' }
            ]
          }
        ]
      }
    ];

    await Curriculum.insertMany(realCurriculum);

    return NextResponse.json({ 
      success: true, 
      message: "Successfully seeded full curriculum including Social Sciences into MongoDB!" 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}