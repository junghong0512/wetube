export const home = (req, res) => res.render("home", { pageTitle: "Home" }); // pagetitle이 home tempplate 로 전달됨

export const search = (req, res) => {
  // const searchingBy = req.query.term;
  const {
    query: { term: searchingBy }
  } = req;
  console.log(searchingBy);
  res.render("search", { pageTitle: "Search", searchingBy });
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Uploadd" });

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
