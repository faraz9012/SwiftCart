const sql = require('better-sqlite3');
const db = sql('SwiftCart.db');

//#region Dummy data
const dummyCategories = [
   {
      name: 'Electronics',
      slug: 'electronics',
      description: `Find the perfect devices to fit your personal and professional goals.`,
      image: '/images/sample-images/electronics.webp',
      parentCategoryId: 0,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Gaming consoles',
      slug: 'gaming-consoles',
      description: `Dominate your living room with the power and performance of a home console.`,
      image: '/images/sample-images/gaming-console.webp',
      parentCategoryId: 1,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Cell phones',
      slug: 'cell-phones',
      description: `Dive into the world of mobile technology and discover the perfect device to fit your needs.`,
      image: '/images/sample-images/cell-phone.webp',
      parentCategoryId: 1,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Computers',
      slug: 'computers',
      description: `Whether you're a hardcore gamer, a creative professional, a productivity powerhouse, or a casual user, we have the ideal computer to meet your needs.`,
      image: '/images/sample-images/computer.webp',
      parentCategoryId: 0,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Laptops',
      slug: 'laptops',
      description: `Find the perfect companion for everyday tasks with our selection of affordable and reliable laptops perfect for browsing, streaming, and keeping up with work or school.`,
      image: '/images/sample-images/laptops.webp',
      parentCategoryId: 4,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
   },
   {
      name: 'Desktop',
      slug: 'desktop',
      description: `Build your dream machine with a wide range of upgradeable components, allowing you to tailor your desktop to your specific needs and budget.`,
      image: '/images/sample-images/desktop.webp',
      parentCategoryId: 4,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
   }
];

const dummyUsers = [
   {
      firstName: 'Faraz',
      lastName: 'Arif',
      email: `faraz.arif@paymytuition.com`,
      role: "Super Administrators",
      passwordHash: '877e1b1eb3d32f69cbc014f51a7f623d777b03cc0983df0ab3d5daa1534f26761e6c0812f43a5ad458e9f401d9c13c7864ecef647b98af62928e0090101b4c4f:f263035d67a3f2831f285dbf5fe05bac',
      isActive: 1,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
   }
]

const UserRoles = [
   {
      name: "Super Administrators"
   },
   {
      name: "Administrators",
   },
   {
      name: "Registered",
   },
   {
      name: "Guests",
   }
]

const UserRoleMapping = [
   {
      userId: 1,
      userRoleId: 1
   },
]
//#endregion

//#region Create table

// Category
db.exec(`
    CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      parentCategoryId INT NOT NULL,
      published BOOLEAN NOT NULL,
      createdOnUTC DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedOnUTC DATETIME DEFAULT NULL
   )`
);

// Users
db.exec(`
   CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      isActive BOOLEAN NOT NULL,    
      createdOnUTC DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      lastLoginOnUTC DATETIME DEFAULT NULL
   )`
);

// Sessions
db.exec(`
CREATE TABLE IF NOT EXISTS Session (
   id TEXT NOT NULL PRIMARY KEY,
   expires_at INTEGER NOT NULL,
   user_id TEXT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES User(Id)
 )`
);

// User Roles
db.exec(`
CREATE TABLE IF NOT EXISTS UserRole (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL
 )`
);

// User Role Mapping
db.exec(`
CREATE TABLE IF NOT EXISTS UserRoleMapping (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   user_id INTEGER NOT NULL,
   role_id INTEGER NOT NULL,
   FOREIGN KEY (user_id) REFERENCES User(Id),
   FOREIGN KEY (role_id) REFERENCES UserRole(Id)
 );`
);

//#endregion

//#region (Method) Populate table with dummy data
async function initCategoryData() {
   const sql = `
  INSERT INTO Category (
    name,
    slug,
    description,
    image,
    parentCategoryId,
    published,
    createdOnUTC
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

async function initUserData() {
   const sql = `
   INSERT INTO User (
      firstName,
      lastName,
      email,
      passwordHash,
      isActive,
      createdOnUTC
    )
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)  -- Use database function
  `;

   const stmt = db.prepare(sql);

   for (const user of dummyUsers) {
      const data = [
         user.firstName,
         user.lastName,
         user.email,
         user.passwordHash,
         user.isActive,
      ];
      await stmt.run(data);
   }
}

async function initUserRoleData() {
   const sql = `
      INSERT INTO UserRole (name)
      VALUES (?)  -- Use database function
   `;

   const stmt = db.prepare(sql);

   for (const userRole of UserRoles) {
      const data = [userRole.name];
      await stmt.run(data);
   }
}

async function initUserRoleMappingData() {
   const sql = `
   INSERT INTO UserRoleMapping (user_id, role_id)
   VALUES (?, ?)
   `;

   const stmt = db.prepare(sql);

   for (const rm of UserRoleMapping) {
      const data = [rm.userId, rm.userRoleId];
      await stmt.run(data);
   }
}
//#endregion

//#region Initate method to populate table

initCategoryData();
initUserData();
initUserRoleData();
initUserRoleMappingData();

//#endregion
