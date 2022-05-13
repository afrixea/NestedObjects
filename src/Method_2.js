import "./styles.css";
import styled from "styled-components";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

const UseberryContainer = styled.div`
  background: ${(props) => props.bgcolor};
  font-size: 1em;
  margin: 6px;
  border: 2px solid palevioletred;
  border-radius: 3px;
  height: fit-content;
  width: 100vw;
  overflow-x: auto;
  color: white;
  margin: 0;
  margin-bottom: 10px;
`;

const UseberryItemChildWrapper = styled.div`
  background: linear-gradient(-45deg, red, gray);
  font-size: 1em;
  margin: 6px;
  padding: 20px;
  border: 1px solid blue;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  float: left;
  width: 250px;
`;

const UseberryItemChild = styled.span`
  background: linear-gradient(
    45deg,
    ${(props) => props.bgcolor},
    rgb(60, 80, 90)
  );
  font-size: 1em;
  margin: 6px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 3px;
  cursor: pointer;
`;
const Button = styled.button`
  background: linear-gradient(red, blue);
  color: white;
  border-radius: 50px;
  border: 0;
  height: 50px;
  width: 100px;
  cursor: pointer;
`;

const WrapperOverflow = styled.div`
  width: max-content;
`;

let sc = {
    selectionChild: null
  },
  dt = {
    data: sc
  },
  lastobject = sc,
  new_,
  Loaded = false;

const App = () => {
  const [Childs, setChilds] = useState(null);
  let Childs_ = useRef(null);
  const Wrapper = ({ useberryItem }) => {
    return (
      <UseberryItemChildWrapper>
        {useberryItem.title}
        {useberryItem.options?.map((useberryItem_child) => (
          <UseberryItemChild
            key={useberryItem_child.guid}
            bgcolor={useberryItem_child.color}
            onClick={() => {
              SetChilds(useberryItem_child);
            }}
          >
            {useberryItem_child.title}
          </UseberryItemChild>
        ))}
      </UseberryItemChildWrapper>
    );
  };

  const SetChilds = (current) => {
    if (current?.options && current?.options.length > 0) {
      Childs_.current = {
        ...Childs,
        ...{ [current.guid]: current }
      };
      setChilds(Childs_.current);
      if (!Childs[current.guid]) {
        Nested([current], 0);
      }
    }
  };

  const PrintChilds = () => {
    console.log(dt.data);
  };

  const Nested = (actualData, i) => {
    new_ = {
      title: actualData[i].title,
      guid: actualData[i].guid,
      color: actualData[i].color,
      selectionChild: {}
    };
    lastobject.selectionChild = new_;
    lastobject = new_;
  };
  useEffect(() => {
    if (!Loaded) {
      Loaded = true;
      axios
        .get(`https://research.useberry.com/bill-scripts/assignment.php`)
        .then((actualData) => {
          for (var i = 0; i < actualData.data.length; i++) {
            Nested(actualData.data, i);
            Childs_.current = {
              ...Childs_.current,
              ...{ [actualData.data[i].guid]: actualData.data[i] }
            };
          }
          setChilds(Childs_.current);
        });
    }
  }, []);

  return (
    <div className="App">
      {
        <>
          <UseberryContainer>
            <WrapperOverflow>
              {Childs
                ? Object.entries(Childs).map(([key, child]) => {
                    return <Wrapper key={child.guid} useberryItem={child} />;
                  })
                : null}
            </WrapperOverflow>
          </UseberryContainer>

          <Button
            onClick={() => {
              PrintChilds();
            }}
          >
            SAVE
          </Button>
        </>
      }
    </div>
  );
};
export default App;
