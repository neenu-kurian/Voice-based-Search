requirejs.config(
  {
    baseUrl: "scripts",
    paths: {
      index: 'index'
    }
  }
);

requirejs(["index"]);