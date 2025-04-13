import {
  MigrateDownArgs,
  MigrateUpArgs,
} from '@payloadcms/db-mongodb'

export async function up({ payload, req, session }: MigrateUpArgs): Promise<void> {
  // Migration code
  // THIS IS NOT RECOMMENDED WAY TO SEEDING DATA INTO DATABASE
  const userDoc1 = await payload.create({
    collection: 'users',
    data: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'Admin123',
      active: true
    }
  })

  const jobDoc1 = await payload.create({
    collection: 'jobs',
    data: {
      title: 'Software Engineer',
      description: 'We are looking for a talented software engineer to join our team.',
      location: 'remote',
      salary: 100000,
      isActive: true
    }
  })

  const jobDoc2 = await payload.create({
    collection: 'jobs',
    data: {
      title: 'Product Manager',
      description: 'We are looking for a talented product manager to join our team.',
      location: 'onsite',
      salary: 100000,
      isActive: true
    }
  })

  const jobDoc3 = await payload.create({
    collection: 'jobs',
    data: {
      title: 'UX Designer',
      description: 'We are looking for a talented UX designer to join our team.',
      location: 'hybrid',
      salary: 100000,
      isActive: true
    }
  })

  const jobApplicationDoc1 = await payload.create({
    collection: 'job-applications',
    data: {
      name: 'John Doe',
      email: 'LgMlG@example.com',
      status: 'applied',
      job: jobDoc1.id,
    },
  })

  const jobApplicationDoc2 = await payload.create({
    collection: 'job-applications',
    data: {
      name: 'Jane Doe',
      email: '9M4oZ@example.com',
      status: 'interviewing',
      job: jobDoc2.id,
    }
  })

  const jobApplicationDoc3 = await payload.create({
    collection: 'job-applications',
    data: {
      name: 'John Doe',
      email: 'LgMlG@example.com',
      status: 'selected',
      job: jobDoc3.id,
    }
  })

  const question1 = await payload.create({
    collection: 'questions',
    data: {
      title: 'What is React?',
      description: 'Explain the concept of React.',
      duration: 30,
      questionType: 'essay',
      response: 'write a short essay on React here...'
    }
  })

  const question2 = await payload.create({
    collection: 'questions',
    data: {
      title: 'What is full stack development?',
      description: 'Explain the concept of full stack development.',
      duration: 30,
      questionType: 'essay',
      response: 'write a short essay on full stack development here...'
    }
  })

  const question3 = await payload.create({
    collection: 'questions',
    data: {
      title: 'What is a database?',
      description: 'Explain the concept of a database.',
      duration: 30,
      questionType: 'essay',
      response: 'write a short essay on a database here...'
    }
  })

  const question4 = await payload.create({
    collection: 'questions',
    data: {
      title: 'What is a full stack developer?',
      description: 'Explain the concept of a full stack developer.',
      duration: 30,
      questionType: 'mcq',
      options: [
        {
          option: 'Frontend Development',
          isCorrect: false,
        },
        {
          option: 'Backend Development',
          isCorrect: false,
        },
        {
          option: 'Database Management',
          isCorrect: false,
        },
        {
          option: 'All of the above',
          isCorrect: true,
        },
      ],
    }
  })

  const question5 = await payload.create({
    collection: 'questions',
    data: {
      title: 'What is MongoDB?',
      description: 'Explain the concept of MongoDB.',
      duration: 30,
      questionType: 'mcq',
      options: [
        {
          option: 'SQL Database',
          isCorrect: false,
        },
        {
          option: 'NoSQL Database',
          isCorrect: true,
        },
        {
          option: 'In-memory Database',
          isCorrect: false,
        },
        {
          option: 'Graph Database',
          isCorrect: false,
        },
      ],
    },
  })

  const question6 = await payload.create({
    collection: 'questions',
    data: {
      title: 'What is JavaScript?',
      description: 'Explain the concept of JavaScript.',
      duration: 30,
      questionType: 'mcq',
      options: [
        {
          option: 'Programming Language',
          isCorrect: true,
        },
        {
          option: 'Markup Language',
          isCorrect: false,
        },
        {
          option: 'Style Sheet Language',
          isCorrect: false,
        },
        {
          option: 'Database Query Language',
          isCorrect: false,
        },
      ],
    },
  })

  const assesmentDoc1 = await payload.create({
    collection: 'assesments',
    data: {
      title: 'Software Engineer',
      description: 'This is a software engineer assesment.',
      job: jobDoc1.id,
      questons: [question1.id, question2.id, question3.id, question4.id, question5.id, question6.id]
    }
  })
}

export async function down({ payload, req, session }: MigrateDownArgs): Promise<void> {
  // Migration code
}
