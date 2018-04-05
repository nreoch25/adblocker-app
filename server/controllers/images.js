export default {
  setRouting: function(router) {
    router.post("/api/image", this.postImage);
  },
  postImage(req, res) {
    if(req.file === undefined || req.file === null) { return res.status(400).send({ error: "Please upload an image file" }) }
    console.log(req.file);
    res.send({ "message": "File uploaded successfully" });
  }
}
