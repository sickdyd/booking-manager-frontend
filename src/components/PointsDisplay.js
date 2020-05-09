import React, { useState, useEffect } from "react";
import client from "../api/client";
import authenticate from "../classes/Authenticate";
import Spin from "../components/Spin";

export default ({ schedule }) => {

  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    client.getPoints(authenticate.getId())
      .then(res => setPoints(res.data.points))
      .finally(() => setLoading(false))
  // eslint-disable-next-line
  }, [schedule]);

  return (
    loading
      ? <Spin />
      :
        <p style={{ textAlign: "center" }}>
          You have <strong style={{ color: points === 0 ? "red" : "green" }}>{points}</strong> points.
        </p>
  )
}
