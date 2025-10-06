# Blueline-Auto-Rental

Design Strategy
Blue Line Car Rental is a web application prototype created for a small car rental business using a relational database with a modern and responsive UI built with EJS and Bootstrap. Some of the separation concerns was the handling of each different layer and structure within the app. By approaching the project with a goal of making the system digestible and maintainable, we went for a structured architecture. 
Database was to handle all data operations, creating product tables, storing car details, and any queries from site visitors via SQL database. Presenting this data was to be dealt with EJS template files and each page would use partials for consistent design throughout the website. Bootstrap is also in use for responsive UI design that users can efficiently find and interact with. Lastly, routing within the app.js file defines and processes user requests such as what page or pulled data should be displayed. 

Routes
The routes to each page can be found in the app.js file ensuring users are able to navigate to a desired page. This route links an EJS file that remains consistent as users seamlessly transition throughout the site.

Step-by-Step Building Process
1. Installation: Firstly, for the site to function properly, please install these dependencies:
-	npm init -y
-	npm i express ejs
-	npm install sqlite sqlite3 body-parser
Each of these servers has a purpose in handling routing, server logic, template rendering, and storing data locally within a SQL database.
 
2. Routes: Create different routes for each page found on the website, this is how users are able to visit certain links. These will be handled by the .get() and EJS rendering templates within the views/page/ folder. 
Inside app.js, routes established are:
-	Home Landing page = “/”
-	About the company = “/about”
-	Products - Vehicles = “/products”
-	Contact Form page= “/contact”


3. UI Implementation: For a responsive user interface Bootstrap was used in this prototype. Simply link the bootstrap CDN within the “head.ejs” file along with some scripting and minor CSS stylesheet. Without these links, vehicle would not be displayed without the card format nor would there be a feedback form within the Contact page.
Inside head.ejs:
-	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css
-	"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js
-	/css/styles.css


4. Data: In order to populate pages with data from the SQL database, it’s best to ensure that data is pulled in it’s correct form. This is best seen in the Product page as data on vehicles is requested from:
 	“getDBConnection().then(db => db.all(‘SELECT * FROM products’)) )” 
which is then sent to the Products page route (app.js) into the EJS as:
“data: cars”. 
Ending finally in the EJS loop for each vehicle data: 
<% data.forEach((car) => { %> … <% }) %>


5. Promises: Coordinating with the database is extremely important as when the application starts, the database should be connected and set up necessary tables if needed, and fetch car data should users visit the Products page. Essentially it’s a to-do list that checks down boxes as it moves down the list, within the database.js file, this is best seen when open() begins to connect to the database file and will return when connection is safely completed:
"export const setupDatabase = () => {
  return open({
    filename: './public/database/products.db',
    driver: sqlite3.Database 
})"


6. Receiving and Displaying Data: The goal of this application is to display the product data for users to browse and choose. As such retrieving data from the database to then render it from EJS templates is a needed step. Firstly to show modal car details, Express will call getDbConnection() so that SQL will retrieve its product row data and send it to the EJS file. From there EJS will loop each of the data pulled into rendered cards that can be viewed once visitors click the “Show Details” button:
Inside products.ejs ->
        "<button 
              "id="<%= car.id %>" 
              class="btn btn-outline-primary w-100 mt-3 details-btn" 
              data-bs-toggle="modal"
              data-bs-target="#carModal" 
              data-name="<%= car.name %>" 
              data-price="<%= car.price %>"
              data-availability="<%= car.availability %>" 
              data-category="<%= car.category %>">
              Show Details
       </button>"
   
Running the Prototype
If you’d like to view the application, ensure these steps have been completed and open it in a preferred browser.
1.	Install Dependencies
2.	Run the app, type into terminal: 
a.	node app.js
3.	Open in browser, type into preferred browser: 
a.	localhost:3000
 

