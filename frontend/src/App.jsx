import { useState } from "react";
import axios from "axios";

const App = () => {
  const [result, setresult] = useState(null);
  const [aigen, setaigen] = useState(10);
  const [text, settext] = useState("");
  const genHighlightcolor = (highlight) => {
    if (aigen <= 10) {
      return "#008000";
    }
    if (aigen > 10 && aigen <= 20) {
      return "#6d8000";
    }
    if (aigen > 20 && aigen <= 50) {
      return "#807700";
    }
    if (aigen > 50 && aigen <= 70) {
      return "#c79407";
    }
    if (aigen > 70) {
      return "#c70707";
    }
    if (aigen === null) {
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/scan", {
        content: text,
      });

      setaigen(response.data.score.ai.toFixed(2) * 100);
      setresult(response.data.blocks[0].text);
      console.log(response.data.blocks[0].text);
    } catch (error) {
      console.log(error);
      setresult(null);
    }
  };
  return (
    <div className="app">
      <div className="data_input">
        <form action="" onSubmit={handleSubmit}>
          <textarea
            type="text"
            required
            placeholder="type text"
            onChange={(e) => settext(e.target.value)}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
      <div className="data_result">
        <h3>Result</h3>
        {result && (
          <>
            <div className="top">
              <div className="original">
                <p>{100 - aigen}%</p>
                <p>Original</p>
              </div>
              <div className="ai_gen">
                <p>{aigen}%</p>
                <p>AI</p>
              </div>
            </div>
            <div className="output">
              <h3>Output</h3>
              <div
                className="output_text"
                style={{ backgroundColor: genHighlightcolor() }}
              >
                <p>{result}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
