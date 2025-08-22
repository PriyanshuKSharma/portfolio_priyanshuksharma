# EmailJS Setup for GitHub Pages

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for free account

## 2. Create Email Service
- Go to Email Services
- Add new service (Gmail recommended)
- Connect your Gmail account

## 3. Create Email Template
- Go to Email Templates
- Create new template with these variables:
  - {{from_name}} - sender's name
  - {{from_email}} - sender's email  
  - {{message}} - message content

## 4. Get Your Keys
- Service ID: Found in Email Services
- Template ID: Found in Email Templates  
- Public Key: Found in Account settings

## 5. Update JavaScript
Replace in main.js:
- 'service_portfolio' → Your Service ID
- 'template_contact' → Your Template ID
- 'YOUR_PUBLIC_KEY' → Your Public Key (both places)

## 6. Template Example
```
To: priyanshu17ks@gmail.com
Subject: New Portfolio Contact from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```

## 7. Email Delivery
- All emails will be sent TO: priyanshu17ks@gmail.com
- FROM: The user's email address
- EmailJS handles the routing automatically

This will work perfectly on GitHub Pages!