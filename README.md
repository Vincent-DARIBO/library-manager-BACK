# publication-manager-BACK
Backend of the publication manager app

## Ressources 
### architecture
    -   https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
    - https://ludovicwyffels.dev/node-architecture/#architecture

// TODO: fix the server



order flow: 

user create order
        -> if an order with publication_id and customer_id already exist -> ask to edit this order
        -> else create the order
