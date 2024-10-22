# Airbean

### Created by Dylan

Link to document: https://docs.google.com/document/d/1s3K9dKXD69TZhR_Ufa98Wu0PPgqFp-YzjAf2Fx0z-jM/edit?usp=sharing

### The description of the task:

In this work, you will create an API for the web app Airbean where you can order coffee and have it delivered via drone (drones are not included in the task). ATTENTION! You do not need to do any frontend, only the backend is your task.

### Follow these steps to run the project:

**1. Clone git-repo**

- Open your terminal/console and run this command git clone <repo-url>

**2. Navigate to project:**

- Run the command: cd <project folder>

**3. Install dependencies:**

- Run the npm install command to install all necessary dependencies needed.

**4. Start server:**

- Use nodemon . command to run the server || npm run dev.

**5. Start your api application and use the urls below to test the project**

### Base url:

http://localhost:8000/api/

### Menu:

http://localhost:8000/api/company/menu  
Method: GET

To retrieve the menu add "menu" to the url and send the request.

### Company info:

http://localhost:8000/api/company/companyInfo  
Method: GET

To retrieve the company info add "companyInfo" to the url and send the request.

### Create order:

http://localhost:8000/api/order/createOrder  
Method: POST

Add query params Key: userID and the Value: {userId} when creating the order as a registered user.

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To create an order add the id, title, description and price to the body.
To create the order as a user, login as the user,
and add the key userID and the value your user id to the params.

Example of JSON structure for creating several orders:

```json
[
  {
    "id": 1,
    "title": "Bryggkaffe",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  },
  {
    "id": 2,
    "title": "Caffè Doppio",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  }
]
```

Will give the user the response: "Your order id: 000."

### Send order:

http://localhost:8000/api/order/sendOrder/:orderID
Method: POST

To complete your order use sendOrder with your order id.
Order will be sent to completedOrder.db. You can then see order history and order status.

### Get cart:

http://localhost:8000/api/order/getCart/:orderId
Method: GET

When you create an order in CreateOrder you’ll receive an orderId.
Copy that orderId and paste it at the end of the URL.
For example, if you receive a response of orderID 349 then paste it like this.
http://localhost:8000/api/order/getCart/349

### Add item cart:

http://localhost:8000/api/order/addItemCart/:orderId  
Method: PUT

If you want to add something in your cart then you can use this method.
Almost like you did in getCart you’ll have to paste your orderID at the end of the URL.
In the body tab in insomnia/postman.
Take note that it’s very important that you choose something from the menu.db file otherwise you’ll receive: error:
"Items must match menu".
Go to: Vs Code >> db >> menu.db to see the menu or make a get request: http://localhost:8000/api/company/menu

### Delete item:

http://localhost:8000/api/order/deleteItem/:orderID?itemId=<ProductID>  
Method: DELETE

Go to the "Parameters" tab (in Postman or Insomnia).
Add query params key: itemID and the value: {itemId} when deleting an item from the order.

### Order confirmation:

http://localhost:8000/api/order/orderConfirmation/:orderID
Method: GET
\*Must be done after calling sendOrder.

To retrieve the order confirmation, first create an order and complete the order.
To retrieve the info add your order ID to the URL.

### Create user:

http://localhost:8000/api/users/signup  
Method: POST

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To create a user, add the username key followed by the desired username.
Also add the password key followed by the desired password.
If the username is not occupied, the user will be created.

Example of JSON structure for creating users:

```json
{
  "username": "user",
  "password": "test123"
}
```

Will give the user this response:

```json
{
  "message": "User created.",
  "user": {
    "id": "randomlyGeneratedNumbersAndLetters987",
    "username": "user"
  }
}
```

\*You will need the ID to create orders as a user and to retrieve your order history.

### Login user:

http://localhost:8000/api/users/login  
Method: POST

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To login as a user, add the username key followed by your username.
Also add the password key followed by your password.

Example of JSON structure for logging in users:

```json
{
  "username": "user",
  "password": "test123"
}
```

Will give the user this response:

```json
{
  "message": "Login successful. Logged in user: user. Id: “randomlyGeneratedNumbersAndLetters987"
}
```

\*You will need the ID to create orders as a user and to retrieve your order history.

### Logout user:

