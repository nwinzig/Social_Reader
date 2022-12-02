# Social Reader

Social Reader is a clone of [bookclubs.com](https://bookclubs.com/). Social Reader is an application for users to keep track of books and join online communities. The website aims to be useful for users who are want to keep track of a virtual bookshelf. Users who want to share their thoughts on books or join communities to find new books to read will also find use in the application.

## Wiki
For more information on the site and preparation please check out the wiki through these links.

 - [Database Schema](https://github.com/nwinzig/Social_Reader/wiki/DB-Schema)

 - [Feature list](https://github.com/nwinzig/Social_Reader/wiki/Feature-List)

 - [User stories](https://github.com/nwinzig/Social_Reader/wiki/User-Stories)

 - [Wireframes](https://github.com/nwinzig/Social_Reader/wiki/Wireframes)

## Tech Stack
   - [<img src='https://img.shields.io/badge/-flask-yellow' alt='Javascript Logo'  target='_blank'/>](https://flask.palletsprojects.com/en/2.2.x/)
   - [<img src='https://img.shields.io/badge/-React-blue' alt='React Logo' target='_blank'/>](https://reactjs.org/)
   - [<img src='https://img.shields.io/badge/-HTML5-orange' alt='HTML Logo' target='_blank'/>](https://html.com/)
   - [<img src='https://img.shields.io/badge/-CSS-blue' target='_blank'/>](https://www.w3.org/Style/CSS/Overview.en.html)
   - [<img src='https://img.shields.io/badge/-postgres-lightgrey' target='_blank'/>](https://www.postgresql.org/)
   - [<img src='https://img.shields.io/badge/-render-purple' target='_blank'/>](https://render.com/)
   <!-- - [<img src='https://img.shields.io/badge/-python-blue' target='_blank'/>](https://www.python.org/doc/) -->

## Getting Started

### Live Site
The site is currently being deployed live through render. Follow the below link
[Social Reader](https://social-reader.onrender.com/)

### Run Locally
Please follow the directions listed below:
1. Clone the repo
   - HTTPS Version:
   ```
   git clone https://github.com/nwinzig/Social_Reader.git
   ```
2. Create a .env file and set envirnment variables for SECRET_KEY and DATABASE_URL. These can be anything you choose.

3. Install Packages:
   ```
   pipenv install
   cd react-app
   npm install
   ```

4. In the root, migrate and seed files:
   ```
   flask run db init
   flask run migrate
   flask seed all
   ```

5. Run the server and the start the react app(I'd recommend doing this between 2 terminals. One to run flask, the other to start react-app):
   ```
   pipenv run flask run
   cd react-app
   npm start
   ```

## Usage
   ### Home Page
   - This page will give you a first glance of the site. From here you are able to navigate to either the sign in or sign up form(both have functionality to login as a demo user).
   - You may also navigate directly to pages displaying current books or bookclubs.
![Screen Shot 2022-12-02 at 12 47 22 PM](https://user-images.githubusercontent.com/91198301/205359277-e53a9669-e2c3-448c-afcf-7b6c418b8ee9.png)


   ### Join A Book Club
   - This page is designed to display current bookclubs. To get more details on a specific club use the "View Club" button. If you are a logged in user then there will also be a "Create your own" button that can be used to navigate to a form used to create a new book club.
![Screen Shot 2022-12-02 at 1 15 40 PM](https://user-images.githubusercontent.com/91198301/205359331-952fdaf4-a8f6-4853-8c55-2d272ed42974.png)


   ### Club Details
   - The details page for a club will display the club name, number of members, and club image if available. A reading list is also displayed. A logged in user can edit a club if they created it from this page. If the user is not the owner they have the ability to either join or leave the club.
![Screen Shot 2022-12-02 at 1 16 42 PM](https://user-images.githubusercontent.com/91198301/205359397-bdb1a9c7-4f07-48c2-88cd-8f10e95514d6.png)


   ### Find a Book
   - On this page all current books will be displayed. Like the Join A Book Club page, book details can be viewed by clicking on the "Book details button". Also if a user is logged in they will have access to the "add a book" button which will bring them to the assocciated form page.
![Screen Shot 2022-12-02 at 1 15 53 PM](https://user-images.githubusercontent.com/91198301/205359369-7b38395f-7c36-4098-b6c7-d33fcb57d939.png)


   ### Book Details
   - Book details will show the title, author, summary, and cover image for a book if available. There will also be a section displaying clubs that are currently reading the book. If the logged in user is the own to have added the book then they will also have access to the "Update Book" button which will navigate them to a form.
![Screen Shot 2022-12-02 at 1 16 28 PM](https://user-images.githubusercontent.com/91198301/205359391-2defaa3b-0cb1-4839-8cfa-df90c4edeacc.png)


## Contact Me
- [GitHub](https://github.com/nwinzig)
- [Linkedin](https://www.linkedin.com/in/noah-winzig-30588b231/)
