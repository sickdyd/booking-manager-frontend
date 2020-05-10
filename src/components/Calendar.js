import React from "react";
import { Calendar, Badge, Popover } from 'antd';
import styled from "styled-components";

export default ({ schedule }) => {

  function getListData(value) {
    
    console.log(value.unix());
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { style: { backgroundColor: '#52c41a' }, count: 1 },
          { style: {}, count: 3 }
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <Popover title="Hello" trigger="click" content="Hello">
        <ul className="events">
          {listData.map(item => (
            <li key={item.content}>
              <Badge style={item.style} count={item.count} />
            </li>
          ))}
        </ul>
      </Popover>
    );
  }

  return (
    <Wrapper>
      <Calendar dateCellRender={dateCellRender} />
    </Wrapper>
  )
}

const Wrapper = styled.div`

  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 6px;
    font-size: 12px;
    text-align: center;
    .ant-badge {
      margin-top: 6px;
    }
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }

  .ant-picker-calendar-date-content {
  }
`