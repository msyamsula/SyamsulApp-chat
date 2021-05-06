// userData = {
//     id
//     username
// }
// userProps = user redux state (reducer)
// targetId: html you want to append
// type: html type you want to add
// listener: function for each html element
export const appendElementHTML = (userData, userProps, targetId, type="div", listener=null) => {
  let element = document.createElement(type);
  let text = document.createTextNode(userData.username);
  element.appendChild(text);

  let order = [userProps.username, userData.username];
  order.sort();
  const room = `${order[0]}-${order[1]}`;
  element.onclick = listener
  element.id = userData.id
  element.className = room;
  document.getElementById(targetId).appendChild(element);
};
