import React from "react";
import moment from "moment";
import styled from "styled-components";
import CalendarTimeSlot from "./CalendarTimeSlot";

export default ({ schedule, fetchSchedule }) => {

  return (    
    <Wrapper>
      {
        schedule.map(day =>
          <div className="day" key={day.unix}>
            <p className="date">{moment.unix(day.unix).locale("en").format("LL")}</p>
            <div className="slots">
            {
              day.slots.length > 0
              ?
                day.slots.map(slot =>
                  <div key={slot.unix}>
                    <CalendarTimeSlot
                      key={slot.unix}
                      fetchSchedule={fetchSchedule}
                      {...slot}
                    />
                  </div>
                )
              :
                <i>No slots available.</i>
            }
            </div>
          </div>
        )
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 8px;

  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
    padding: 16px 16px 24px 16px;
    border-radius: 4px;
    background-color: white;
    border: 1px solid #ddd;
    min-width: 330px;
  }

  .date {
    font-weight: bolder;
    padding-bottom: 16px;
    border-bottom: 1px solid #ddd;
  }

  .slots {
    display: flex;
    flex-direction: column;
  }
`