import styles from "./RealtyWriteContainer.module.scss";
import { useState } from "react";
import plusIcon from "../../../static/svg/plug.svg";

import realty1 from "../../../static/image/realty/rinda1.jpg";
import realty2 from "../../../static/image/realty/rinda2.jpg";
import contract1 from "../../../static/image/realty/contract1.gif";
import defaultImage from "../../../static/image/realty/default.jpg";

type TitleComponentProps = {
  text: string;
};

const TitleComponent: React.FC<TitleComponentProps> = ({ text }) => {
  return (
    <div className={styles["title-box"]}>
      <p className={styles["title"]}>{text}</p>
    </div>
  );
};

function RealtyWriteContainer() {
  return (
    <div className={styles["container"]}>
      <div className={styles["content"]}>
        <TitleComponent text="매물 기본 정보" />

        <div className={styles["info-box"]}>
          <input type="text" placeholder="린다포레스트" />

          <select>
            <option>오피스텔</option>
            <option>건물 유형</option>
            <option>원룸</option>
          </select>

          <select>
            <option>단기</option>
            <option>거래 종류</option>
            <option>장기</option>
          </select>

          <select>
            <option>10층</option>
            <option>전체 층수</option>
            <option>3층</option>
          </select>

          <div className={styles["divide"]}>
            <div className={styles["half-box"]}>
              <p>보증금</p>
              <input type="text" className={styles["costInput"]} placeholder="3000" />
              <p>만원</p>
            </div>
            <div className={styles["half-box"]}>
              <p>월세</p>
              <input type="text" className={styles["costInput"]} placeholder="30" />
              <p>만원</p>
            </div>
            <p className={styles["notice"]}>관리비 포함으로 작성.</p>
          </div>

          <div className={styles["description-box"]}>
            <p className={styles["subTitle"]}>매물 설명</p>
            <textarea className={styles["description"]} placeholder="방학때 본가에 가게 됐어요 😂 3개월만 사실분 구합니다!"></textarea>
          </div>
        </div>
        <TitleComponent text="위치 정보" />
        <div className={styles["locationInfo-box"]}>
          <input type="text" placeholder="부산광역시 사하구 하단동 492-46" />
          <input type="text" placeholder="1동 202호" />
        </div>

        <TitleComponent text="대여 기간" />
        <div className={styles["date-box"]}>
          <div className={styles["date"]}>
            <p className={styles["subTitle"]}>입주 시작 일자</p>
            <input type="date" defaultValue="2021-06-21" />
          </div>

          <div className={styles["date"]}>
            <p className={styles["subTitle"]}>입주 종료 일자</p>
            <input type="date" defaultValue="2021-08-20" />
          </div>
        </div>
        <TitleComponent text="추가 정보" />
        <div className={styles["additionalInfo-box"]}>
          <div className={styles["option-box"]}>
            <p className={styles["subTitle"]}>옵션 항목</p>

            <div className={styles["options"]}>
              <button className={styles["option"]}>가스레인지</button>
              <button className={styles["option"]}>전자레인지</button>
              <button className={styles["option"]}>인덕션</button>
              <button className={styles["option"]}>침대</button>
              <button className={styles["option"]}>책상</button>
              <button className={styles["option"]}>옷장</button>
            </div>
          </div>
          <div className={styles["register-box"]}>
            <p className={styles["subTitle"]}>매물 사진 등록</p>
            <p className={styles["notice"]}>실 사진을 등록해주세요</p>
            <div className={styles["fileInput-box"]}>
              <label htmlFor="realty-picture">매물 사진 등록</label>
              <input type="file" id="realty-picture" />
            </div>
            <div className={styles["RegisteredImage-box"]}>
              <img src={realty1} alt="realty1" />
              <img src={realty2} alt="realty2" />
              <img src={defaultImage} alt="defaultImage" />
              <img src={defaultImage} alt="defaultImage" />
              <img src={defaultImage} alt="defaultImage" />
            </div>
          </div>

          <div className={styles["register-box"]}>
            <p className={styles["subTitle"]}>임시 계약서 등록</p>
            <p className={styles["notice"]}>임시계약서를 등록할 시 개인정보는 가려주세요</p>
            <div className={styles["fileInput-box"]}>
              <label htmlFor="contract">임시 계약서 등록</label>
              <input type="file" id="contract" />
            </div>
            <div className={styles["RegisteredImage-box"]}>
              <img src={contract1} alt="contract1" />
              <img src={defaultImage} alt="defaultImage" />
              <img src={defaultImage} alt="defaultImage" />
              <img src={defaultImage} alt="defaultImage" />
              <img src={defaultImage} alt="defaultImage" />
            </div>
          </div>

          <div className={styles["description-box"]}>
            <p className={styles["subTitle"]}>추가 설명</p>
            <textarea className={styles["description"]} placeholder="최근에 헬스장도 생겨서 월 3만원에 이용이 가능합니다~!"></textarea>
          </div>

          <button className={styles["registerButton"]}>매물등록</button>
        </div>
      </div>
    </div>
  );
}

export default RealtyWriteContainer;
