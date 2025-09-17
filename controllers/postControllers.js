// * importo i dati da data.js
const posts = require('../data/db.js');

// * index
const index = (req, res) => {
  // recupero il parametro tramite query sting
  const tagParam = req.query.tags;

  // se non c'è parametro, restituisco tutti i post
  if (!tagParam) {
    return res.json(posts);
  }

  const filteredPosts = posts.filter(post => {
    return post.tags && post.tags.some(tag => tag.toLowerCase() === tagParam.toLowerCase());
  });

  res.json(filteredPosts);
}

// * show
const show = (req, res) => {
  console.log('show chiamato con id:', req.params.id);
  // converto da stringa a numero
  const id = parseInt(req.params.id);
  // cerco il post
  const post = posts.find(item => item.id === id);

  // faccio IF
  if (!post) {
    return res.status(404).json({
      error: "404 Not Found",
      message: "Post non trovato"
    })
  }

  // se è apposto restituisce il post
  res.json(post);
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

  const post = posts.find(item => item.id === id);

  if (!post) {
    return res.status(404).json({
      error: "404 Not Found",
      message: "Post non trovato"
    })
  }

  posts.splice(posts.indexOf(post), 1);

  console.log('nuovo array');
  console.log(posts);

  res.sendStatus(204);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};