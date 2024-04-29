const sql = require('better-sqlite3');
const db = sql('SwiftCart.db');

const dummyCategories = [
   {
      name: 'Electronics',
      slug: 'electronics',
      description: `Find the perfect devices to fit your personal and professional goals.`,
      image: '/images/sample-images/electronics.webp',
      parentCategoryId: 0,
      published: 0,
      createdOn: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Gaming consoles',
      slug: 'gaming-consoles',
      description: `Dominate your living room with the power and performance of a home console.`,
      image: '/images/sample-images/gaming-console.webp',
      parentCategoryId: 1,
      published: 0,
      createdOn: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Cell phones',
      slug: 'cell-phones',
      description: `Dive into the world of mobile technology and discover the perfect device to fit your needs.`,
      image: '/images/sample-images/cell-phone.webp',
      parentCategoryId: 1,
      published: 0,
      createdOn: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Computers',
      slug: 'computers',
      description: `Whether you're a hardcore gamer, a creative professional, a productivity powerhouse, or a casual user, we have the ideal computer to meet your needs.`,
      image: '/images/sample-images/computer.webp',
      parentCategoryId: 0,
      published: 0,
      createdOn: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Laptops',
      slug: 'laptops',
      description: `Find the perfect companion for everyday tasks with our selection of affordable and reliable laptops perfect for browsing, streaming, and keeping up with work or school.`,
      image: '/images/sample-images/laptops.webp',
      parentCategoryId: 4,
      published: 0,
      createdOn: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Desktop',
      slug: 'desktop',
      description: `Build your dream machine with a wide range of upgradeable components, allowing you to tailor your desktop to your specific needs and budget.`,
      image: '/images/sample-images/desktop.webp',
      parentCategoryId: 4,
      published: 0,
      createdOn: '2023-11-23 09:25:38.0000000',
   }
];

const dummyCustomers = [
   {
      firstName: 'Will',
      lastName: 'Smith',
      email: `will.smith@swiftcart.com`,
      passwordHash: '0x5708D0BAD8F925D9E460940B2939F911AF13856A930210AA60D2A70B5EF202A60D947A081B8C2A7D431575A4C78974E10AD4AA3D4D41A38CB2D31901BDC9F265',
      isActive: 1,
      createdOn: '2023-11-23 09:25:38.0000000',
   },
   {
      firstName: 'Faraz',
      lastName: 'Arif',
      email: `faraz.arif@paymytuition.com`,
      passwordHash: '0x5708D0BAD8F925D9E460940B2939F911AF13856A930210AA60D2A70B5EF202A60D947A081B8C2A7D431575A4C78974E10AD4AA3D4D41A38CB2D31901BDC9F265',
      isActive: 1,
      createdOn: '2023-11-23 09:25:38.0000000',
   }
]

db.prepare(`
    CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      parentCategoryId INT NOT NULL,
      published BOOLEAN NOT NULL,
      createdOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedOn DATETIME DEFAULT NULL
   );
`).run();

async function initCategoryData() {
   const sql = `
  INSERT INTO Category (
    name,
    slug,
    description,
    image,
    parentCategoryId,
    published,
    createdOn
  )
  VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)  -- Use database function
`;

   const stmt = db.prepare(sql);

   for (const category of dummyCategories) {
      const data = [
         category.name,
         category.slug,
         category.description,
         category.image,
         category.parentCategoryId,
         category.published,
      ];
      await stmt.run(data);
   }
}

db.prepare(`
CREATE TABLE IF NOT EXISTS Customers (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   firstName TEXT NOT NULL,
   lastName TEXT NOT NULL,
   email TEXT NOT NULL,
   passwordHash TEXT NOT NULL,
   isActive BOOLEAN NOT NULL,
   createdOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   lastLoginOn DATETIME DEFAULT NULL
);
`).run();

async function initCustomerData() {
   const sql = `
   INSERT INTO Customers (
      firstName,
      lastName,
      email,
      passwordHash,
      isActive,
      createdOn
    )
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)  -- Use database function
  `;

   const stmt = db.prepare(sql);

   for (const customer of dummyCustomers) {
      const data = [
         customer.firstName,
         customer.lastName,
         customer.email,
         customer.passwordHash,
         customer.isActive,
      ];
      await stmt.run(data);
   }
}

initCategoryData();
initCustomerData();