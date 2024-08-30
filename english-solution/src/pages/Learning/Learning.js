import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Learning.css"; // Ensure this CSS file handles the styles as per the screenshot

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // API에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch("http://13.125.48.140/realtime/videos/");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const result = await response.json();
        // title 필드와 video_identify 필드 사용
        const titles = result.map((item, index) => ({
          index: index + 1, // 순서 정보를 추가
          title: item.title,
          videoId: item.video_identify // 비디오 ID 직접 사용
        }));
        setData(titles.reverse());
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

  const handleGoToQuiz = (type, index) => {
    // 퀴즈 페이지로 이동할 때 순서 정보를 사용
    navigate(`/learning/Quiz/${type}/${index}`);
  };

  const handleGoToVideo = (videoId) => {
    // 비디오 페이지로 이동
    const url = `/video/${videoId}`;
    navigate(url); // navigate를 사용하여 URL로 이동
  };

  // 검색어에 따른 필터링된 데이터
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="learning-container">
      <h1>Active issues</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button
        className="quiz-button"
        onClick={() => navigate("/learning/Quiz/all")}
      >
        전체 QUIZ 응시하기
      </button>
      <table className="learning-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>단어시험</th>
            <th>문장시험</th>
            <th>오답시험</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index + 1}>
              <td>{item.index}</td>
              <td>
                <a href="#" onClick={(e) => {
                  e.preventDefault(); // 기본 링크 클릭 동작 방지
                  handleGoToVideo(item.videoId);
                }}>
                  {item.title}
                </a>
              </td>
              <td>
                <button onClick={() => handleGoToQuiz("word", item.index)}>
                  응시하기
                </button>
              </td>
              <td>
                <button onClick={() => handleGoToQuiz("sentence", item.index)}>
                  응시하기
                </button>
              </td>
              <td>
                <button onClick={() => handleGoToQuiz("replay", item.index)}>
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
