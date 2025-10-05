import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const setupDatabase = () => {
  return open({
    filename: './public/database/products.db',
    driver: sqlite3.Database
  }).then(db => {
    return db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        price REAL,
        availability TEXT,
        image TEXT,
        description TEXT
      )
    `).then(() => {
      return db.get("SELECT COUNT(*) AS count FROM products")
        .then(result => {
          if (result.count === 0) {
            return db.run(`
              INSERT INTO products (name, category, price, availability, image, description)
              VALUES
                ('Honda Civic', 'Sedan', 65.00, 'Available', '/images/hondaCivic.jpg', 'Compact, efficient, perfect for city driving.'),
                ('Toyota RAV4', 'SUV', 80.00, 'Available', '/images/toyotaRav4.jpg', 'Spacious and reliable for family trips.'),
                ('Ford Mustang', 'Sports', 120.00, 'Rented Out', '/images/fordMustang.jpg', 'Stylish convertible for scenic drives.'),
                ('Chevrolet Malibu', 'Sedan', 70.00, 'Available', '/images/chevyMalibu.jpg', 'Comfortable, mid-size ride for long commutes.'),
                ('Jeep Wrangler', 'SUV', 95.00, 'Available', '/images/jeepWrangler.jpg', 'Adventure-ready offroad vehicle.'),
                ('Tesla Model 3', 'Electric', 130.00, 'Available', '/images/teslaModel.jpg', 'Electric luxury with autopilot.'),
                ('Nissan Altima', 'Sedan', 68.00, 'Rented Out', '/images/nissanAltima.jpg', 'Smooth performance and great MPG.'),
                ('BMW X5', 'Luxury SUV', 150.00, 'Available', '/images/bmwX5.jpg', 'Luxury comfort meets power.'),
                ('Hyundai Sonata', 'Sedan', 60.00, 'Available', '/images/hyundaiSonata.jpg', 'Affordable daily rental option.'),
                ('Chevy Corvette', 'Sports', 200.00, 'Available', '/images/chevyCorvette.jpg', 'High-end performance and speed.')
            `);
          }
        });
    }).then(() => {
      console.log('Database setup complete.');
    });
  });
};

export const getDbConnection = () => {
  return open({
    filename: './public/database/products.db',
    driver: sqlite3.Database
  });
};
