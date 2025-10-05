// database.js
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'inventory.sqlite'));
db.pragma('journal_mode = WAL');

db.prepare(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  daily_rate REAL NOT NULL,
  available INTEGER NOT NULL,
  image_url TEXT NOT NULL
)`).run();

const { c } = db.prepare('SELECT COUNT(*) AS c FROM products').get();
if (!c) {
  const rows = [
    ["Civic LX (2022)", "Honda", "Compact", "Reliable compact sedan with great mileage.", 44.99, 6, "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop"],
    ["BMW 5 series (2023)", "BMW", "Compact", "Sport-trim BMW, Apple CarPlay/Android Auto.", 46.5, 5, "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop"],
    ["Model 3 RWD (2023)", "Tesla", "EV", "All-electric; basic autopilot.", 89, 3, "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop"],
    ["Honda Accord(2022)", "Honda", "Midsize", "Roomy midsize with safety suite.", 58, 4, "https://images.unsplash.com/photo-1618835962148-cf177563c94f?q=80&w=1200&auto=format&fit=crop"],
    ["RAV4 AWD (2023)", "Toyota", "SUV", "Compact SUV, AWD.", 69, 4, "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"],
    ["BMW X5 (2022)", "BMW", "SUV", "Family friendly SUV.", 67, 4, "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"],
    ["Wrangler Sport (2021)", "Jeep", "SUV", "Adventure-ready.", 92, 2, "https://images.unsplash.com/photo-1542367597-8849eb90f2d2?q=80&w=1200&auto=format&fit=crop"],
    ["Porche GT3-RS (2017)", "Porche", "Sport", "Sporty coupe.", 95, 2, "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"],
    ["Sienna 8-Pass (2022)", "Toyota", "Minivan", "Road-trip ready.", 79, 3, "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1200&auto=format&fit=crop"],
    ["Toyota Tacoma (2021)", "Toyota", "Truck", "Half-ton pickup.", 84, 3, "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200&auto=format&fit=crop"],
  ];
  const stmt = db.prepare(`INSERT INTO products (name,brand,category,description,daily_rate,available,image_url) VALUES (?,?,?,?,?,?,?)`);
  const tx = db.transaction(rs => rs.forEach(r => stmt.run(...r)));
  tx(rows);
}

function getAllProducts() {
  return db.prepare('SELECT * FROM products ORDER BY brand, name').all();
}
function getProductById(id) {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
}

module.exports = { getAllProducts, getProductById };
