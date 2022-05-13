import "./styles.css";
import styled from "styled-components";
import React, { useState, useMemo } from "react";

const UseberryItem = styled.div`
  background: linear-gradient(45deg, ${(props) => props.bgcolor}, gray);
  font-size: 1em;
  margin: 6px;
  border: 2px solid blue;
  border-radius: 3px;
  height: fit-content;
  width: 95vw;
  overflow-x: auto;
  color: white;
`;

const UseberryItemChildWrapper = styled.div`
  background: linear-gradient(45deg, ${(props) => props.bgcolor}, gray);
  font-size: 1em;
  margin: 6px;
  padding: 20px;
  border: 2px dotted white;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  float: left;
  width: 250px;
`;

const UseberryItemChild = styled.span`
  background: linear-gradient(-45deg, ${(props) => props.bgcolor}, gray);
  font-size: 1em;
  margin: 6px;
  padding: 20px;
  border: 1px solid red;
  border-radius: 3px;
  cursor: pointer;
  color: white;
`;
const Button = styled.button`
  background: linear-gradient(65deg, red, blue);
  color: white;
  border: 0;
  height: 50px;
  width: 95vw;
  cursor: pointer;
`;

const WrapperOverflow = styled.div`
  width: max-content;
`;

const tempObjparent = {
  Data: {},

  set selectionChild(a) {
    this.Data.selectionChild = a;
    return this;
  },
  get g_() {
    return this.Data;
  }
};

const App = () => {
  const [object, setObject] = useState([]);
  const [Childs, setChilds] = useState(null);
  let new_ = tempObjparent.g_;
  const GetChilds = (current, parrent) => {
    if (current.options && current.options.length > 0) {
      current.parrent = parrent.guid;
      var Childs_ = { ...Childs, ...{ [current.guid]: current } };
      setChilds(Childs_);
      console.log(Childs_);
    }
  };
  const Nested = (actualData, i) => {
    new_ = new_.selectionChild = {
      title: actualData[i].title,
      guid: actualData[i].guid,
      color: actualData[i].color
    };
  };
  const Save = () => {
    for (var i = 0; i < object.length; i++) {
      Nested(object, i);
    }
    let _Childs_ = Childs ? Object.values(Childs) : [];
    for (i = 0; i < _Childs_.length; i++) {
      Nested(_Childs_, i);
    }
    console.log(tempObjparent.Data);
  };
  const Wrapper = ({ useberryItem, parrent }) => {
    return (
      <UseberryItemChildWrapper>
        {useberryItem.options?.map((useberryItem_child) => (
          <UseberryItemChild
            key={useberryItem_child.guid}
            bgcolor={useberryItem_child.color}
            onClick={() => {
              GetChilds(useberryItem_child, parrent);
            }}
          >
            {useberryItem_child.title}
          </UseberryItemChild>
        ))}
      </UseberryItemChildWrapper>
    );
  };
  useMemo(() => {
    fetch(`https://research.useberry.com/bill-scripts/assignment.php`)
      .then((response) => response.json())
      .then((actualData) => {
        setObject(actualData);
        console.log(actualData);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <br />
        Χωρισμένο σε κατηγορίες και χρησιμοποιώ αλλιως το remapping για το
        nested
        {object.map((useberryItem) => (
          <UseberryItem
            id={useberryItem.guid}
            key={useberryItem.guid}
            bgcolor={useberryItem.color}
          >
            <WrapperOverflow>
              {useberryItem.title}
              <Wrapper useberryItem={useberryItem} parrent={useberryItem} />
              {Childs
                ? Object.entries(Childs).map(([key, child]) => {
                    return child.parrent === useberryItem.guid ? (
                      <Wrapper
                        key={child.guid}
                        useberryItem={child}
                        parrent={useberryItem}
                      />
                    ) : null;
                  })
                : null}
            </WrapperOverflow>
          </UseberryItem>
        ))}
        <Button
          onClick={() => {
            Save();
          }}
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};
export default App;
