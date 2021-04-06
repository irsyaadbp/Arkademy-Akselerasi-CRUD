const db = require("../helpers/db");

exports.createNewProduct = (data) => {
  // {product_name: "Coffee", images: "http://google.com"}
  // ["product_name", "images"] => product_name, images
  // ["Coffee", "http://google.com"] => coffee, http://google.com
  // Coffee Panas => "Coffee Panas"

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO products (${Object.keys(data)}) VALUES (${Object.values(
        data
      ).map((item) => `"${item}"`)})`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM products WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products", (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

// {limit: 10, offset: 5, sort: "createdAt", order: "ASC"}
exports.getConditionProducts = (condition) => {
  return new Promise((resolve, reject) => {
    // Coffee Panas => Coffee Panas
    // Es Coffee
    // %
    db.query(
      `SELECT * FROM products WHERE product_name LIKE "%${condition.search}%" ORDER BY ${condition.sort} ${condition.order} LIMIT ${condition.limit} OFFSET ${condition.offset}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.getCountProduct = (condition) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) as total FROM products WHERE product_name LIKE "%${condition.search}%"`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.updateProduct = (id, data) => {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    db.query(
      `UPDATE products SET ${keys.map(
        (key, index) => `${key} = "${values[index]}"`
      )} WHERE id = ${id}`,
      (err, result, field) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      }
    );
  });
};

exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM products WHERE id=${id}`, (err, result, field) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};
