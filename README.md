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
          "inquirer": "^8.1.2",
          "mysql2": "^2.3.0",
          }
        Skip to 9 otherwise continue from 6
6. The next command will be `npm i console.table --save`
7. The next command will be `npm i inquirer --save`
8. The next command will be `npm i mysql2 --save`
9. navigate to the db folder and run `mysql -u root -p` and login
10. run SOURCE schema.sql
11. exit out of mySQL and navigate back into the root foler
12. You will then need to navigate to the config in file explorer and enter the connection.js file and add your password to the password section and save it:
13. Then input the command `node index` and a set of questions will appear.
14. You will then be able to navigate through the prompts to add and change employees and departments as you feel fit.
```

*The following video is a visual representation of how to install and use the Team Profile Generator:*

[How to install](https://youtu.be/T9FQ4aUUi6k)



## Key Technologies Used

**Node.js**

Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

**JavaScript**

JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled,
and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.

**Inquirer**

Inquirer is an NPM package that provides an easy way to capture user input in your Node. It provides several methods for asking questions and returning answers from the user that can be accessed by a . then promise function.
