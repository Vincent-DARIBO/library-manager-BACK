# Publication manager API

The goal of this project is to help a librarian to manage its library

⚙️ Technichal stack:

    - Express.js
    - MariaDB
📐 REST API / 3 tier architecture

🔐 Securtiy: 
    
    - Access control using roles
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
  GET /customers - Returns the list of all registered customers 
```

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
  GET /customers/:first_name - Returns an array containing all the customers that have a part of the input in their first name
```

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
  POST /customers/ - create a customer
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `first_name`| `string - body param`| customer's first name. **Required** |
| `last_name`| `string - body param`| customer's last name. **Required** |
| `email`| `string - body param`| customer's email. **Required** |
| `phone`| `string - body param`| customer's phone name. **Required** |



```http
  PUT /customers/ - edit customer's profile. At least one field must be entered
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `first_name`| `string - body param`| customer's first name. *Optional* |
| `last_name`| `string - body param`| customer's last name. *Optional* |
| `email`| `string - body param`| customer's email. *Optional* |
| `phone`| `string - body param`| customer's phone name. *Optional* |



```http
  DELETE /customers/:id 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `first_name`| `number - param`| customer's ID. **Required** |  


### Publications

```http
  GET /publications - List of all registered publications
```

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
  GET /customers/:title - Returns an array containing all the publication that have a part of the input in their title
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :-----------------------------|
| `first_name`| `params` | entire or partial title|


```http
  POST /customers/ - register a new publication
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :-----------------------------|
| `title`| `string - body param` | title of the publication. **Required**|

```http
  PUT /publications/:id 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `title`| `string - body param` | new title. **Required**|




```http
  DELETE /publications/:id 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :--------------- |
| `id`| `number - param`| publication's ID. **Required** |


### Orders

Takes two numbers and returns the sum.




# publication-manager-BACK
Backend of the publication manager app

## Ressources 
### architecture
    -  https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
    - https://ludovicwyffels.dev/node-architecture/#architecture

// TODO: fix the server



order flow: 

user create order
        -> if an order with publication_id and customer_id already exist -> ask to edit this order
        -> else create the order
