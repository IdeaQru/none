# User API Spec

## Register User
Endpoint : POST /api/users

Request Body : 
```json{
    "username" : "Abdullah Fiqru",
    "password" : "Rahasia",
    "name"     : "Abdullah Fiqru",
}```
Response Body (Success): 
```json{
    "data" : {
    "username" : "Abdullah Fiqru",
    "password" : "Rahasia",
   "token" : "uuid"
}
}```
Request Body (Failed): 
```json{
    "errors" : "username harus terisi"
}```
## Login User 
Endpoint : POST /api/users/login

Request Body : 
```json
{
    "username" : "Abdullah",
    "password" : "rahasia"

}```


## Get User 
Endpoint : GET /api/users/current   
Request Header : 
-X-API-TOKEN : token
Response Body (Success): 
```json{
    "data" : {
    "username" : "Abdullah Fiqru",
    "password" : "Rahasia",
   "token" : "uuid"
}
}```
Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```
## Update User
Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "password" : "rahasia", // tidak wajib
  "name" : "Abdullah Fiqru" // tidak wajib
}
```
Response Body (Success): 
```json{
    "data" : {
    "username" : "Abdullah Fiqru",
    "password" : "Rahasia",
  
}
}```
Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```
## Logout User
Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```