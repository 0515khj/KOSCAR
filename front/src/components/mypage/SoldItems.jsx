import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ListGroupItem,
  CollapseContent,
  WishListItem,
  StyledWishList,
} from "./mypageStyle";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formPrice";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const SoldItems = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [soldItems, setSoldItems] = useState([]); // soldItems 상태에 데이터를 저장
  // 로그인된 사용자의 user_uno를 localStorage에서 가져옴
  const user_uno = localStorage.getItem("uNo");

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  // useEffect로 데이터 가져오기
  useEffect(() => {
    const fetchSoldItems = async () => {
      try {
        const response = await axios.get("http://localhost:3333/sold", {
          params: { user_uno }, // user_uno 값을 백엔드로 전송
        }); // 백엔드 API 호출
        setSoldItems(response.data); // 데이터를 상태에 저장
        console.log("판매리스트 데이터 상태에 저장 성공");
      } catch (error) {
        console.log("판매리스트 데이터 가져오기 실패: " + error);
      }
    };
    fetchSoldItems();
  }, [user_uno]); // user_uno가 변경될 때마다 데이터 가져오기

  return (
    <>
      <ListGroupItem onClick={toggleCollapse}>
        판매하기 {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </ListGroupItem>
      {isOpen && (
        <CollapseContent>
          <StyledWishList>
            {soldItems.length === 0 ? (
              <p>판매 등록한 차량이 없습니다.</p>
            ) : (
              <WishListItem>
                <Link to="/add" className="add-icon">
                  <i className="fas fa-plus"> 판매</i>
                </Link>
              </WishListItem>
            )}
            {/* soldItems 데이터를 map으로 렌더링 */}
            {soldItems.map((item) => (
              <WishListItem key={item.cNo}>
                {" "}
                {/*bNo를 key로 설정*/}
                <Link to={`/detailmain/${item.cNo}`} state={item}>
                  <img
                    src={`http://localhost:3333${item.image}`}
                    alt={item.name}
                  />
                </Link>
                <Link to={`/detailmain/${item.cNo}`} state={item}>
                  {item.name}
                </Link>
                <p>주행거리:{item.mileage}km</p>
                <p>가격:{formatPrice(item.price)}</p>
                <p style={{ color: "#007bff" }}>
                  {item.sale === 0 ? "판매중" : "판매완료"}
                </p>
              </WishListItem>
            ))}
          </StyledWishList>
        </CollapseContent>
      )}
    </>
  );
};

export default SoldItems;
