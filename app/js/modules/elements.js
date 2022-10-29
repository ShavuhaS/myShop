const addClasses = (el, classList) => {
   el.classList.add(...classList);
}

const removeClasses = (el, classList) => {
   el.classList.remove(...classList);
}

const setData = (el, data) => {
   if(typeof data === 'string') el.textContent = data;
}

const createElement = ({tag, classList, id, data, attr}) => {
   const element = document.createElement(tag);
   classList && addClasses(element, classList);
   id && (element.id = id);
   if(typeof data === 'string') element.textContent = data;
   if(attr) for(let key in attr) element[key] = attr[key];

   return element;
}

export {createElement, addClasses, removeClasses, setData};