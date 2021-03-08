import React, { useState } from "react";
import SubmitSuccess from "./SubmitSuccess";
import * as S from "../styled/Modal/SrModalStyle";
import { Close } from "../../assets";
import axios from "axios";

const SubmitReportModal = ({
  setState,
  setHei,
  state,
  hei,
  myopa,
  setMyOpa,
  files,
  title,
  description,
  languages,
  type,
  access,
  field,
  grade,
  isSubmitted,
  fileName,
  github,
  teamName,
}) => {
  const [view, setView] = useState("hidden");
  const [opa, setOpa] = useState("0");
  const isAccessToken = localStorage.getItem("<access-token>");

  const onClick = () => {
    setState("hidden");
    setHei("0");
  };

  const btnClick = () => {
    setView("visible");
    setState("hidden");
    setMyOpa("0");
    setOpa("1");
    const data1 = new FormData(); // 파일을 이용할 때 FormData
    data1.append("reportFile", files[0]); // append = 기존의 것 + @
    // data.set('report_id', 1) // set = 기존의 것은 삭제 -> 새로운 것 추가
    axios
      .post(`https://10.156.147.50:3000/report/files/1`, data1, {
        headers: {
          "Content-Type": "multipart/form-data", // multipart = 파일 업로드
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    axios
      .post(
        `${baseUrl}:8080/report`,
        {
          title: `${title}`,
          description: `${description}`,
          languages: `${languages}`,
          type: `${type}`,
          access: `${access}`,
          field: `${field}`,
          grade: `${grade}`,
          isSubmitted: `${isSubmitted}`,
          fileName: `${fileName}`,
          github: `${github}`,
          teamName: `${teamName}`,
        },
        {
          headers: {
            "Contect-Type": "application/json",
            Authorization: `Bearer ${isAccessToken}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const baseUrl = "http://15.164.102.79";

  return (
    <>
      <SubmitSuccess setView={setView} setOpa={setOpa} view={view} opa={opa} />
      <S.Main visibility={state}>
        <S.ModalMain height={hei} myopa={myopa}>
          <S.ModalSort>
            <S.CloseBtn onClick={onClick}>
              <span>
                <img src={Close} alt="Close" />
              </span>
            </S.CloseBtn>
            <S.ModalHeader>
              <span>보고서를 </span>
              <span>제출하겠습니까?</span>
            </S.ModalHeader>
            <S.ModalMainText>
              <span>
                첨부 파일의 확장자가 PDF형식이 맞는지 파일명은 프로젝트명 / 학번
                / 이름
              </span>
              <p></p>
              <span>
                순으로 작성 되어있는지 다시 한번 더 확인해주시기 바랍니다. 만약
                위의 내용을
              </span>
              <p></p>
              <span>
                잘못 작성할 경우 보고서가 제출되지 않을 수 있습니다. 확인하고
                제출 바랍니다.
              </span>
            </S.ModalMainText>
            <S.SubmitBtn onClick={btnClick}>
              <span>제출</span>
            </S.SubmitBtn>
          </S.ModalSort>
        </S.ModalMain>
      </S.Main>
    </>
  );
};

export default SubmitReportModal;