http://localhost:8000/api/users/logout  
Method: POST

### Order history for registered users:

http://localhost:8000/api/order/orderHistory/:userID  
Method: GET

To receive the order history for a user, add the user id
as a parameter in the url.

Will give the user this response:

```json
{
  "orderHistory": [
    {
      "orderId": "000",
      "estDelivery": "11:28",
      "newOrder": [
        {
          "id": 1,
          "title": "Bryggkaffe",
          "desc": "Bryggd på månadens bönor.",
          "price": 39
        }
      ],
      "userId": "randomlyGeneratedNumbersAndLetters987",
      "_id": "randomlyGeneratedNumber"
    }
  ]
}
```

### --------------ADMIN---------------

### Login admin:

http://localhost:8000/api/admin/login
Method: POST

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To login as the admin, add the username "admin"
and the password "password.

Required JSON structure for login in as Admin:

```json
{
  "username": "admin",
  "password": "password"
}
```

Will give the admin the response:

```json
{
  "message": "Login successful. Logged in user: admin. Id: QkactMG9yWXRaOkZ."
}
```

### Add new product:

http://localhost:8000/api/admin/addProduct
Method: POST

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To add a new product, add an id, title, description
and price for the new product.

Example of JSON structure for adding a new product:

```json
{
  "_id": 10,
  "title": "New coffee",
  "desc": "It's just a super coffee",
  "price": 60
}
```

Will give the user the response: "The new product was added to the menu"
If not logged in as admin, response will be:

```json
{
  "success": false,
  "message": "Unauthorized request, please login.",
  "status": 401
}
```

### Change product:

http://localhost:8000/api/admin/changeProduct
Method: PUT

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To change a product, add the id, title, desc
and price of the item you want to change.
If you don't want to change a field, just add the same information
as present on the menu.

Example of JSON structure for changing a product:

```json
{
  "_id": 10,
  "title": "New super coffee",
  "desc": "It's just a super coffee",
  "price": 60
}
```

Will give the admin the response:

```json
{
  "message": "Product has been updated"
}
```

If not logged in as admin, response will be:

```json
{
  "success": false,
  "message": "Unauthorized request, please login.",
  "status": 401
}
```

If product id does not exist in menu:

```json
{
  "error": "Id must match menu id"
}
```

### Remove product:

http://localhost:8000/api/admin/removeProduct  
Method: DELETE

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To remove a product add the id of the product you want to remove.

Example of JSON structure for removing a product:

```json
{
  "_id": 10
}
```

Will give the admin the response:

```json
{
  "message": "The product has been deleted"
}
```

If not logged in as admin, response will be:

```json
{
  "success": false,
  "message": "Unauthorized request, please login.",
  "status": 401
}
```

If product does not exist in menu:

```json
{
  "error": "Item must match the menu."
}
```

### Add promotion:

http://localhost:8000/api/admin/addPromotion  
Method: POST

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To add a promotion, include name of promotion, description, price,
and the items that are part of the promotion.

Example of JSON structure for creating a promotion:

```json
{
  "promotion": "2 for one",
  "desc": "2 for the price of one",
  "price": 60,
  "items": [
    {
      "title": "Bryggkaffe"
    },
    {
      "title": "Cappuccino"
    }
  ]
}
```

Will give the user the response:
"The promotion was added."

If not logged in as admin, response will be:

```json
{
  "success": false,
  "message": "Unauthorized request, please login.",
  "status": 401
}
```

If promotional items are not on the menu will give user the response:

```json
{
  "error": "Items are not on the menu"
}
```

### Remove promotion:

http://localhost:8000/api/admin/removePromotion
Method: DELETE

Go to the "Body" tab (in Postman or Insomnia).
Select "JSON" as the format.
Paste your JSON structure into the json field.

To remove a promotion, add the name of the promotion you want to remove.

Example of JSON structure for removing a promotion:

```json
{
  "promotion": "2 for one"
}
```

Will give the user the response:

```json
{
  "message": "The promotion has been deleted"
}
```

If not logged in as admin, response will be:

```json
{
  "success": false,
  "message": "Unauthorized request, please login.",
  "status": 401
}
```

If promotion is not found will give user the response:

```json
{
  "error": "No promotion with that name was found."
}
```
