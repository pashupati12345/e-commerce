const validate = (schema) => {
  return (req, res, next) => {
    const payload = {
      ...req.body,
    };

    if (payload.price !== undefined) {
      payload.price = Number(payload.price);
    }

    if (payload.stock !== undefined) {
      payload.stock = Number(payload.stock);
    }

    if (payload.isActive !== undefined) {
      if (payload.isActive === "true") payload.isActive = true;
      if (payload.isActive === "false") payload.isActive = false;
    }

    const { error, value } = schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((item) => item.message),
      });
    }

    req.body = value;
    next();
  };
};

module.exports = validate;