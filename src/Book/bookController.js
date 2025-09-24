const bookRouterController = (req, res, next) => {
  console.log("====================================");
  console.log("req", req.files.coverImage);
  console.log("====================================");
  res.status(200).json({ Message: "Create" });
};

export default bookRouterController;
