// * importo i dati da data.js
const connection = require('../data/db.js');

// * index
const index = (req, res) => {

  const sql = "SELECT * FROM blog_db";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Errore durante l'esecuzione della query: " + err });
    res.json(results);
  })

}

// * show
const show = (req, res) => {

  const id = parseInt(req.params.id);

  connection.query('select * FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Errore nella query SELECT: ', err);
      return res.status(500).json({ error: 'Errore server' });
    }

    if (results.length === 0) {
      //! nessun post trovato con quell'id
      return res.status(404).json({
        error: "404 Not Found",
        message: "Post non trovato"
      });
    }

    //! restituisce il post come JSON
    res.json(results[0]);
  });

};

// * create
const create = (req, res) => {
  // * genero un nuovo id
  const newID = posts[posts.length - 1].id + 1;

  // * destrutturo il body della richiesta
  const { title, content, image, tags } = req.body

  // * creo un nuovo oggetto post
  const newPost = {
    id: newID,
    title,
    content,
    image,
    tags
  }

  // *pusho l'oggetto appena creato nell'array posts
  posts.push(newPost);

  console.log(posts);

  res.status(201).json(newPost);
}

// * update
const update = (req, res) => {
  // * recupero l'ID
  const id = parseInt(req.params.id);

  // * recupero il post dall'array
  const post = posts.find(item => item.id === id);

  // * controlliamo se il post esiste
  if (!post) {
    return res.status(404).json({ error: "404 Not Found", message: "Post non trovato" })
  }

  // * modifichiamo i dati
  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  console.log(posts);

  res.send(post);
}

// * delete
const destroy = (req, res) => {

  const id = parseInt(req.params.id);

  connection.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Errore nella query DELETE:', err);
      return res.status(500).json({ error: 'Errore server' });
    }

    if (result.affectedRows === 0) {
      //! nessun post trovato con quell'id
      return res.status(404).json({
        error: "404 Not Found",
        message: "Post non trovato"
      });
    }

    console.log(`Post con id ${id} eliminato`);
    res.sendStatus(204);
  });

};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};