## How to run this project on your local machine ?

`Recommended terminal: git bash`

### 1. Download this project or command with git clone

```
git clone https://github.com/tohidbinazam/facebook.git
```

Note: Copy any code and just right click on mouse in your terminal,  
Result: Auto past it.

### 2. Open terminal in project root folder 'Instagram' and run those commands

```html
npm install cd client npm install
```

and 👇

```html
cd ..
```

### 3. In project root folder create a file, name '.env' by using this command

```html
touch .env
```

### 4. Open .env file by 1st command, past the bellow codes and update those info

```html
start .env
```

```html
SERVER_NAME = Instagram SEVER_PORT = 5050 APP_MOOD = Development APP_URL =
http://localhost:3000 MONGO_STRING = ``Hear is your MongoDB database string``
SECRET_KEY = ``JWT secret key`` SENDGRID_API_KEY = `Create SendGrid account or
knock me on messenger`
```

Use SendGrid or use by default Gmail service

Note: [Tohid Bin Azam](https://www.facebook.com/tohidbinazam/) Fb account you can knock me from here

### 5. In Root folder terminal past this final code

```html
npm start
```

If everything is ok,
Runs the app in the development mode. Automatically open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
