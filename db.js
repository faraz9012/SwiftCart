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
      published: 1,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
      isDeleted: 0
   },
   {
      name: 'Gaming consoles',
      slug: 'gaming-consoles',
      description: `Dominate your living room with the power and performance of a home console.`,
      image: '/images/sample-images/gaming-console.webp',
      parentCategoryId: 1,
      published: 1,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
      isDeleted: 0
   },
   {
      name: 'Cell phones',
      slug: 'cell-phones',
      description: `Dive into the world of mobile technology and discover the perfect device to fit your needs.`,
      image: '/images/sample-images/cell-phone.webp',
      parentCategoryId: 1,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
      isDeleted: 0
   },
   {
      name: 'Computers',
      slug: 'computers',
      description: `Whether you're a hardcore gamer, a creative professional, a productivity powerhouse, or a casual user, we have the ideal computer to meet your needs.`,
      image: '/images/sample-images/computer.webp',
      parentCategoryId: 0,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
      isDeleted: 0
   },
   {
      name: 'Laptops',
      slug: 'laptops',
      description: `Find the perfect companion for everyday tasks with our selection of affordable and reliable laptops perfect for browsing, streaming, and keeping up with work or school.`,
      image: '/images/sample-images/laptops.webp',
      parentCategoryId: 4,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
      isDeleted: 0
   },
   {
      name: 'Desktop',
      slug: 'desktop',
      description: `Build your dream machine with a wide range of upgradeable components, allowing you to tailor your desktop to your specific needs and budget.`,
      image: '/images/sample-images/desktop.webp',
      parentCategoryId: 4,
      published: 0,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
      isDeleted: 0
   }
];

// Password for this user is admin@123
const dummyUsers = [
   {
      firstName: 'Super',
      lastName: 'Admin',
      email: `admin@yourstore.com`,
      role: "Super Administrators",
      passwordHash: '5d29bf929ebdea915096bc728851bc40f2f67a414aef0ae8aeaad7862a167a789a9eee4e7798f734614cb042d775e3165abb943c3e641be05006126df5f935db:f4ebc018aaf0834d2e129ae5c0f8bffa',
      isActive: 1,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
   }
]

const UserRoles = [
   {
      name: "Super Administrators",
      systemName: "SuperAdmin"
   },
   {
      name: "Administrators",
      systemName: "Admin"
   },
   {
      name: "Registered",
      systemName: "Registered"
   },
   {
      name: "Guests",
      systemName: "Guests"
   }
]

const UserRoleMapping = [
   {
      userEmail: 'admin@yourstore.com',
      roleSystemName: 'SuperAdmin'
   },
]

const PermissionRecord = [
   {
      name: "Access admin area",
      systemName: "AccessAdminPanel",
      category: "Standard"
   },
   {
      name: "Admin area. Manage Products",
      systemName: "ManageProducts",
      category: "Catalog"
   },
   {
      name: "Admin area. Manage Categories",
      systemName: "ManageCategories",
      category: "Catalog"
   },
   {
      name: "Admin area. Manage Orders",
      systemName: "ManageOrders",
      category: "Orders"
   },
   {
      name: "Admin area. Manage Configurations",
      systemName: "ManageConfigurations",
      category: "Configurations"
   },
]

const PermissionRecordMapping = [
   {
      permissionRecordId: 1,
      userRoleId: 1
   },
   {
      permissionRecordId: 2,
      userRoleId: 1
   },
   {
      permissionRecordId: 3,
      userRoleId: 1
   },
   {
      permissionRecordId: 4,
      userRoleId: 1
   },
   {
      permissionRecordId: 5,
      userRoleId: 1
   },
]

const dummyProducts = [
   {
      name: 'Playstation 5 Digital Edition',
      slug: 'playstation-5-digital-edition',
      shortDescription: `The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment.`,
      longDescription: 'The PS5 is part of the ninth generation of video game consoles, along with Microsoft\'s Xbox Series X/S consoles, which were released in the same month.',
      featuredImageId: 1,
      price: 399,
      categoryId: 2,
      published: 1,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
      isDeleted: 0
   },
   {
      name: 'Xbox Series X',
      slug: 'xbox-series-x',
      shortDescription: `Xbox is a video gaming brand that consists of five home video game consoles, as well as applications (games)`,
      longDescription: 'The fourth generation of Xbox models, simply named Xbox, includes the Xbox Series X and Xbox Series S that use an AMD 64-bit x86-64 CPU and GPU with up to 16 GB of memory.',
      featuredImageId: 2,
      price: 499,
      categoryId: 2,
      published: 1,
      createdOnUTC: '2023-11-23 09:25:38.0000000',
      isDeleted: 0
   },
];

const dummyPictures = [
   {
      name: 'Playstation 5 Digital Edition',
      mimeType: 'image/webp',
      srcAttribute: `/images/sample-images/gaming-console.webp`,
      altAttribute: 'Playstation 5 digital edition',
      titleAttribute: 'Playstan 5 console'
   },
   {
      name: 'Xbox Series X',
      mimeType: 'image/webp',
      srcAttribute: `/images/sample-images/xbox-series-x.webp`,
      altAttribute: 'Xbox Series X',
      titleAttribute: 'Xbox Series X'
   },
];

//#endregion

//#region Create table

