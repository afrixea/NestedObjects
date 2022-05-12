const objToUpdate = {
  title: "",
  guid: "",
  color: "",
  selectionChild
};

const updateArr = [
  {
    content: "New Co",
    id: "0064H00000ysL",
    note: "Here's your update"
  },
  {
    content: "91%",
    id: "a0H4H00000Roi",
    note: "New note here"
  }
];

function updateNestedObj(obj, updates) {
  const updateToApply = updates.find((upd) => upd.id === obj.id);
  if (updateToApply) {
    obj.title = updateToApply.content;
    obj.note = updateToApply.note;
  }
  // Apply updates to any child objects
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      updateNestedObj(obj[k], updates);
    }
  }
}

updateNestedObj(objToUpdate, updateArr);

console.log(objToUpdate);
https://stackoverflow.com/questions/69488600/javascript-update-nested-object-values-from-array-of-update-objects