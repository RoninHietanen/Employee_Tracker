# Employee_Tracker

## Description
```md
The Employee_Tracker allows a person to monitor and edit all department and employee roles in their company.
```

## User Story 

```md
AS A business owner.
I WANT to be able to view and manage the departments, roles, and employees in my company.
SO THAT I can organize and plan my business.
```

## What you will need

VS Code or another type of coding interface installed.

Node.js isntalled.

Gitbash installed.

MySQL installed.

## How to install

*Instructions*
```md
1. Fork the repository
2. Clone the repository to your computer
3. Navigate into the Employee_Tracker folder
4. In the Employee_Tracker folder use the following command `npm install`
5. The next command will be `npm init -y`
        if after completing this command you see: 
          "dependencies": {
          "console.table": "^0.10.0",
          "dotenv": "^10.0.0",
          "inquirer": "^8.1.2",
          "mysql2": "^2.3.0",
          "sequelize": "^6.6.5"
          }
        Skip to 11 otherwise continue from 6
6. The next command will be `npm i console.table --save`
7. The next command will be `npm i inquirer --save`
8. The next command will be `npm i sequelize --save`
9. The next command will be `npm i dotenv --save`
10. The next command will be `npm i mysql2 --save`
11. navigate to the db folder and run `mysql -u root -p`
12. run SOURCE schema.sql (optional also run `SOURCE seeds.sql` after)
13. exit out of mySQL and navigate back into the root foler
14. You will then need to navigate to the file in file explorer and create a .env file like the following and save it:
    DB_NAME=employees
    DB_PASS=!Dancinginthework43
    DB_USER=root
15. Then input the command `node index` and a set of questions will appear.
16. You will then be able to navigate through the prompts to add and change employees and departments as you feel fit.
```

## Key Technologies Used

**Node.js**

Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

**JavaScript**

JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled,
and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.

**Sequelize**

Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

**Dotenv**

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

**Inquirer**

Inquirer is an NPM package that provides an easy way to capture user input in your Node. It provides several methods for asking questions and returning answers from the user that can be accessed by a . then promise function.
