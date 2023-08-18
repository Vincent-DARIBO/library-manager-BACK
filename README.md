# Publication manager API

The goal of this project is to help a librarian to manage its library

⚙️ Technichal stack:

    - Express.js
    - MariaDB
📐 REST API / 3 tier architecture

🔐 Securtiy: 
    
    - Role-based access system
    - Google authentication
    - Email authentication
    - Passwordless authentication


## Features

- Create / edit a client profile
- Create / edit orders
- Manage publications supply
- Send orders to the supplier
- Consult orders history
- Consult orders status
- Consult a client's orders



## API Reference

### Customers

```http
  GET /customers 
```
- Returns the list of all registered customers 

*Call return* : 
```ts
[
    {
        "id": number,
        "first_name": string | null,
        "last_name": string | null,
        "email": string | null,
        "phone": string | null
    }
]
```



```http
  GET /customers/:first_name
```
 - Returns an array containing all the customers that have a part of the input in their first name

| Parameter | Type     | Description                   |
| :-------- | :------- | :-----------------------------|
| `first_name`| `params` | entire or partial first name|

*Call return* : 
```ts
[
    {
        "id": number,
        "first_name": string | null,
        "last_name": string | null,
        "email": string | null,
        "phone": string | null
    }
]
```


```http
  POST /customers/ 
```

- Create a customer

  
| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `first_name`| `string - body param`| customer's first name. **Required** |
| `last_name`| `string - body param`| customer's last name. **Required** |
| `email`| `string - body param`| customer's email. **Required** |
| `phone`| `string - body param`| customer's phone name. **Required** |



```http
  PUT /customers/ 
```
- Edit customer's profile. At least one field must be entered

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `first_name`| `string - body param`| customer's first name. *Optional* |
| `last_name`| `string - body param`| customer's last name. *Optional* |
| `email`| `string - body param`| customer's email. *Optional* |
| `phone`| `string - body param`| customer's phone name. *Optional* |



```http
  DELETE /customers/:id 
```

- Delete a customer
  
| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `first_name`| `number - param`| customer's ID. **Required** |  


### Publications

```http
  GET /publications 
```

- List of all registered publications


*Call return* : 
```ts
[
    {
        "id": number,
        "title": string
    }
]
```  


```http
  GET /customers/:title 
```
- Returns an array containing all the publication that have a part of the input in their title

| Parameter | Type     | Description                   |
| :-------- | :------- | :-----------------------------|
| `first_name`| `params` | entire or partial title|


```http
  POST /customers/ 
```
- Register a new publication

| Parameter | Type     | Description                   |
| :-------- | :------- | :-----------------------------|
| `title`| `string - body param` | title of the publication. **Required**|

```http
  PUT /publications/:id 
```

- Edit a publication title

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `title`| `string - body param` | new title. **Required**|




```http
  DELETE /publications/:id 
```

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `id`| `number - param`| publication's ID. **Required** |


### Orders

```http
  GET /orders - Returns the list of orders. If no query parameter specified the list of all orders is returned
```
| Parameter | Type            | Description      |
| :-------- | :-------------- | :--------------- |
| `publicationID`      | `number - query param`| publication's ID. **Optional** |
| `customerId`      | `number - query param`| customer's ID. **Optional** |

*Call return* : 
```ts
[
    {
        "id": number,
        "customer_id": string | null,
        "publication_id": string | null,
        "quantity": string | null,
        "status": 0 | 1 | 2 | 3 - respectively `not sent - sent - delivered - receive`
    }
]
```

```http
  GET /orders/:id - Returns the associated order
```
| Parameter | Type            | Description               |
| :-------- | :-------------- | :------------------------ |
| `id`      | `number - param`| order's ID. **Required** |

*Call return* : 
```ts
    {
        "id": number,
        "customer_id": string | null,
        "publication_id": string | null,
        "quantity": string | null,
        "status": 0 | 1 | 2 | 3 - respectively `not sent - sent - delivered - receive`
    }
```

```http
  POST /orders/ - create an order
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `customerId`| `int - body param`| id of the customer that made the order **Required** |
| `publicationId`| `int - body param`| id of the wanted publication. **Required** |
| `status`| `int - body param`| status of the order 0 | 1 | 2 | 3 - respectively `not sent - sent - delivered - receive` **Required** |
| `quantity`| `int - body param`| the number of wanted items **Required** |



```http
  PUT /orders/:id - edit an order
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `id`      | `int - param`| the order id **Required** |
| `status`  | `int - body param`| status of the order 0 | 1 | 2 | 3 - respectively `not sent - sent - delivered - receive` **Optional** |
| `quantity`| `int - body param`| the number of wanted items **Optional** |
:warning: Either the status or the quantity has to be specified :warning:

```http
  DELETE /orders/:id 
```

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `id`| `number - param`| orders's ID. **Required** |


# publication-manager-BACK
Backend of the publication manager app

## Ressources 
### architecture
    -  https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
    - https://ludovicwyffels.dev/node-architecture/#architecture

### role-base access control


    - https://code.pieces.app/blog/role-based-access-systems-in-nodejs
    - https://dev.to/richienabuk/how-to-implement-dynamic-role-based-access-control-rbac-in-express-js-rest-api-54fe
    - https://learn.microsoft.com/en-us/azure/active-directory/external-identities/customers/how-to-web-app-role-based-access-control
    - https://developer.auth0.com/resources/code-samples/api/express/basic-role-based-access-control/typescript#quick-auth-0-set-up

// TODO: fix the server



order flow: 

user create order
        -> if an order with publication_id and customer_id already exist -> ask to edit this order
        -> else create the order
