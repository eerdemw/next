import { useEffect, useState } from "react";
import styles from "../styles/dog.module.scss";

export default function Dog({ children, onFetch, onError }) {
  const dataState = {
    error: false,
    loading: false,
    success: false,
    data: {},
  };

  const [state, setState] = useState(dataState);

  const fetchAPI = async () => {
    setState({ ...state, loading: true });
    const request = await fetch("/api/hello").then((resp) => resp.json());
    if (request.data.status === "success") {
      setState({ ...state, loading: false, success: true, data: request.data });
      onFetch(request.data.message);
    } else {
      setState({ ...state, loading: false, error: true });
      onError("Could not fetch any!");
    }
  };

  useEffect(() => {
    fetchAPI();

    return () => {};
  }, []);

  return (
    <section className={styles.nmq}>
      {state.loading && "Loading..."}
      {state.error && "An error occurred!"}
      {state.success && <img src={state.data.message} />}
      <div className="new-tag">{children}</div>
    </section>
  );
}
