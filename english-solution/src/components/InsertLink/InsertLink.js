// InsertLink.js

import React, { useState } from 'react';
import './InsertLink.css'; // 링크 삽입 스타일을 위한 CSS 파일 import
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button'; // Button 컴포넌트 import

const InsertLink = ({ onLinkSubmit }) => {
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleNavigate = () => {
        if (link.trim() !== '') {
            // 사용자가 입력한 링크를 onSubmit 함수로 전달
            onLinkSubmit(link);
            navigate("/video-page"); // video-page로 이동
        }
    };

    return (
        <div className="insert-link">
            <input
                type="text"
                placeholder="링크를 입력하세요"
                value={link}
                onChange={handleLinkChange}
            />
            <Button label="재생하기" onClick={handleNavigate} />
        </div>
    );
}

export default InsertLink;
