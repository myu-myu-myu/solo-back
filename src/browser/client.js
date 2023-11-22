window.addEventListener('load', async () => {
  const DOM1 = document.getElementById('title');
  const DOM2 = document.getElementById('description');
  const DOM3 = document.getElementById('memo');
  const DOM4 = document.getElementById('url');

  const getAPI = async () => {
    const r = await fetch('/api2')
      .then((r) => r.text())
      .then((r) => JSON.parse(r))
      .catch((err) => console.error('!!!', err));
    console.log('r : ', r);
    return r;
  };

  let res = await getAPI();
  for (let i = 0; i < res.length; i++) {
    DOM1.append(res[i].title);
    DOM2.append(res[i].description);
    DOM3.append(res[i].memo);
    DOM4.append(res[i].url);
  }
  // 残りはReactにて 参考記事
  // https://qiita.com/dehiron/items/30fb433576072186ac97
});
