import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Learning.css"; // 스타일링을 위한 CSS 파일

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch("http://15.165.135.23/processing_url/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        // result가 배열일 경우
        const titles = result.map(item => ({ id: item.id, title: item.title }));
        setData(titles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGoToQuiz = (type, id) => {
    navigate(`/learning/Quiz/${type}/${id}`);
  };

  const handleGoToVideo = (videoId) => {
    const url = `/video/${videoId}`;
    navigate(url);
  };

  // 필터링된 데이터
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="learning-container">
      <h1>저장된 기록</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="영상 제목으로 검색"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button
        className="quiz-button"
        onClick={() => navigate("/learning/quiz")}
      >
        전체 퀴즈 응시하기
      </button>
      <table className="learning-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>단어시험</th>
            <th>문장시험</th>
            <th>오답시험</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <a href="#" onClick={() => handleGoToVideo(item.id)}>
                  {item.title}
                </a>
              </td>
              <td>
                <button onClick={() => handleGoToQuiz("word", item.id)}>
                  응시하기
                </button>
              </td>
              <td>
                <button onClick={() => handleGoToQuiz("sentence", item.id)}>
                  응시하기
                </button>
              </td>
              <td>
                <button onClick={() => handleGoToQuiz("wrong", item.id)}>
                  응시하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Learning;
