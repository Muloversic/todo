export const createElement = (elName, elClass, elContent, attrArr) => {
  const element = document.createElement(elName);
  if (elClass) {
    if (Array.isArray(elClass)) {
      element.classList.add(...elClass);
    } else {
      element.classList.add(elClass);
    }
  }

  if (elContent) {
    element.textContent = elContent;
  }

  if (attrArr) {
    attrArr.forEach((attrObj) => {
      for (let attrName in attrObj) {
        element.setAttribute(attrName, attrObj[attrName]);
      }
    });
  }

  return element;
};
