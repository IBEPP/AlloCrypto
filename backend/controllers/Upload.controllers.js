module.exports.uploadGet = (req, res) => {
  res.render("index");
};

module.exports.uploadPost = (req, res) => {
  console.log(req.file);
  res.send("enviado");
};
