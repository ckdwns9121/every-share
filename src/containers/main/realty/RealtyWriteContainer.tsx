import styles from "./RealtyWriteContainer.module.scss";

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
          <input type="text" placeholder="건물 이름" />

          <select>
            <option>건물 유형</option>
            <option>원룸</option>
            <option>오피스텔</option>
          </select>

          <select>
            <option>거래 종류</option>
            <option>단기</option>
            <option>장기</option>
          </select>

          <select>
            <option>전체 층수</option>
            <option>5층</option>
            <option>3층</option>
          </select>

          <div className={styles["divide"]}>
            <div className={styles["half-box"]}>
              <p>보증금</p>
              <input type="text" className={styles["costInput"]} placeholder="300" />
              <p>만원</p>
            </div>
            <div className={styles["half-box"]}>
              <p>월세</p>
              <input type="text" className={styles["costInput"]} placeholder="10" />
              <p>만원</p>
            </div>
            <p className={styles["notice"]}>관리비 포함으로 작성.</p>
          </div>

          <div className={styles["description-box"]}>
            <p className={styles["subTitle"]}>매물 설명</p>
            <textarea
              className={styles["description"]}
              placeholder="방학때 본가에 가게 됐어요 😂 3개월만 사실분 구합니다.!
                주차공간있고 방도 깨끗해요"
            ></textarea>
          </div>
        </div>
        <TitleComponent text="위치 정보" />
        <div className={styles["locationInfo-box"]}>
          <div className={styles["locationSelect-box"]}>
            <select>
              <option>부산광역시</option>
            </select>
            <select>
              <option>사하구</option>
            </select>
            <select>
              <option>하단동</option>
            </select>
          </div>

          <input type="text" placeholder="주소검색" />
          <input type="text" placeholder="상세주소" />
        </div>

        <TitleComponent text="대여 기간" />
        <div className={styles["date-box"]}>
          <div className={styles["date"]}>
            <p className={styles["subTitle"]}>입주 시작 일자</p>
            <input type="date" />
          </div>

          <div className={styles["date"]}>
            <p className={styles["subTitle"]}>입주 종료 일자</p>
            <input type="date" />
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
            <input type="file" className={styles["fileInput"]} />
          </div>

          <div className={styles["register-box"]}>
            <p className={styles["subTitle"]}>임시 계약서 등록</p>
            <p className={styles["notice"]}>임시계약서를 등록할 시 개인정보는 가려주세요</p>
            <input type="file" className={styles["fileInput"]} />
          </div>

          <div className={styles["description-box"]}>
            <p className={styles["subTitle"]}>추가 설명</p>
            <textarea className={styles["description"]} placeholder="거주 공간에 추가적인 설명을 작성해주세요."></textarea>
          </div>

          <button className={styles["registerButton"]}>매물등록</button>
        </div>
      </div>
    </div>
  );
}

export default RealtyWriteContainer;
