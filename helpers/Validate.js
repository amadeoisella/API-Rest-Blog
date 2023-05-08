const validator = require("validator");

//validator
const validateArticle = (parameters) => {
  const validate_title =
    !validator.isEmpty(parameters.title) &&
    validator.isLength(parameters.title, { min: 5, max: undefined });
  const validate_content = !validator.isEmpty(parameters.content);

  if (!validate_title || !validate_content) {
    throw new Error("unvalidated information");
  }
};

module.exports = {
  validateArticle,
};
