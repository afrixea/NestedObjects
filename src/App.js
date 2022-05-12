import "./styles.css";
import styled from "styled-components";
import React, { useState, useMemo } from "react";

const UseberryItem = styled.div`
  background: ${(props) => props.bgcolor};
  font-size: 1em;
  margin: 6px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  height: fit-content;
  width: 95vw;
  overflow-x: auto;
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
  const [Childs, setChilds] = useState(null);
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
      </div>
    </div>
  );
}
