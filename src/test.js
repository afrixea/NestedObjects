class tempObjparent_ {
  constructor() {
    const self = this;
    this.state = {
      _data: {
        selectionChild: null
      },
      set data(a) {
        this._data.selectionChild = a;
      },
      get data() {
        return this._data;
      }
    };
  }
}

const newNested = new tempObjparent_();
let a = {
    selectionChild: null
  },
  lastobject;
newNested.state.data = a;
a.selectionChild = {
  n: "324324",
  selectionChild: {}
};
lastobject = a;
let new_;
for (var i = 0; i < 10; i++) {
  new_ = {
    n: "gg" + i,
    selectionChild: {}
  };
  lastobject.selectionChild = new_;
  lastobject = new_;
}

console.log(newNested.state.data);
