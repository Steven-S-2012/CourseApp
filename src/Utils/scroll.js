const lazyLoading = () => {
  let fetching = false;
  let page = 0;
  let slideCache = [];
  let itemMap = {};
  let lastScrollY = window.pageYOffset;
  let scrollY = window.pageYOffset;
  let innerHeight;
  let topViewPort = window.pageYOffset;
  let bottomViewPort = window.pageYOffset + window.innerHeight + 500;
  const urlList = [
    { id: 1, url: 'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/01/0E/ChMkJlbKwYKIOc4YAA_vVa3hCncAALGZQJEHPAAD-9t649.jpg', text: 'aaa' },
    { id: 2, url: 'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/01/0E/ChMkJlbKwYKIeqgIABGkIlYzNlIAALGZQIyeLYAEaQ6435.jpg', text: 'bbb' },
    { id: 3, url: 'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/01/0E/ChMkJlbKwYKIA7WxABQ547BiNtIAALGZQJy8csAFDn7821.jpg', text: 'ccc' },
    { id: 4, url: 'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/01/0E/ChMkJ1bKwYKII8ZwABZnTJqCCPcAALGZQLvFv4AFmdk441.jpg', text: 'ddd' },
    { id: 5, url: 'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/01/0E/ChMkJlbKwYKIeR_SAB-7o9CvKpYAALGZQMLn6oAH7u7835.jpg', text: 'eee' },
    { id: 6, url: 'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/01/0E/ChMkJ1bKwYKIRp1yABBHGVf0hEsAALGZQMrW2UAEEcx296.jpg', text: 'fff' },
  ];

  //   slideMap = {
  //     s-97r45: {
  //         node: DOM node,类似<div id="s-<#=v.eid#>" class="slide"></div>,
  //         offTop: 300,
  //         offsetHeight: 90
  //     }
  // }

  //   slideCache = [
  //     {
  //         id: "s-97r45",
  //         img: img DOM节点,
  //         node: 父容器DOM node,类似<div id="s-<#=v.eid#>" class="slide"></div>,
  //         src: 图片资源地址
  //     },
  //     ...
  // ]

  function isVisible(id) {
    // ...check if is visible
    let offsetTop;
    let offsetHeight;
    let node;
    if (itemMap[id]) {
      offsetTop = itemMap[id].offsetTop;
      offsetHeight = itemMap[id].offsetHeight;
    } else {
      node = document.getElementById(id);
      offsetHeight = parseInt(node.offsetHeight, 10);
      offsetTop = parseInt(node.offsetTop, 10);
    }
    // console.log('isvisible', offsetTop + offsetHeight, topViewPort, offsetTop, bottomViewPort);
    if (offsetTop + offsetHeight > topViewPort && offsetTop < bottomViewPort) {
      return true;
    }
    return false;
  }

  function updateItemCache(node) {
    // ....update DOM Cache
    let obj;
    let objposition;
    const list = node.querySelectorAll('.slide');
    const len = list.length;
    slideCache = [];
    itemMap = {};

    for (let i = 0; i < len; i++) {
      obj = {
        id: list[i].id,
        node: list[i],
        img: list[i].querySelector('img'),
      };
      obj.src = obj.img.getAttribute('data-src');
      slideCache.push(obj);

      objposition = {
        node: list[i],
        offsetTop: list[i].offsetTop,
        offsetHeight: list[i].offsetHeight,
      };
      itemMap[list[i].id] = objposition;
    }
  }

  function fetchContent() {
    // ...ajax draw the data
    fetching = true;
    const item = urlList[page];
    const str = `<li class="slide" id=${item.id}"><img class="img" src="data:image/gif;base64,R0lGODdhAQABAPAAAP%2F%2F%2FwAAACwAAAAAAQABAEACAkQBADs%3D" data-src="${item.url}" /></li>`;
    const container = document.getElementById('expList');
    const frag = document.createElement('div');
    frag.innerHTML = str;
    container.appendChild(frag);
    updateItemCache(frag);
    fetching = false;
    handleScroll(null, true);
    page += 1;
  }

  function handleDefer() {
    // ...lazyloading
    const list = slideCache;
    let thisImg;
    for (let i = 0; i < list.length; i++) {
      thisImg = list[i].img;
      if (isVisible(list[i].id)) {
        thisImg.src = list[i].src;
      }
    }
  }
  function handleScroll(e, force) {
    // ...滚动处理程序
    if (!force && lastScrollY === window.scrollY) {
      window.setTimeout(handleScroll, 100);
      return;
    }
    lastScrollY = window.scrollY;
    scrollY = window.scrollY;
    innerHeight = window.innerHeight;
    topViewPort = scrollY - 500;
    bottomViewPort = scrollY + innerHeight + 500;
    // console.log('scroll', window.scrollY + innerHeight + 200, document.documentElement.scrollHeight);
    if (window.scrollY + innerHeight + 200 > document.documentElement.scrollHeight) {
      if (page < urlList.length) {
        fetchContent();
      }
    }
    handleDefer();
    window.setTimeout(handleScroll, 100);
  }
  window.setTimeout(handleScroll, 100);
  fetchContent();
};

export default lazyLoading;
