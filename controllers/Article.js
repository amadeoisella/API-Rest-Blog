const fs = require("fs");
const path = require("path");
const { validateArticle } = require("../helpers/Validate");
const Article = require("../models/Article");

//POST
const createArticle = (req, res) => {
  let parameters = req.body;

  try {
    validateArticle(parameters);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "no data to send",
    });
  }
  const article = new Article(parameters);

  article
    .save()
    .then((savedArticle) => {
      return res.status(200).json({
        status: "success",
        article: savedArticle,
        message: "article successfully created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        status: "error",
        message: "unsaved item",
      });
    });
};

//GET
const getArticles = (req, res) => {
  const consult = Article.find({});

  if (req.params.last) {
    consult.limit(3);
  }

  consult
    .lean()
    .sort({ date: -1 })
    .then((articles) => {
      if (!articles || articles.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "no articles found",
        });
      }

      return res.status(200).json({
        status: "success",
        articles: articles,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "server error",
      });
    });
};

//GET
const oneArticle = async (req, res) => {
  let id = req.params.id;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "no articles found",
      });
    }

    return res.status(200).json({
      status: "success",
      article: article,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "an error occurred while retrieving the article",
    });
  }
};

//DELETE
const deleteArticle = (req, res) => {
  let id = req.params.id;

  Article.findOneAndDelete({ _id: id })
    .then((articleDelete) => {
      if (!articleDelete) {
        return res.status(500).json({
          status: "error",
          message: "error deleting article",
        });
      }

      return res.status(200).json({
        status: "success",
        article: articleDelete,
        message: "method delete",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "error deleting article",
      });
    });
};

//PUT
const editArticle = (req, res) => {
  let id = req.params.id;

  let parameters = req.body;

  try {
    validateArticle(parameters);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "no data to send",
    });
  }

  Article.findOneAndUpdate({ _id: id }, parameters, { new: true })
    .exec()
    .then((articleUpdated) => {
      if (!articleUpdated) {
        return res.status(404).json({
          status: "error",
          message: "Article not found",
        });
      }

      return res.status(200).json({
        status: "success",
        article: articleUpdated,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "error when updating",
      });
    });
};

//POST
const uploadImage = (req, res) => {
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "error",
      message: "invalid request",
    });
  }

  const nameFile = req.file.originalname;

  const file_split = nameFile.split(".");
  const file_extension = file_split[2];

  if (
    file_extension !== "png" &&
    file_extension !== "jpg" &&
    file_extension !== "jpeg"
  ) {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        message: "invalid file",
      });
    });
  } else {
    let id = req.params.id;

    Article.findOneAndUpdate(
      { _id: id },
      { image: req.file.filename },
      { new: true }
    )
      .exec()
      .then((articleUpdated) => {
        if (!articleUpdated) {
          return res.status(404).json({
            status: "error",
            message: "Article not found",
          });
        }

        return res.status(200).json({
          status: "success",
          article: articleUpdated,
          file: req.file,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "error",
          message: "error when updating",
        });
      });
  }
};

//GET
const image = (req, res) => {
  let file = req.params.file;
  let route = "./images/articles/" + file;

  fs.stat(route, (error, exist) => {
    if (exist) {
      return res.sendFile(path.resolve(route));
    } else {
      return res.status(404).json({
        status: "error",
        message: "image does not exist",
        exist,
        file,
        route,
      });
    }
  });
};

//GET
const searchEngine = (req, res) => {
  const searchs = req.params.searchs;

  Article.find({
    $or: [
      { title: { $regex: searchs, $options: "i" } },
      { content: { $regex: searchs, $options: "i" } },
    ],
  })
    .sort({ date: -1 })
    .then((articlesFound) => {
      if (!articlesFound || articlesFound.length <= 0) {
        return res.status(404).json({
          status: "error",
          message: "no items found",
        });
      }

      return res.status(200).json({
        status: "success",
        articles: articlesFound,
      });
    });
};

module.exports = {
  createArticle,
  getArticles,
  oneArticle,
  deleteArticle,
  editArticle,
  uploadImage,
  image,
  searchEngine,
};
