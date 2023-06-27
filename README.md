# API-Rest-Blog

The following documentation describes a simple REST API created for a blog. The API has the following routes and functionalities:

# Create an article:

Method: POST
Route: /api/create-article
Request parameters: Expect a JSON object in the request body containing the properties "title" (string) and "content" (string).
Successful response: Status code 200 and a JSON object with the properties "status" ("success"), "article" (created article), and "message" ("article successfully created").
Error response: Status code 400 if no data is provided or the data fails validation, and a JSON object with the properties "status" ("error") and "message" ("no data to send").

# Get articles:

Method: GET
Route: /api/get-articles/:last?
Request parameters: An optional "last" parameter in the URL to retrieve only the latest articles. If provided, only the last 3 articles will be returned.
Successful response: Status code 200 and a JSON object with the properties "status" ("success") and "articles" (array of found articles).
Error response: Status code 404 if no articles are found, and a JSON object with the properties "status" ("error") and "message" ("no articles found").

# Get a specific article:

Method: GET
Route: /api/get-article/:id
Request parameters: Expect a "id" parameter in the URL corresponding to the unique identifier of the article.
Successful response: Status code 200 and a JSON object with the properties "status" ("success") and "article" (found article).
Error response: Status code 404 if the article is not found, and a JSON object with the properties "status" ("error") and "message" ("no articles found").

# Delete an article:

Method: DELETE
Route: /api/get-article/:id
Request parameters: Expect a "id" parameter in the URL corresponding to the unique identifier of the article to be deleted.
Successful response: Status code 200 and a JSON object with the properties "status" ("success"), "article" (deleted article), and "message" ("method delete").
Error response: Status code 500 if an error occurs while deleting the article, and a JSON object with the properties "status" ("error") and "message" ("error deleting article").

# Edit an article:

Method: PUT
Route: /api/get-article/:id
Request parameters: Expect a "id" parameter in the URL corresponding to the unique identifier of the article to be edited. Additionally, expect a JSON object in the request body containing the properties to be updated ("title" and/or "content").
Successful response: Status code 200 and a JSON object with the properties "status" ("success") and "article" (updated article).
Error response: Status code 404 if the article is not found, and a JSON object with the properties "status" ("error") and "message" ("Article not found").ed. In addition, the multer module is used to upload images.
