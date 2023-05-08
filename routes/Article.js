const { Router } = require("express");
const multer = require("multer");
const ArticleController = require("../controllers/Article");

//multer
const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/articles/");
  },
  filename: (req, file, cb) => {
    cb(null, "article" + Date.now() + file.originalname);
  },
});
const uploads = multer({ storage: storage });

//routes
router.post("/create-article", ArticleController.createArticle);
router.get("/get-articles/:last?", ArticleController.getArticles);
router.get("/get-article/:id", ArticleController.oneArticle);
router.delete("/get-article/:id", ArticleController.deleteArticle);
router.put("/get-article/:id", ArticleController.editArticle);
router.post(
  "/upload-image/:id",
  [uploads.single("file0")],
  ArticleController.uploadImage
);
router.get("/image/:file", ArticleController.image);
router.get("/search/:searchs", ArticleController.searchEngine);

module.exports = router;
