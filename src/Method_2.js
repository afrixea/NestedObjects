import "./styles.css";
import styled from "styled-components";
import React, { useState, useEffect } from "react";

const UseberryContainer = styled.div`
  background: ${(props) => props.bgcolor};
  font-size: 1em;
  margin: 6px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  height: fit-content;
  width: 95vw;
  overflow-x: auto;
  color: white;
`;

const UseberryItemChildWrapper = styled.div`
  background: ${(props) => props.bgcolor};
  font-size: 1em;
  margin: 6px;
  padding: 20px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  float: left;
  width: 250px;
`;

const UseberryItemChild = styled.span`
  background: ${(props) => props.bgcolor};
  font-size: 1em;
  margin: 6px;
  padding: 20px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;

const WrapperOverflow = styled.div`
  width: max-content;
`;

export default function App() {
  const [object, setObject] = useState([]);
  const [Childs, setChilds] = useState({ selectionChild: null });
  const GetChilds = (current, parrent) => {
    if (current.options && current.options.length > 0) {
      current.parrent = parrent.guid;
      var Childs_ = { ...Childs, ...{ [current.guid]: current } };
      setChilds(Childs_);
      console.log(Childs_);
    }
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

  useEffect(() => {
    var tempObjparent = {
      set set_selectionChild(a) {
        this.selectionChild = a;
        return this.selectionChild_;
      },
      get selectionChild_() {
        return this.selectionChild;
      },
      get g_() {
        return this;
      }
    };
    fetch(`https://research.useberry.com/bill-scripts/assignment.php`)
      .then((response) => response.json())
      .then((actualData) => {
        var new_ = tempObjparent;
        console.log(actualData);
        for (var i = 0; i < actualData.length; i++) {
          console.log(i);
          new_.title = actualData[i].title;
          new_.guid = actualData[i].guid;
          new_.color = actualData[i].color;
          new_.i_ = i;
          if (i < actualData.length - 1) {
            var n = i + 1;
            new_ = new_.set_selectionChild = {
              title: actualData[n].title,
              guid: actualData[n].guid,
              color: actualData[n].color,
              i_: i
            };
            console.log(i);
          }
        }

        // setChilds(tempObjparent);
        // setObject(actualData);
        console.log(tempObjparent);
      });
  }, []);

  return (
    <div className="App">
      ggg
      {
        <UseberryContainer>
          <WrapperOverflow>
            {/* {Object.entries(Childs).map((useberryItem) => (
              <Wrapper
                key={useberryItem.selectionChild.guid}
                useberryItem={useberryItem}
                parrent={useberryItem}
              />
            ))} */}
          </WrapperOverflow>
        </UseberryContainer>
      }
    </div>
  );
}
