import "./styles.css";
import styled from "styled-components";
import React, { useState, useMemo, useRef } from "react";

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
  const [Childs, setChilds] = useState(null);
  const Wrapper = ({ useberryItem }) => {
    return (
      <UseberryItemChildWrapper>
        {useberryItem.options?.map((useberryItem_child) => (
          <UseberryItemChild
            key={useberryItem_child.guid}
            bgcolor={useberryItem_child.color}
            onClick={() => {
              GetChilds(useberryItem_child);
            }}
          >
            {useberryItem_child.title}
          </UseberryItemChild>
        ))}
      </UseberryItemChildWrapper>
    );
  };
  const tempObjparent = {
    Data: {},
    set selectionChild(a) {
      this.Data.selectionChild_ = a;
      return this.selectionChild_;
    },
    get selectionChild_() {
      return this.Data.selectionChild_;
    },
    get g_() {
      return this.Data;
    }
  };
  let new_ = useRef(tempObjparent.g_);
  let Childs_ = useRef(null);
  const GetChilds = (current) => {
    if (current?.options && current?.options.length > 0) {
      Nested([current], 0);
      Childs_.current = {
        ...Childs,
        ...{ [current.guid]: current }
      };
      setChilds(Childs_.current);
      if (!Childs[current.guid]) console.log(new_.current);
    }
  };
  const Nested = (actualData, i) => {
    new_.current.title = actualData[i].title;
    new_.current.guid = actualData[i].guid;
    new_.current.color = actualData[i].color;
    if (i < actualData.length - 1) {
      var n = i + 1;
      new_.current = new_.current.selectionChild = {
        title: actualData[n].title,
        guid: actualData[n].guid,
        color: actualData[n].color
      };
    }
  };
  useMemo(() => {
    fetch(`https://research.useberry.com/bill-scripts/assignment.php`)
      .then((response) => response.json())
      .then((actualData) => {
        for (var i = 0; i < actualData.length; i++) {
          Nested(actualData, i);
          Childs_.current = {
            ...Childs_.current,
            ...{ [actualData[i].guid]: actualData[i] }
          };
        }
        setChilds(Childs_.current);
        console.log(tempObjparent.Data);
      });
  }, []);

  return (
    <div className="App">
      {
        <UseberryContainer>
          <WrapperOverflow>
            {Childs
              ? Object.entries(Childs).map(([key, child]) => {
                  return <Wrapper key={child.guid} useberryItem={child} />;
                })
              : null}
          </WrapperOverflow>
        </UseberryContainer>
      }
    </div>
  );
}
