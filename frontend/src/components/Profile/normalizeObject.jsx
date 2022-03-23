export default function normalizeObject(object) {

  let result = {

    title: '',
    summary: '',
    images: [],
    reviews: [],
    is_dangerous: false

  };

  // user = {user: ... , images: [...]}

  //obj={title, summary, images, reviews, is_dangerous}

  for(const key of Object.keys(object)) {

    if(isObject(object[key])) {

      result = normalizeObject(object[key]);
      
    }

    if (key === 'title' || key === 'name') {

      result.title = object[key];

    } else if (key === 'summary' || key === 'description') {

      result.summary = object[key];

    } else if (key === 'images') {

      result.images = object[key];

    } else if (key === 'reviews') {

      result.images = object[key];

    } else if (key === 'is_dangerous') {

      result.is_dangerous = object[key];

    }

  }

  // console.log(result);
  return result;

}

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};