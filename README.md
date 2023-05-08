# API-Rest-Blog

The Blog API is a simple application that allows you to create, edit and delete articles, as well as to get a list of all articles or one in particular. It also allows you to upload images to associate them with the articles.

The API has the following endpoints:

POST /articles: Creates a new article. It receives the parameters of the article to be created in the body of the request. If the data is invalid, it returns a 400 error. If it is created correctly, it returns the created article and a success message.
GET /articles: Gets all articles. If the last parameter is given, returns the three most recent articles. If there are no articles, returns a 404 error. Otherwise, it returns the articles and a success message.
GET /articles/:id: Gets an article by its ID. If the article does not exist, returns a 404 error. Otherwise, returns the article and a success message.
DELETE /articles/:id: Deletes an article by its ID. If the article does not exist, returns a 500 error. Otherwise, returns the deleted article and a success message.
PUT /articles/:id: Edit an article by its ID. It receives the parameters of the article to edit in the body of the request. If the data is invalid, it returns a 400 error. If the article does not exist, it returns a 404 error. Otherwise, it returns the updated article and a success message.
POST /articles/image: Upload an image associated with an article. The image must be sent in the body of the request with the name image. If no image is provided, it returns a 404 error. If the file extension is invalid (only .png, .jpg and .jpeg files are supported), it returns a 400 error. If all goes well, it updates the article and returns a success message.
A Validate.js helper file is used to validate the data. To save and retrieve articles from the database, the Article.js model is used. In addition, the multer module is used to upload images.
