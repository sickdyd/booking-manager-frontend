import React, { useState, useEffect } from "react";
import client from "../api/client";
import authenticate from "../classes/Authenticate";

export default ({ schedule }) => {

  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState();

  useEffect(() => {
    client.getPoints(authenticate.getId())
      .then(res => setPoints(res?.data?.points))
      .finally(() => setLoading(false))
  // eslint-disable-next-line
  }, [schedule]);

  return (
    <p style={{ textAlign: "center" }}>
      You have
        <strong style={{ color: points === 0 ? "red" : "green" }}>
          {loading ? "..." : points}
        </strong> points.
    </p>
  )
}
