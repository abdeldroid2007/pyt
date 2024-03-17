const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless : true });
  const page = await browser.newPage();

  // Load the website URL
  await page.goto('https://eu.pythonanywhere.com/registration/register/beginner/');

  // Read the file containing emails in PIPE format
  const emails = fs.readFileSync('emails.txt', 'utf8').split('\n').map(email => email.trim());

  // Generate a random username
  const username = Math.random().toString(36).substring(7);

  for (let email of emails) {
    // Fill username, email, and password fields
    await page.type('input#id_username', username);
    await page.type('input#id_email', email);
    await page.type('input#id_password1', 'Abdel@@2007');
    await page.type('input#id_password2', 'Abdel@@2007');

    // Check the checkbox
    await page.$eval('input#id_tos', checkbox => checkbox.click());

    // Click on Create Account button
    await page.click('button#id_register_button');

    // Save the entered credentials into a file
    const data = `Username: ${username}\nEmail: ${email}\nPassword: Abdel@@2007\n\n`;
    fs.appendFileSync('credentials.txt', data);
  }

  await browser.close();
})()
