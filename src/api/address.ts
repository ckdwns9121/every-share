import axios from 'axios';

const URL = 'https://www.juso.go.kr/addrlink/addrLinkApi.do';
const KEY = 'devU01TX0FVVEgyMDIyMDExMjE1NDgwNjExMjEyNTc=';

export const searchAddress = async (searchAddr: string) => {
  const req = URL;
  const config = {
    params: {
      confmKey: KEY,
      currentPage: 1,
      countPerPage: 10,
      keyword: searchAddr,
      resultType: 'json',
    },
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };

  const res = await axios.get(req, config);

  return res.data.results.juso;
};

export const requsetGetAreaInfo = async (lat: number, lng: number) => {
  const URL = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';
  const response = await axios.get(URL, {
    headers: {
      Authorization: `KakaoAK 1de08c4477f5c00ee658b1e9ff17b6a6`,
    },
    params: {
      y: lat,
      x: lng,
    },
  });
  return response;
};

export const requestGetAddressInfo = async (address: string) => {
  const URL = 'https://dapi.kakao.com/v2/local/search/address.json';
  const response = await axios.get(URL, {
    headers: {
      Authorization: `KakaoAK 1de08c4477f5c00ee658b1e9ff17b6a6`,
    },
    params: {
      query: address,
    },
  });
  return response;
};

export let sido = ['서울특별시', '제주특별자치도'];

// '부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','세종특별자치시','경기도','강원도','충청북도','충청남도','전라북도','전라남도','경상북도','경상남도',