// Category
db.exec(`
    CREATE TABLE IF NOT EXISTS Category (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      parentCategoryId INT NOT NULL,
      published BOOLEAN NOT NULL,
      createdOnUTC DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedOnUTC DATETIME DEFAULT NULL,
      isDeleted BOOLEAN NOT NULL DEFAULT 0
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
   name TEXT NOT NULL,
   systemName TEXT NOT NULL UNIQUE
 );
`
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

// Permission Records
db.exec(`
CREATE TABLE IF NOT EXISTS PermissionRecord (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name TEXT NOT NULL,
   systemName TEXT NOT NULL UNIQUE,
   category TEXT NOT NULL
 );`
);

// Permission Records Mapping
db.exec(`
CREATE TABLE IF NOT EXISTS PermissionRecordMapping (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   permission_id INTEGER NOT NULL,
   role_id INTEGER NOT NULL,
   FOREIGN KEY (permission_id) REFERENCES PermissionRecord(Id),
   FOREIGN KEY (role_id) REFERENCES UserRole(Id)
 );`
);

// Products
db.exec(`
   CREATE TABLE IF NOT EXISTS Product (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL UNIQUE,
     slug TEXT NOT NULL UNIQUE,
     shortDescription TEXT NOT NULL,
     longDescription TEXT NOT NULL,
     featuredPictureId INTEGER DEFAULT 0,
     price DECIMAL(10,5) NOT NULL DEFAULT 0, 
     published BOOLEAN NOT NULL,
     createdOnUTC DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updatedOnUTC DATETIME DEFAULT NULL,
     isDeleted BOOLEAN NOT NULL DEFAULT 0
  )`
);

// Product Category Mapping
db.exec(`
   CREATE TABLE IF NOT EXISTS ProductCategoryMapping (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      FOREIGN KEY (category_id) REFERENCES Category(Id),
      FOREIGN KEY (product_id) REFERENCES Product(Id)
    );`
);

// Pictures
db.exec(`
   CREATE TABLE IF NOT EXISTS Picture (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT,
     mimeType TEXT,
     srcAttribute TEXT,
     altAttribute TEXT,
     titleAttribute TEXT
  );`
);

// Product Pictures Mapping
db.exec(`
   CREATE TABLE IF NOT EXISTS ProductPictureMapping (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     product_id INTEGER NOT NULL,
     picture_id INTEGER NOT NULL,
     FOREIGN KEY (product_id) REFERENCES Product(Id),
     FOREIGN KEY (picture_id) REFERENCES Picture(Id)
  )`
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
    createdOnUTC,
    isDeleted
  )
  VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP,?)  -- Use database function
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
         category.isDeleted
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
    INSERT INTO UserRole (name, systemName)
    VALUES (?, ?)  -- Use database function
  `;

   const stmt = db.prepare(sql);

   for (const userRole of UserRoles) {
      const data = [
         userRole.name,
         userRole.systemName
      ];
      await stmt.run(data);
   }
}

async function initUserRoleMappingData() {
   const sql = `
   INSERT INTO UserRoleMapping (user_id, role_id)
   VALUES (?, ?)
   `;

   const stmt = db.prepare(sql);
   const getUserIdByEmail = db.prepare('SELECT id FROM User WHERE email = ?');
   const getRoleIdBySystemName = db.prepare('SELECT id FROM UserRole WHERE systemName = ?');

   for (const rm of UserRoleMapping) {
      const user = getUserIdByEmail.get(rm.userEmail);
      const role = getRoleIdBySystemName.get(rm.roleSystemName);
      if (!user || !role) continue;
      const data = [user.id, role.id];
      await stmt.run(data);
   }
}

async function initPermissionRecordData() {
   const sql = `
   INSERT INTO PermissionRecord (name, systemName, category)
   VALUES (?, ?, ?)
   `;

   const stmt = db.prepare(sql);

   for (const pr of PermissionRecord) {
      const data = [
         pr.name,
         pr.systemName,
         pr.category
      ];
      await stmt.run(data);
   }
}

async function initPermissionRecordMappingData() {
   const sql = `
   INSERT INTO PermissionRecordMapping (permission_id, role_id)
   VALUES (?, ?)
   `;

   const stmt = db.prepare(sql);

   for (const prm of PermissionRecordMapping) {
      const data = [prm.permissionRecordId, prm.userRoleId];
      await stmt.run(data);
   }
}

async function initProductData() {
   const sql = `
  INSERT INTO Product (
    name,
    slug,
    shortDescription,
    longDescription,
    featuredPictureId,
    price,
    published,
    createdOnUTC,
    isDeleted
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP,?)  -- Use database function
`;

   const stmt = db.prepare(sql);

   for (const product of dummyProducts) {
      const data = [
         product.name,
         product.slug,
         product.shortDescription,
         product.longDescription,
         product.featuredImageId,
         product.price,
         product.published,
         product.isDeleted
      ];
      await stmt.run(data);
   }
}

async function initPictureData() {
   const sql = `
   INSERT INTO Picture (name, mimeType, srcAttribute, altAttribute, titleAttribute)
   VALUES (?, ?, ?, ?, ?)
   `;

   const stmt = db.prepare(sql);

   for (const picture of dummyPictures) {
      const data = [
         picture.name,
         picture.mimeType, 
         picture.srcAttribute,
         picture.altAttribute,
         picture.titleAttribute
      ];
      await stmt.run(data);
   }
}
//#endregion

//#region Initate method to populate table

initCategoryData();
initProductData();
initUserData();
initUserRoleData();
initPermissionRecordData();
initPictureData();

initUserRoleMappingData();
initPermissionRecordMappingData();
//#endregion
